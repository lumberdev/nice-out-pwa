'use client'

import { scaleLinear, scaleTime } from 'd3-scale'
import * as shape from 'd3-shape'
import 'moment'
import 'moment/min/locales'
import moment from 'moment-timezone'
import * as d3 from 'd3'
import { getHourValue } from './get-hour-value'
import { HourlyWeather, WeatherData } from '@/types'

// Screen Dimentions for Graph sizing & position

export const generateGraphData = (weatherData: WeatherData) => {
  const SCREEN_HEIGHT = document.body.clientHeight
  const SCREEN_WIDTH = document.body.clientWidth
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
  const lastDayTime = moment.tz(dailyWeather[7].day, timeZone).valueOf()
  const lastTimeInData = moment
    .tz(hourlyWeather.at(-1)?.date, timeZone)
    .valueOf()
  const extraHours = (lastTimeInData - lastDayTime) / 3600000 // converting extratime difference into hours
  const sevenDayHourly =
    extraHours > 0 ? hourlyWeather.slice(0, -1 * extraHours) : hourlyWeather

  const formattedValues = sevenDayHourly.map(
    (reading: { temperature: number; date: string | number | Date }) =>
      [
        reading.temperature,
        Math.floor(moment.tz(reading.date, timeZone).valueOf()),
      ] as [number, number],
  )
  const formattedPopValues = sevenDayHourly.map(
    (reading: {
      probability: { precipitation: number }
      date: string | number | Date
    }) =>
      [
        reading.probability.precipitation,
        Math.floor(moment.tz(reading.date, timeZone).valueOf()),
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
  const temps = formattedValues.map((value) => value[0])
  // const pops = formattedPopValues.map((value: any[]) => value[0])
  const dts = formattedValues.map((value: any[]) => value[1])

  // X (Time) & Y (Temp / POP) limits for Temp & POP graphs -- boh graphs share X values as they have same start and end time
  const startTime = Math.min(...dts)
  const endTime = Math.max(...dts)
  const minTemp = Math.min(...temps)
  const maxTemp = Math.max(...temps)
  const minPops = 0
  const maxPops = 100
  // const minPT = 0
  // const maxPT = 1.26 // highest possible value on the graph ~~ cube root of 2 inches/hr which is rare.

  // getting total __number of days__ from data
  // width of graphTemp === number of days
  const totalDays = (endTime - startTime) / 3600000 / 24
  const GRAPH_WIDTH = SCREEN_WIDTH * totalDays
  const GRAPH_HEIGHT = SCREEN_HEIGHT / 4
  const GRAPH_POP_HEIGHT = SCREEN_HEIGHT / 10

  // Generating Scale Function for Temp & POP
  const scaleX = scaleTime()
    .domain([new Date(startTime), new Date(endTime)])
    .range([margins.left, GRAPH_WIDTH - margins.right])
  const scaleY = scaleLinear()
    .domain([minTemp, maxTemp])
    .range([GRAPH_HEIGHT - margins.bottom, margins.top])
  const scalePopY = scaleLinear()
    .domain([minPops, maxPops])
    .range([GRAPH_POP_HEIGHT, 0])
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
    tempLinePath: d3
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
    .map((day, i) => {
      // In case API returns null. Use a fixed sunset and sunrise time
      const sunrise = day.astro.sun.rise
        ? moment.tz(day.astro.sun.rise, timeZone)
        : getHourValue('7:00 AM', i, timeZone)
      const sunset = day.astro.sun.rise
        ? moment.tz(day.astro.sun.set, timeZone)
        : getHourValue('6:00 PM', i, timeZone)

      const sunriseTime = sunrise.format('hh:mm A')
      const sunsetTime = sunset.format('hh:mm A')
      const sunriseX = scaleX(sunrise.valueOf())
      const sunriseY = scaleY(sunrise.valueOf())
      const sunsetX = scaleX(sunset.valueOf())
      const sunsetY = scaleY(sunset.valueOf())
      const currentDay = moment.tz(day.day, timeZone).startOf('day').valueOf()
      const noonValue = Math.max(
        scaleX(moment.tz(day.day, timeZone).startOf('day').hour(12).valueOf()),
        0,
      )
      const xValue = scaleX(currentDay)
      const yValue = scaleY(currentDay)
      const dayMinTemp = day.all_day.temperature_min
      const dayMaxTemp = day.all_day.temperature_max
      const twilight = {
        sunrise: [sunriseX, sunriseY, sunriseTime],
        sunset: [sunsetX, sunsetY, sunsetTime],
      }
      return {
        xValue,
        yValue,
        twilight,
        currentDay,
        dayMaxTemp,
        dayMinTemp,
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
        24 - moment.tz(sevenDayHourly[0].date, timeZone).hours()
      const perArray = index >= firstDayHours ? 24 : firstDayHours
      const startindex = index >= firstDayHours ? index + 24 - firstDayHours : 0
      const insertIndex = Math.floor(startindex / perArray)
      if (!result[insertIndex]) {
        result[insertIndex] = new Map()
      }
      result[insertIndex].set(item.date, item)
      return result
    },
    [],
  )

  return {
    data: weatherData,
    minPops,
    maxPops,
    minTemp,
    maxTemp,
    initialTime: scaleX(moment().tz(timeZone).valueOf()),
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
    scaleX,
    scaleY,
    margins,
  }
}
