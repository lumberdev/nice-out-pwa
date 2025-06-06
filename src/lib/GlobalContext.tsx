import { useLocation } from '@/hooks/useLocation'
import { useWeatherData } from '@/hooks/useWeatherData'
import {
  GraphData,
  WeatherData,
  TemperatureData,
  DailyWeather,
  WeatherInfo,
  cachedLocation,
} from '@/types/weatherKit'
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
  getConvertedTemperature,
  getConvertedPrecipitation,
  getConvertedPressure,
  getConvertedWindSpeed,
} from '@/utils/unitConverter'
import { weatherKitConditionCodes } from '@/utils/WeatherKitConditionCodes'
import { useCachedLocations } from '@/hooks/useGetCachedLocations'
import 'moment'
import 'moment/min/locales'
import moment from 'moment-timezone'

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
    graphTimeStamp: number
    time: string
    meridiem: string
    summary: string
    icon: number | string
    daylight: boolean
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
  isUnitMetric: boolean
  setIsUnitMetric: React.Dispatch<React.SetStateAction<boolean>>
  cachedLocations: cachedLocation[] | null
  activeLocationId: string | null | undefined
  setActiveLocationId: React.Dispatch<
    React.SetStateAction<string | null | undefined>
  >
  initialGradient: string[]
  setCurrentNoonValue: React.Dispatch<React.SetStateAction<number | null>>
  savedCurrentDayBreaks: GraphData['dayBreaks'][0] | undefined
}

const GlobalContext = createContext<GlobalContextValue | undefined>(undefined)

const initialTemperatureData = {
  temperature: 0,
  feelsLikeTemperature: 0,
  currentDayMaxTemp: 0,
  currentDayMinTemp: 0,
  currentDayFeelsLikeMaxTemp: 0,
  currentDayFeelsLikeMinTemp: 0,
  currentDayDailyAverageTemp: 0,
}

export const useGlobalContext = (): GlobalContextValue => {
  const context = useContext(GlobalContext)
  if (!context) {
    throw new Error(
      'useGlobalContext must be used within a GlobalContextProvider',
    )
  }
  return context
}

const defaultTimestamp = {
  graphTimeStamp: 0,
  time: '10:40',
  meridiem: 'AM',
  summary: 'Cloudy',
  icon: 'Cloudy',
  daylight: true,
}

const TEMPERATURE_UNIT_KEY = 'isUnitMetric'

export const GlobalContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [graphData, setGraphData] = useState<GraphData>()
  const [currentDay, setCurrentDay] = useState<DailyWeather | undefined>()
  const [savedCurrentDayBreaks, setSavedCurrentDayBreaks] = useState<
    GraphData['dayBreaks'][0] | undefined
  >()
  // Initialize state with value from localStorage, default to true (metric)
  const [isUnitMetric, setIsUnitMetric] = useState(() => {
    if (typeof window === 'undefined') return true
    const saved = localStorage.getItem(TEMPERATURE_UNIT_KEY)
    return saved === null ? true : saved === 'true'
  })

  // Update localStorage when the unit changes
  useEffect(() => {
    localStorage.setItem(TEMPERATURE_UNIT_KEY, String(isUnitMetric))
  }, [isUnitMetric])

  const [activeLocationId, setActiveLocationId] = useState<
    string | null | undefined
  >(null)
  const [currentNoonValue, setCurrentNoonValue] = useState<number | null>(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedActiveLocation =
        localStorage.getItem('activeLocationId') || null
      setActiveLocationId(storedActiveLocation)
    }
  }, [])

  const cachedLocations = useCachedLocations({ activeLocationId })
  const location = useLocation()

  const findLocation = cachedLocations?.find(
    (location) => location.queryData.locationId === activeLocationId,
  )?.queryData.location
  const activeLocation = findLocation || location

  const {
    data: weatherData,
    error,
    isLoading,
  } = useWeatherData({ location: activeLocation })

  useEffect(() => {
    if (
      weatherData &&
      weatherData?.locationId &&
      typeof window !== 'undefined'
    ) {
      localStorage.setItem('activeLocationId', weatherData.locationId)
      setActiveLocationId(weatherData?.locationId)
    }
  }, [weatherData])

  const mainChart = useRef<SVGSVGElement>(null)
  const lineRef = useRef<SVGPathElement>(null)
  const circleRef = useRef<SVGCircleElement>(null)
  const groupRef = useRef<SVGGElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const [timestamp, setTimestamp] = useState<{
    graphTimeStamp: number
    time: string
    meridiem: string
    summary: string
    icon: number | string
    daylight: boolean
  }>(defaultTimestamp)
  const [isItDay, setIsItDay] = useState(true)

  const [temperatureData, setTemperatureData] = useState<TemperatureData>(
    initialTemperatureData,
  )

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
      // !hasD ||
      !circleRef.current ||
      !graphData ||
      !weatherData ||
      !groupRef.current
    ) {
      return
    }
    const { timezone } = weatherData
    const { getYForX } = graphData

    const scrollX = containerRef?.current?.scrollLeft
      ? containerRef?.current?.scrollLeft
      : 0

    const {
      scaleX,
      scaleY,
      formattedSevenDayHourly,
      dayBreaks,
      derivedSevenDayTemperatures,
    } = graphData

    // get noon value when using the footer, as scrollto value set to React Ref in footer is slightly off when accessed with containerRef?.current?.scrollLeft
    // To fix it we check the difference between noonValue and scrollX and if its in 1 pixel of each other we can say its very near to noon
    // And we snap the value to exact noon value
    const scrollNoonValueError = currentNoonValue
      ? Math.abs(currentNoonValue - scrollX)
      : 0
    const nearNoon = scrollNoonValueError ? scrollNoonValueError <= 1 : false

    // In certain edge cases even when the noonValue and scrollX are exactly same, time will be 11:59am
    // adding 0.15 as a buffer/fallback to cover those cases.
    // This should make sure all noon values at at exact 12PM
    const x = scrollX + (nearNoon ? scrollNoonValueError : 0) + 0.15
    const graphTimestamp = moment.tz(scaleX.invert(x), timezone).valueOf()
    const y = getYForX({ timestamp: graphTimestamp, timezone })
    circleRef.current.setAttribute('cx', x.toString())
    circleRef.current.setAttribute('cy', y.toString())
    groupRef.current.setAttribute('transform', `translate(${x + 6}, ${y - 40})`)

    /**
     * This timestamp is rounded to the nearest hour.
     * Useful for fiding the closest data point in the hourly data.
     */
    const roundedTimestamp = moment(graphTimestamp).startOf('hour').valueOf()

    /**
     * This timestamp is floored to the nearest hour.
     * Useful for finding the current day's data.
     * If we use the rounded timestamp, we might get the next day's data.
     */
    const flooredTimestamp = graphTimestamp
    const activeDay = formattedSevenDayHourly.find((day) =>
      day.get(roundedTimestamp),
    )
    const currentData = activeDay?.get(roundedTimestamp)

    const currentDay = weatherData.daily.find(({ forecastStart }) =>
      moment.tz(forecastStart, timezone)?.isSame(flooredTimestamp, 'day'),
    )
    const currentDayDerivedTemps = derivedSevenDayTemperatures.find((day) => {
      return moment(day.date)?.isSame(flooredTimestamp, 'day')
    })
    if (currentDay) {
      setCurrentDay(currentDay)
    }
    const temperature = scaleY.invert(y)
    const feelsLikeTemperature =
      activeDay?.get(roundedTimestamp)?.temperatureApparent

    const currentDayBreaks = dayBreaks.find(({ currentDay }) =>
      moment(moment.tz(currentDay, timezone)).isSame(
        moment.tz(roundedTimestamp, timezone),
        'day',
      ),
    )
    setSavedCurrentDayBreaks(currentDayBreaks)

    let currentDayMaxTemp: number | undefined,
      currentDayMinTemp: number | undefined

    const sunriseCurrentDay =
      currentDayBreaks?.twilight.sunrise.fullSunriseTime.valueOf()
    const sunsetCurrentDay =
      currentDayBreaks?.twilight.sunset.fullSunsetTime.valueOf()
    if (currentDayBreaks) {
      const isItDay =
        sunriseCurrentDay && sunsetCurrentDay
          ? sunriseCurrentDay < graphTimestamp &&
            sunsetCurrentDay > graphTimestamp
          : false
      setIsItDay(isItDay)
      currentDayMaxTemp = currentDayBreaks.dayMaxTemp
      currentDayMinTemp = currentDayBreaks.dayMinTemp
    }
    // when the graph is scrolled to the leftmost edge or rightmost edge, icon becomes undefined breaking the graph background
    // to prevent that, we set the icon to the previous icon as fallback
    const oldTimestamp = timestamp
    setTimestamp({
      graphTimeStamp: graphTimestamp,
      time: moment.tz(graphTimestamp, timezone).format('hh:mm'),
      meridiem: moment.tz(graphTimestamp, timezone).format('A'),
      summary:
        weatherKitConditionCodes.find(
          (codes) => codes.code === currentData?.conditionCode,
        )?.description ?? '',
      icon: currentData?.conditionCode ?? oldTimestamp?.icon ?? 'Cloudy',
      daylight: currentData?.daylight ?? oldTimestamp?.daylight ?? true,
    })
    setTemperatureData({
      temperature: getConvertedTemperature(temperature, isUnitMetric) as number,
      feelsLikeTemperature: getConvertedTemperature(
        feelsLikeTemperature,
        isUnitMetric,
      ),
      currentDayMaxTemp: getConvertedTemperature(
        currentDayMaxTemp,
        isUnitMetric,
      ),
      currentDayMinTemp: getConvertedTemperature(
        currentDayMinTemp,
        isUnitMetric,
      ),
      currentDayFeelsLikeMaxTemp: getConvertedTemperature(
        currentDayDerivedTemps?.feelsLikeMaxTemp,
        isUnitMetric,
      ),
      currentDayFeelsLikeMinTemp: getConvertedTemperature(
        currentDayDerivedTemps?.feelsLikeMinTemp,
        isUnitMetric,
      ),
      currentDayDailyAverageTemp: getConvertedTemperature(
        currentDayDerivedTemps?.dailyAverageTemp,
        isUnitMetric,
      ),
    })

    setWeatherInfo({
      wind: getConvertedWindSpeed(currentData?.windSpeed, isUnitMetric) ?? 0,
      precipitation:
        getConvertedPrecipitation(
          currentData?.precipitationAmount,
          isUnitMetric,
        ) ?? 0,
      humidity: currentData?.humidity ?? 0,
      feelsLike:
        getConvertedTemperature(
          currentData?.temperatureApparent,
          isUnitMetric,
        ) ?? 0,
      cloudCover: currentData?.cloudCover ?? 0,
      pressure: getConvertedPressure(currentData?.pressure, isUnitMetric) ?? 0,
      dew:
        getConvertedTemperature(
          currentData?.temperatureDewPoint,
          isUnitMetric,
        ) ?? 0,
      uvIndex: currentData?.uvIndex ?? 0,
      precipitationChance: currentData?.precipitationChance ?? 0,
    })
  }, [
    JSON.stringify(graphData),
    hasD,
    weatherData,
    isUnitMetric,
    currentNoonValue,
  ])

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
  }, [JSON.stringify(weatherData)])

  useEffect(() => {
    if (!graphData) return
    const { GRAPH_WIDTH, GRAPH_HEIGHT, GRAPH_POP_HEIGHT } = graphData
    setGraphSize({
      width: GRAPH_WIDTH,
      height: GRAPH_HEIGHT,
      popHeight: GRAPH_POP_HEIGHT,
    })
  }, [graphData])

  const initialGradient = [
    '#555f6e',
    '#45505d',
    '#414c59',
    '#4e525b',
    '#68534c',
    '#684338',
  ]

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
    isUnitMetric,
    setIsUnitMetric,
    cachedLocations,
    activeLocationId,
    setActiveLocationId,
    initialGradient,
    setCurrentNoonValue,
    savedCurrentDayBreaks,
  }

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  )
}
