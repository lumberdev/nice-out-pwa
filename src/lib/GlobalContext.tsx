import { useLocation } from '@/hooks/useLocation'
import { useWeatherData } from '@/hooks/useWeatherData'
import * as array from 'd3-array'
import {
  GraphData,
  WeatherData,
  TemperatureData,
  DailyWeather,
  WeatherInfo,
} from '@/types'
import React, {
  RefObject,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import { generateGraphData } from './generate-graph-data'
import {
  formatISO,
  roundToNearestHours,
  isSameDay,
  isWithinInterval,
} from 'date-fns'
import { formatInTimeZone, toZonedTime } from 'date-fns-tz'

interface GlobalContextValue {
  weatherData: WeatherData | undefined
  error: Error | null | unknown
  isLoading: boolean
  graphData: GraphData | undefined
  mainChart: RefObject<SVGSVGElement>
  lineRef: RefObject<SVGPathElement>
  circleRef: RefObject<SVGCircleElement>
  groupRef: RefObject<SVGGElement>
  containerRef: RefObject<HTMLDivElement>
  dotRef: RefObject<HTMLDivElement>
  chartContainerRef: RefObject<HTMLDivElement>
  timestamp: {
    time: string
    meridiem: string
    summary: string
    icon: number
  }
  isItDay: boolean
  temperatureData: TemperatureData
  weatherInfo: WeatherInfo
  graphSize: {
    width: number
    height: number
    popHeight: number
  }
  currentDay: DailyWeather | undefined
  handleAnimation: () => void
}

const GlobalContext = createContext<GlobalContextValue | undefined>(undefined)

export const useGlobalContext = (): GlobalContextValue => {
  const context = useContext(GlobalContext)
  if (!context) {
    throw new Error(
      'useGlobalContext must be used within a GlobalContextProvider',
    )
  }
  return context
}

export const GlobalContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [graphData, setGraphData] = useState<GraphData>()
  const [currentDay, setCurrentDay] = useState<DailyWeather | undefined>()

  const location = useLocation()
  const { data: weatherData, error, isLoading } = useWeatherData({ location })

  const mainChart = useRef<SVGSVGElement>(null)
  const lineRef = useRef<SVGPathElement>(null)
  const circleRef = useRef<SVGCircleElement>(null)
  const groupRef = useRef<SVGGElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)
  const chartContainerRef = useRef<HTMLDivElement>(null)

  const [timestamp, setTimestamp] = useState<{
    time: string
    meridiem: string
    summary: string
    icon: number
  }>({
    time: '10:40',
    meridiem: 'AM',
    summary: 'Sunny',
    icon: 2,
  })
  const [isItDay, setIsItDay] = useState(true)

  const [temperatureData, setTemperatureData] = useState<TemperatureData>({
    temperature: 0,
    feelsLikeTemperature: 0,
    currentDayMaxTemp: 0,
    currentDayMinTemp: 0,
    currentDayFeelsLikeMaxTemp: 0,
    currentDayFeelsLikeMinTemp: 0,
  })

  const [weatherInfo, setWeatherInfo] = useState<WeatherInfo>({
    wind: 0,
    precipitation: 0,
    humidity: 0,
    feelsLike: 0,
    cloudCover: 0,
    pressure: 0,
    dew: 0,
    uvIndex: 0,
    precipitationChance: 0,
  })

  const [graphSize, setGraphSize] = useState({
    width: 0,
    height: 0,
    popHeight: 0,
  })
  const hasD = !!lineRef.current?.getAttribute('d')
  const handleAnimation = useCallback(() => {
    if (
      !lineRef.current ||
      !hasD ||
      !circleRef.current ||
      !graphData ||
      !weatherData ||
      !groupRef.current
    ) {
      console.log('early return')
      return
    }
    const { timezone } = weatherData
    const { formattedValues, timestamps } = graphData
    const scrollX = containerRef.current?.scrollLeft ?? 0

    const { scaleX, scaleY, formattedSevenDayHourly, dayBreaks } = graphData
    const x = scrollX + window.innerWidth / 2
    const timestamp = scaleX.invert(x)

    const index = array.bisectCenter(timestamps, timestamp.getTime())
    const y = scaleY(formattedValues[index][0])

    circleRef.current.setAttribute('cx', x.toString())
    circleRef.current.setAttribute('cy', y.toString())
    groupRef.current.setAttribute('transform', `translate(${x + 6}, ${y - 40})`)

    /**
     * This timestamp is rounded to the nearest hour.
     * Useful for fiding the closest data point in the hourly data.
     */
    const roundedTimestamp = formatISO(roundToNearestHours(timestamp)).slice(
      0,
      -6,
    )
    /**
     * This timestamp is floored to the nearest hour.
     * Useful for finding the current day's data.
     * If we use the rounded timestamp, we might get the next day's data.
     */
    const flooredTimestamp = formatISO(
      roundToNearestHours(timestamp, { roundingMethod: 'floor' }),
    ).slice(0, -6)
    const activeDay = formattedSevenDayHourly.find((day) =>
      day.get(roundedTimestamp),
    )
    const currentData = activeDay?.get(roundedTimestamp)

    const currentDay = weatherData.daily.find(({ day }) =>
      isSameDay(
        toZonedTime(day, timezone),
        toZonedTime(flooredTimestamp, timezone),
      ),
    )
    if (currentDay) {
      setCurrentDay(currentDay)
    }
    const temperature = scaleY.invert(y)
    const feelsLikeTemperature = activeDay?.get(roundedTimestamp)?.feels_like

    const currentDayBreaks = dayBreaks.find(({ currentDay }) =>
      isSameDay(currentDay, roundedTimestamp),
    )
    let currentDayMaxTemp: number | undefined,
      currentDayMinTemp: number | undefined,
      currentDayFeelsLikeMaxTemp: number | undefined,
      currentDayFeelsLikeMinTemp: number | undefined

    if (currentDayBreaks) {
      const isItDay = isWithinInterval(timestamp, {
        start: currentDayBreaks.twilight.sunrise.fullSunriseTime,
        end: currentDayBreaks.twilight.sunset.fullSunsetTime,
      })
      setIsItDay(isItDay)
      currentDayMaxTemp = currentDayBreaks.dayMaxTemp
      currentDayMinTemp = currentDayBreaks.dayMinTemp
      currentDayFeelsLikeMaxTemp = currentDayBreaks.dayFeelsLikeMaxTemp
      currentDayFeelsLikeMinTemp = currentDayBreaks.dayFeelsLikeMinTemp
    }
    setTimestamp({
      time: formatInTimeZone(timestamp, timezone, 'hh:mm'),
      meridiem: formatInTimeZone(timestamp, timezone, 'a'),
      summary: currentData?.summary ?? '',
      icon: currentData?.icon ?? 0,
    })
    setTemperatureData({
      temperature,
      feelsLikeTemperature,
      currentDayMaxTemp,
      currentDayMinTemp,
      currentDayFeelsLikeMaxTemp,
      currentDayFeelsLikeMinTemp,
    })

    setWeatherInfo({
      wind: currentData?.wind.speed ?? 0,
      precipitation: currentData?.precipitation.total ?? 0,
      humidity: currentData?.humidity ?? 0,
      feelsLike: currentData?.feels_like ?? 0,
      cloudCover: currentData?.cloud_cover.total ?? 0,
      pressure: currentData?.pressure ?? 0,
      dew: currentData?.dew_point ?? 0,
      uvIndex: currentData?.uv_index ?? 0,
      precipitationChance: currentData?.probability.precipitation ?? 0,
    })
  }, [graphData, hasD, weatherData])

  useEffect(() => {
    if (!weatherData) return
    const graphData = generateGraphData(weatherData)
    setGraphData(graphData)
    const handleResize = () => {
      const newGraphData = generateGraphData(
        weatherData,
        window.innerHeight,
        window.innerWidth,
      )
      setGraphData(newGraphData)
      setGraphSize({
        width: newGraphData.GRAPH_WIDTH,
        height: newGraphData.GRAPH_HEIGHT,
        popHeight: newGraphData.GRAPH_POP_HEIGHT,
      })
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [weatherData])

  useEffect(() => {
    if (!graphData) return
    const { GRAPH_WIDTH, GRAPH_HEIGHT, GRAPH_POP_HEIGHT } = graphData
    setGraphSize({
      width: GRAPH_WIDTH,
      height: GRAPH_HEIGHT,
      popHeight: GRAPH_POP_HEIGHT,
    })
  }, [graphData])

  const value = {
    mainChart,
    lineRef,
    circleRef,
    groupRef,
    containerRef,
    timestamp,
    isItDay,
    temperatureData,
    weatherInfo,
    graphSize,
    handleAnimation,
    graphData,
    weatherData,
    error,
    isLoading,
    currentDay,
    dotRef,
    chartContainerRef,
  }

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  )
}
