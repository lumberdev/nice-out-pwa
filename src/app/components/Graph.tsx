'use client'
import React, { useCallback, useEffect, useRef } from 'react'
import * as d3 from 'd3'
import { WeatherData } from '@/types'
import { generateGraphData } from '@/lib/generate-graph-data'
import LinearGradient from './LinearGradient'
import { graphTempColorStops } from '@/utils'

const Graph = ({ weatherData }: { weatherData: WeatherData }) => {
  const d3Chart = useRef(null)
  const bgRef = useRef(null)
  const drawChart = useCallback(() => {
    const { graphTemp, GRAPH_WIDTH, GRAPH_HEIGHT } =
      generateGraphData(weatherData)
    console.log({
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
      clientWidth: document.body.clientWidth,
      clientHeight: document.body.clientHeight,
    })
    d3.select(bgRef.current)
      .attr('width', document.body.clientWidth)
      .attr('height', document.body.clientHeight)
      .attr('viewBox', [
        0,
        0,
        document.body.clientWidth,
        document.body.clientHeight,
      ])

    const svg = d3
      .select(d3Chart.current)
      .attr('width', GRAPH_WIDTH)
      .attr('height', GRAPH_HEIGHT)
      .attr('viewBox', [0, 0, GRAPH_WIDTH, GRAPH_HEIGHT])

    svg
      .append('path')
      .attr('d', graphTemp.path)
      .attr('fill', 'url(#chart-gradient)')

    svg
      .append('defs')
      .append('linearGradient')
      .attr('id', 'chart-gradient')
      .attr('gradientUnits', 'userSpaceOnUse')
      .attr('x1', '0%')
      .attr('y1', '0%')
      .attr('x2', '0%')
      .attr('y2', '100%')
      .selectAll('stop')
      .data(graphTempColorStops)
      .enter()
      .append('stop')
      .attr('offset', (d, i) => `${i * 20}%`)
      .attr('stop-color', (d) => d.stopColor)
      .attr('stop-opacity', (d) => d.stopOpacity)
  }, [weatherData])

  useEffect(() => {
    const chartRef = d3Chart.current
    drawChart()
    return () => {
      d3.select(chartRef).selectAll('*').remove()
    }
  }, [drawChart])

  return (
    <div className='h-screen w-full flex flex-col justify-end overflow-auto'>
      <svg ref={d3Chart} className='' />
      {/* <defs>
          <linearGradient id='chart-gradient' gradientTransform='rotate(-45)'>
            <stop offset='99.1%' stopColor='#fff' stopOpacity='0.01' />
            <stop offset='75%' stopColor='#fff' stopOpacity='0.3' />
            <stop offset='50%' stopColor='#fff' stopOpacity='0.5' />
            <stop offset='20%' stopColor='#fff' stopOpacity='0.7' />
            <stop offset='0' stopColor='#fff' stopOpacity='0.8' />
          </linearGradient>
        </defs> */}
      {/* <mask id='mask'>
          <rect x='0' y='0' width='100%' height='100%' fill='white' />
        </mask> */}

      <svg ref={bgRef} className='absolute inset-0 -z-10'>
        <LinearGradient
          colorStops={[
            '#bdc3cc',
            '#96a2b1',
            '#8b9aaa',
            '#a3a7b1',
            '#c0afa9',
            '#bd9284',
          ]}
          id='chart-bg-gradient'
        />
        <rect
          x='0'
          y='0'
          width='100%'
          height='100%'
          fill={`url(#chart-bg-gradient)`}
        />
      </svg>
    </div>
  )
}

export default Graph
