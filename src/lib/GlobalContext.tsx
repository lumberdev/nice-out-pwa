import { useLocation } from '@/hooks/useLocation'
import { useWeatherData } from '@/hooks/useWeatherData'
import { GraphData, WeatherData, TemperatureData } from '@/types'
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
import moment from 'moment'

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
  timestamp: {
    time: string
    meridiem: string
    summary: string
    icon: number
  }
  isItDay: boolean
  temperatureData: TemperatureData
  graphSize: {
    width: number
    height: number
    popHeight: number
  }

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

// Create a provider component to wrap your app
export const GlobalContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [graphData, setGraphData] = useState<GraphData>()
  const location = useLocation()
  const {
    data: weatherData,
    error,
    isLoading,
    isFetched,
  } = useWeatherData({ location })

  const mainChart = useRef<SVGSVGElement>(null)
  const lineRef = useRef<SVGPathElement>(null)
  const circleRef = useRef<SVGCircleElement>(null)
  const groupRef = useRef<SVGGElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
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
      return
    }
    const scrollX = containerRef.current?.scrollLeft ?? 0
    const { width: lineWidth } = lineRef.current.getBoundingClientRect()
    const progress = Math.min(Math.max(scrollX / lineWidth, 0), 1)
    const totalLength = lineRef.current.getTotalLength()
    const { x, y } = lineRef.current.getPointAtLength(progress * totalLength)

    circleRef.current.setAttribute('cx', x.toString())
    circleRef.current.setAttribute('cy', y.toString())
    groupRef.current.setAttribute('transform', `translate(${x + 6}, ${y - 40})`)
    const { scaleX, scaleY, formattedSevenDayHourly, dayBreaks } = graphData
    const timestamp = scaleX.invert(x)
    const roundedTimestamp = formatISO(roundToNearestHours(timestamp)).slice(
      0,
      -6,
    )
    const activeDay = formattedSevenDayHourly.find((day) =>
      day.get(roundedTimestamp),
    )
    const currentData = activeDay?.get(roundedTimestamp)

    const temperature = scaleY.invert(y)
    const feelsLikeTemperature =
      activeDay?.get(roundedTimestamp)?.feels_like ?? 0
    const { timezone } = weatherData

    const currentDayBreaks = dayBreaks.find(({ currentDay }) =>
      isSameDay(currentDay, roundedTimestamp),
    )
    let currentDayMaxTemp: number,
      currentDayMinTemp: number,
      currentDayFeelsLikeMaxTemp: number,
      currentDayFeelsLikeMinTemp: number
    currentDayMaxTemp =
      currentDayMinTemp =
      currentDayFeelsLikeMaxTemp =
      currentDayFeelsLikeMinTemp =
        0
    if (currentDayBreaks) {
      const isItDay = isWithinInterval(timestamp, {
        start: currentDayBreaks.twilight.sunrise.fullSunriseTime,
        end: currentDayBreaks.twilight.sunset.fullSunsetTime,
      })
      setIsItDay(isItDay)
      currentDayMaxTemp = currentDayBreaks.dayMaxTemp ?? 0
      currentDayMinTemp = currentDayBreaks.dayMinTemp ?? 0
      currentDayFeelsLikeMaxTemp = currentDayBreaks.dayFeelsLikeMaxTemp ?? 0
      currentDayFeelsLikeMinTemp = currentDayBreaks.dayFeelsLikeMinTemp ?? 0
    }
    setTimestamp({
      time: moment(timestamp).tz(timezone).format('hh:mm'),
      meridiem: moment(timestamp).tz(timezone).format('A'),
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
  }, [graphData, hasD, weatherData])

  useEffect(() => {
    if (weatherData && isFetched) {
      const graphData = generateGraphData(weatherData)
      setGraphData(graphData)
    }
  }, [weatherData, isFetched])

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
    graphSize,
    handleAnimation,
    graphData,
    weatherData,
    error,
    isLoading,
  }

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  )
}
