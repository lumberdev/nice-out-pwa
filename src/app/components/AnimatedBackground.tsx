import React, { RefObject, useEffect, useMemo, useState } from 'react'
import {
  dayAppleConditionCodesWeatherGradient,
  nightAppleConditionCodesWeatherGradient,
  useGradientColorStops,
} from '@/hooks/useGradientColorStops'
import { GraphData } from '@/types'
import {
  findClosestDistanceIndex,
  findPreviousIndex,
} from '@/utils/binarySearchHelpers'
import 'moment'
import 'moment/min/locales'
import moment from 'moment-timezone'
import { WeatherData } from '@/types/weatherKit'
import clsx from 'clsx'

const AnimatedBackground = ({
  icon,
  id,
  isItDay,
  card = false,
  colors,
  containerRef,
  graphData,
  weatherData,
  savedCurrentDayBreaks,
  initialGradient,
  timestamp,
}: {
  icon: number | string
  id: string
  isItDay: boolean
  card?: boolean
  colors?: string[]
  containerRef: RefObject<HTMLDivElement>
  graphData: GraphData | undefined
  weatherData: WeatherData
  savedCurrentDayBreaks: GraphData['dayBreaks'][0] | undefined
  initialGradient: string[]
  timestamp: {
    graphTimeStamp: number
    time: string
    meridiem: string
    summary: string
    icon: number | string
    daylight: boolean
  }
}) => {
  const [scrollGradientPosition, setscrollGradientPosition] = useState(0)
  const colorStops = useGradientColorStops(isItDay, icon)
  const finalColors = colors || colorStops
  const offsets = [2, 24, 46, 60, 81, 99]
  const [currentColors, setCurrentColors] = useState<string[]>(initialGradient)
  const [nextColors, setNextColors] = useState<string[]>(initialGradient)
  const [nextTimeStamp, setNextTimeStamp] = useState<number>(0)

  const currentDaySunrise =
    moment(savedCurrentDayBreaks?.twilight?.sunrise?.fullSunriseTime)
      .tz(weatherData?.timezone)
      .valueOf() || 0
  const currentDaySunset =
    moment(savedCurrentDayBreaks?.twilight?.sunset?.fullSunsetTime)
      .tz(weatherData?.timezone)
      .valueOf() || 0
  const hourlyArray = useMemo(() => {
    // Precompute the raw hourly array transformation
    return weatherData.hourly.map((e: { forecastStart: moment.MomentInput }) =>
      moment(e.forecastStart).tz(weatherData?.timezone).valueOf(),
    )
  }, [weatherData?.hourly])

  const updateColors = () => {
    if (!savedCurrentDayBreaks || hourlyArray?.length <= 0) return

    const scrollX = containerRef?.current?.scrollLeft
      ? containerRef?.current?.scrollLeft
      : 0
    // Get closest previous value as current
    const index = findPreviousIndex(hourlyArray, timestamp.graphTimeStamp)

    const { conditionCode: currentIndex } = weatherData?.hourly[index]

    // Get closest value as next
    let closestPointIndex = findClosestDistanceIndex(
      hourlyArray,
      timestamp.graphTimeStamp,
    )

    const { conditionCode: nextIndex, forecastStart: nextTimeForecastStart } =
      weatherData?.hourly[closestPointIndex]

    setNextTimeStamp(
      moment(nextTimeForecastStart).tz(weatherData?.timezone).valueOf(),
    )

    // The next gradient has a day - night buffer to make sure it's set up before the transition starts
    // to calculate "30 min" offset we need to get screewidth and divide it to 1440(24 hours in to mins) x 30
    const pixelPerMinute = (graphData?.SCREEN_WIDTH || 0) / 1440
    const sunOffset = pixelPerMinute * 35 // 30 Min offset

    let nextIsItMorning =
      savedCurrentDayBreaks?.twilight?.sunrise?.x <= scrollX - sunOffset &&
      savedCurrentDayBreaks?.twilight?.sunset?.x >= scrollX + sunOffset

    if (currentIndex) {
      const getGradient = (isDay: boolean, index: string) => {
        const gradients = isDay
          ? dayAppleConditionCodesWeatherGradient
          : nightAppleConditionCodesWeatherGradient
        return gradients?.[index] ?? gradients?.['Cloudy']
      }

      const gradient = getGradient(isItDay, currentIndex)
      const nextGradient = getGradient(nextIsItMorning, nextIndex)

      const match = JSON.stringify(gradient) === JSON.stringify(currentColors)
      const matchNext =
        JSON.stringify(nextGradient) === JSON.stringify(nextColors)

      // Only change if colors changed
      if (!matchNext) {
        setNextColors(nextGradient)
      }

      if (!match) {
        setCurrentColors(gradient)
      }
    }
  }

  //   Color Representation in 32-Bit Integers
  // Hexadecimal Color Codes:

  // A hexadecimal color code like #FF5733 represents a color in the RGB color model.
  // Each pair of hexadecimal digits corresponds to one of the RGB components:
  // FF (red)
  // 57 (green)
  // 33 (blue)

  // Bit Representation:
  // Each component (Red, Green, and Blue) can take values from 0 to 255, which is represented in 8 bits (since 2^8 = 256).
  // Therefore, a full RGB color requires 24 bits (8 bits for each of the three colors).
  // Storing in a 32-Bit Integer:

  // Colors are often stored as a 32-bit integer.
  // This integer typically consists of:
  // 8 bits for the alpha channel (transparency)
  // 8 bits for the red channel
  // 8 bits for the green channel
  // 8 bits for the blue channel
  // The 24 bits that represent the RGB values are thus the last 24 bits of this integer.
  // The alpha channel, if present, is often the first 8 bits (or it may be omitted, depending on the system or context).

  // ParseInt(..., 16) converts the hexadecimal string to a base 10 integer.
  // For example, parseInt('FFFFFF', 16) will give you 16777215 in decimal (which is the integer representation of white in RGB).
  // Extracting RGB Components:
  // The RGB values are stored in the last 24 bits of the integer:
  // Red Component:
  // bigint >> 16: This right-shifts the bits of the integer by 16 positions, effectively moving the red component to the rightmost position.
  // & 255: This bitwise AND operation isolates the last 8 bits, giving you the red component (0-255).
  // Green Component:
  // bigint >> 8: This right-shifts the bits by 8 positions, moving the green component to the rightmost position.
  // & 255: Again, this isolates the last 8 bits for the green component.
  // Blue Component:
  // bigint & 255: This isolates the last 8 bits directly, giving you the blue component.
  // Convert hex to RGB to allow interpolation
  const hexToRgb = (hex: string) => {
    const bigint = parseInt(hex.substring(1), 16)
    const r = (bigint >> 16) & 255
    const g = (bigint >> 8) & 255
    const b = bigint & 255
    return [r, g, b]
  }

  // Function to interpolate between two colors
  const interpolateColor = (color1: string, color2: string, factor: number) => {
    const rgb1 = hexToRgb(color1)
    const rgb2 = hexToRgb(color2)
    const result = rgb1.map((start, index) =>
      Math.round(start + factor * (rgb2[index] - start)),
    )
    return `rgb(${result[0]}, ${result[1]}, ${result[2]})`
  }

  // find a way to get the scroll position by comparing the current scroll value with previous and next value

  // Interpolate the gradient stops based on scroll position
  const interpolatedGradient = currentColors?.map(
    (color: string, index: number) =>
      interpolateColor(color, nextColors?.[index], scrollGradientPosition),
  )

  useEffect(() => {
    // 2 ways for colors to change either weather changes or same weather but DayNight transition.
    // to calculate the scrollGradientPosition for color change, check the closeness to sunset or sunrise
    // if close to it base the scrollGradientPosition on that instead of nextTimestamp

    // closeness is checks if the nexttimestamp is within 50min of sunset or sunrise
    // its 50 min to take in to the buffer for the transition.
    const closeToSunset = Math.abs(nextTimeStamp - currentDaySunset) <= 3000000
    const closeToSunrise =
      Math.abs(nextTimeStamp - currentDaySunrise) <= 3000000
    const nextColorChangeTimestamp = closeToSunset
      ? currentDaySunset
      : closeToSunrise
        ? currentDaySunrise
        : nextTimeStamp

    // transition is from 0(only current Color and no transition) to 1(only next color fully trasitioned)
    const timeStampDifference =
      1 -
      Math.min(
        Math.abs(
          (nextColorChangeTimestamp - timestamp.graphTimeStamp) / 1800000,
        ),
        1,
      )
    if (JSON.stringify(currentColors) !== JSON.stringify(nextColors)) {
      setscrollGradientPosition(timeStampDifference)
    }
    updateColors()
  }, [timestamp?.graphTimeStamp])

  return (
    <div
      className={clsx(
        {
          'h-full max-h-[150px]': card,
          'fixed min-h-[100vh]': !card,
        },
        'inset-0 -z-10',
      )}
    >
      <svg width="100%" height="100%">
        <defs>
          <linearGradient
            id={id}
            x1={card ? '0%' : '50%'}
            y1={card ? '75%' : '0%'}
            x2={card ? '100%' : '75%'}
            y2={card ? '100%' : '100%'}
          >
            {interpolatedGradient?.map((color, i) => (
              <stop key={i} offset={`${offsets[i]}%`} stopColor={color} />
            ))}
          </linearGradient>
        </defs>
        <rect x="0" y="0" width="100%" height="100%" fill={`url(#${id})`} />
      </svg>
    </div>
  )
}

export default AnimatedBackground
