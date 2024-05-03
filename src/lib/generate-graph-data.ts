'use client'

import { scaleLinear, scaleTime } from 'd3-scale'
import * as shape from 'd3-shape'
import * as array from 'd3-array'
import * as interpolate from 'd3-interpolate'
import { format, toZonedTime } from 'date-fns-tz'
import { HourlyWeather, WeatherData } from '@/types/weatherKit'
import { startOfDay, addHours, getHours, formatISO, roundToNearestHours } from 'date-fns'

// Screen Dimentions for Graph sizing & position

export const generateGraphData = (
  weatherData: WeatherData,
  screenHeight?: number,
  screenWidth?: number,
) => {
  const SCREEN_HEIGHT = screenHeight ?? document.body.clientHeight
  const SCREEN_WIDTH = screenWidth ?? document.body.clientWidth
  const margins = {
    top: 150,
    right: SCREEN_WIDTH / 2,
    bottom: 50,
    left: SCREEN_WIDTH / 2,
  }
  // Formatting raw data for D3
  const timeZone = weatherData.timezone
  const dailyWeather = weatherData.daily
  const hourlyWeather = weatherData.hourly

  // Removing extradata from graph to stop it after 11:59PM of last day
  const lastDayTime = toZonedTime(
    dailyWeather[7].forecastStart,
    timeZone,
  ).getTime()
  const lastTimeInData = toZonedTime(
    hourlyWeather.at(-1)?.forecastStart ?? '',
    timeZone,
  ).getTime()

  const extraHours = (lastTimeInData - lastDayTime) / 3600000 // converting extratime difference into hours

  // hourly weather is starting from previous days 23:00
  const sevenDayHourly =
    extraHours > 0
      ? hourlyWeather.slice(1).slice(0, -1 * extraHours)
      : hourlyWeather

  const formattedValues = sevenDayHourly.map(
    (reading: { temperature: number; forecastStart: string | number | Date }) =>
      [
        reading.temperature,
        Math.floor(toZonedTime(reading.forecastStart, timeZone).getTime()),
      ] as [number, number],
  )
  const formattedPopValues = sevenDayHourly.map(
    (reading: {
      precipitationChance: number
      forecastStart: string | number | Date
    }) =>
      [
        reading.precipitationChance * 100,
        Math.floor(toZonedTime(reading.forecastStart, timeZone).getTime()),
      ] as [number, number],
  )

  // const formattedPTValues = sevenDayHourly.map(
  //   (reading: {
  //     precipitation: { total: number }
  //     date: string | number | Date
  //   }) =>
  //     [
  //       Math.cbrt(reading.precipitation.total),
  //       Math.floor(moment.tz(reading.date, timeZone).valueOf()),
  //       reading.precipitation.total,
  //     ] as [number, number, number],
  // )
  const temperatures = formattedValues.map((value) => value[0])

  // const pops = formattedPopValues.map((value: any[]) => value[0])
  const timestamps = formattedValues.map((value) => value[1])

  // X (Time) & Y (Temp / POP) limits for Temp & POP graphs -- boh graphs share X values as they have same start and end time
  const startTime = Math.min(...timestamps)
  const endTime = Math.max(...timestamps)
  const minTemp = Math.min(...temperatures)
  const maxTemp = Math.max(...temperatures)
  const minPops = 0
  const maxPops = 100
  // const minPT = 0
  // const maxPT = 1.26 // highest possible value on the graph ~~ cube root of 2 inches/hr which is rare.

  // getting total __number of days__ from data
  // width of graphTemp === number of days
  const totalDays = (endTime - startTime) / 3600000 / 24
  const GRAPH_WIDTH = SCREEN_WIDTH * totalDays
  const GRAPH_HEIGHT = SCREEN_HEIGHT / 3
  const GRAPH_POP_HEIGHT = SCREEN_HEIGHT / 8

  // Generating Scale Function for Temp & POP
  const scaleX = scaleTime()
    .domain([new Date(startTime), new Date(endTime)])
    .range([margins.left, GRAPH_WIDTH - margins.right])
  const scaleY = scaleLinear()
    .domain([minTemp, maxTemp])
    .range([GRAPH_HEIGHT - margins.bottom, margins.top])
  const scalePopY = scaleLinear()
    .domain([minPops, maxPops])
    .range([GRAPH_POP_HEIGHT, 50])
  // const scalePTY = scaleLinear()
  //   .domain([minPT, maxPT])
  //   .range([GRAPH_POP_HEIGHT, 0])

  // generating Temperature and POP graphs
  const graphTemp = {
    data: weatherData,
    minTemp,
    maxTemp,
    startTime,
    endTime,
    path: shape
      .area()
      .x(([, x]) => scaleX(x))
      .y0(scaleY(minTemp - (maxTemp - minTemp)))
      .y1(([y]) => scaleY(y))
      .curve(shape.curveCardinal.tension(0))(formattedValues),
    tempLinePath: shape
      .line()
      .x(([, x]) => scaleX(x))
      .y(([y]) => scaleY(y))
      .curve(shape.curveCardinal.tension(0))(formattedValues),
  }
  const graphPop = {
    data: weatherData,
    minPops,
    maxPops,
    path: shape
      .area()
      .x(([, x]) => scaleX(x))
      .y0(scalePopY(0))
      .y1(([y]) => scalePopY(y))
      .curve(shape.curveCardinal.tension(0))(formattedPopValues),
  }

  // const graphPT = {
  //   data: weatherData,
  //   minPT,
  //   maxPT,
  //   path: shape
  //     .area()
  //     .x(([, x]) => scaleX(x))
  //     .y0(scalePTY(0))
  //     .y1(([y]) => scalePTY(y))
  //     .curve(shape.curveCardinal.tension(0))(formattedPTValues),
  // }
  // Parsing  Path values from Graphs
  // const graphTempPath =  d3.// Main graph
  // const graphPopPath = parse(graphPop.path) // header Chance of rain
  // const graphPTPath = parse(graphPT.path) // Precipitation value graph

  // Generating X and Y value for Sunset/Sunrise and each day
  const dayBreaks = dailyWeather
    .filter((_, index) => index < 7)
    .map((day) => {
      const sunrise = toZonedTime(
        day.sunrise ?? new Date(day.forecastStart).setHours(6, 0, 0, 0),
        timeZone,
      ).getTime()
      const sunset = toZonedTime(
        day.sunset ?? new Date(day.forecastStart).setHours(18, 0, 0, 0),
        timeZone,
      ).getTime()
      const sunriseTime = format(sunrise, 'hh:mm a')
      const sunsetTime = format(sunset, 'hh:mm a')
      const sunriseX = scaleX(sunrise)
      const sunriseY = scaleY(
        formattedValues[array.bisectCenter(timestamps, sunrise)][0],
      )
      const sunsetX = scaleX(sunset)
      const sunsetY = scaleY(
        formattedValues[array.bisectCenter(timestamps, sunset)][0],
      )

      const currentDay = startOfDay(
        toZonedTime(day.forecastStart, timeZone),
      ).getTime()
      const noon = addHours(currentDay, 12).getTime()
      const noonValue = {
        x: Math.max(scaleX(noon), 0),
        y: scaleY(formattedValues[array.bisectCenter(timestamps, noon)][0]),
      }
      const xValue = scaleX(currentDay)
      const yValue = scaleY(
        formattedValues[array.bisectCenter(timestamps, currentDay)][0],
      )
      const dayMinTemp = day.temperatureMin
      const dayMaxTemp = day.temperatureMax
      // TODO: Figure out a way to extract feels like temp
      const dayFeelsLikeMinTemp = day.temperatureMin
      const dayFeelsLikeMaxTemp = day.temperatureMax
      const twilight = {
        sunrise: {
          x: sunriseX,
          y: sunriseY,
          time: sunriseTime,
          fullSunriseTime: sunrise,
        },
        sunset: {
          x: sunsetX,
          y: sunsetY,
          time: sunsetTime,
          fullSunsetTime: sunset,
        },
      }
      return {
        xValue,
        yValue,
        twilight,
        currentDay,
        dayMaxTemp,
        dayMinTemp,
        dayFeelsLikeMinTemp,
        dayFeelsLikeMaxTemp,
        noonValue,
      }
    })

  // Breaking up hourly data into daily arrays of hourly data (total 7 arrays) to improve speed of 'find()' in 'updateData()' inside Cursor component
  const formattedSevenDayHourly = sevenDayHourly.reduce(
    (
      result: Map<string, HourlyWeather>[],
      item: HourlyWeather,
      index: number,
    ) => {
      const firstDayHours =
        24 - getHours(toZonedTime(sevenDayHourly[0].forecastStart, timeZone))
      const perArray = index >= firstDayHours ? 24 : firstDayHours
      const startindex = index >= firstDayHours ? index + 24 - firstDayHours : 0
      const insertIndex = Math.floor(startindex / perArray)
      if (!result[insertIndex]) {
        result[insertIndex] = new Map()
      }
      result[insertIndex].set(
        formatISO(toZonedTime(item.forecastStart, timeZone)).slice(0, -6),
        item,
      )
      return result
    },
    [],
  )
  const getYForX = ({
    timestamp,
    timezone,
  }: {
    timestamp: number | Date
    timezone: string
  }) => {
    const currentTimeInMs = toZonedTime(timestamp, timezone).getTime()
    const fooredTimeInMs = roundToNearestHours(currentTimeInMs, {
      roundingMethod: 'floor',
    }).getTime()
    const index = array.bisectCenter(timestamps, fooredTimeInMs)
    const highIndex = Math.min(formattedValues.length - 1, index + 1)

    const [previousTemperature, previousHour] = formattedValues[index]
    const [nextTemperature, nextHour] = formattedValues[highIndex]

    const normalized =
      previousHour == nextHour
        ? 1 // This avoids division by zero
        : (currentTimeInMs - previousHour) / (nextHour - previousHour)

    const interpolator = interpolate.interpolateNumber(
      previousTemperature,
      nextTemperature,
    )
    const interpolatedTemperature = interpolator(normalized)
    const y = scaleY(interpolatedTemperature)
    return y
  }

  return {
    data: weatherData,
    minPops,
    maxPops,
    minTemp,
    maxTemp,
    initialTime: scaleX(toZonedTime(new Date(), timeZone).getTime()),
    startTime,
    endTime,
    endXValue: scaleX(endTime),
    timeZone,
    graphTemp,
    graphPop,
    // graphPT,
    // graphTempPath,
    // graphPopPath,
    // graphPTPath,
    dailyWeather,
    dayBreaks,
    GRAPH_WIDTH,
    GRAPH_HEIGHT,
    GRAPH_POP_HEIGHT,
    SCREEN_HEIGHT,
    SCREEN_WIDTH,
    formattedSevenDayHourly,
    sevenDayHourly,
    scaleX,
    scaleY,
    margins,
    formattedValues,
    timestamps,
    getYForX,
  }
}
