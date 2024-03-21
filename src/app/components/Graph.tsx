'use client'

import React, { useCallback, useEffect, useRef } from 'react'
import { scaleLinear, scaleTime } from 'd3-scale'
import * as d3 from 'd3'
import { CurrentWeatherData, WeatherData } from '@/types'
import { generateGraphData } from '@/lib/generate-graph-data'
const Graph = ({ weatherData }: { weatherData: WeatherData }) => {
  const d3Chart = useRef(null)
  const bgRef = useRef(null)
  const drawChart = useCallback(() => {
    const margin = {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    }
    const SCREEN_WIDTH = window.innerWidth
    console.log('width', SCREEN_WIDTH)
    const SCREEN_HEIGHT = window.innerHeight / 2
    console.log('height', SCREEN_HEIGHT)
    const { startTime, endTime, maxTemp, minTemp, scaleX, scaleY } =
      generateGraphData(weatherData)
    const totalDays = (endTime - startTime) / 3600000 / 24
    const GRAPH_WIDTH = SCREEN_WIDTH * totalDays
    const GRAPH_HEIGHT = SCREEN_HEIGHT / 8
    const GRAPH_POP_HEIGHT = SCREEN_HEIGHT / 6
    const x = d3.scaleTime([startTime, endTime], [0, GRAPH_WIDTH])
    const y = d3.scaleLinear([minTemp, maxTemp], [GRAPH_HEIGHT, 0])
    const area = d3.area(
      (d) => x(d[0]),
      y(0),
      (d) => y(d[1]),
    )
    const bg = d3
      .select(bgRef.current)
      .attr('width', GRAPH_WIDTH)
      .attr('height', window.innerHeight)
      .attr('viewBox', [0, 0, GRAPH_WIDTH, window.innerHeight])

    const svg = d3
      .select(d3Chart.current)
      .attr('width', GRAPH_WIDTH)
      .attr('height', GRAPH_HEIGHT)
      .attr('viewBox', [0, 0, GRAPH_WIDTH, GRAPH_HEIGHT])

    svg
      .append('path')
      .attr('fill', 'green')
      .attr('id', 'temp')
      .attr(
        'd',
        area(
          weatherData.hourly.map((d) => [
            new Date(d.date).getTime(),
            d.temperature,
          ]),
        ),
      )
  }, [weatherData])

  useEffect(() => {
    drawChart()
  }, [])

  // #bdc3cc, #96a2b1, #8b9aaa, #a3a7b1, #c0afa9, #bd9284)
  return (
    <div className='relative h-screen w-full'>
      <div>
        <p>This should be above the graph</p>
      </div>

      <svg ref={d3Chart} className='absolute bottom-0 left-0' />
      <svg ref={bgRef} className='absolute inset-0 -z-10'>
        <defs>
          <linearGradient id='bg-gradient' gradientTransform='rotate(-45)'>
            <stop offset='0%' stopColor='#bdc3cc' />
            <stop offset='20%' stopColor='#96a2b1' />
            <stop offset='40%' stopColor='#8b9aaa' />
            <stop offset='60%' stopColor='#a3a7b1' />
            <stop offset='80%' stopColor='#c0afa9' />
            <stop offset='100%' stopColor='#bd9284' />
          </linearGradient>
        </defs>
        <rect x='0' y='0' width='100%' height='100%' fill='url(#bg-gradient)' />
      </svg>
    </div>
  )
}

export default Graph
