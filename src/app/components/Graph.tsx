'use client'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import Background from './Background'
import { useGlobalContext } from '@/lib/GlobalContext'
import { graphTempColorStops } from '@/utils'

import LinearGradient from './LinearGradient'
import moment from 'moment'
import { roundToNearestHours } from 'date-fns/roundToNearestHours'
import { formatISO } from 'date-fns/formatISO'

import WeatherIcon from './Icon'

const Graph = () => {
  const { graphData, weatherData } = useGlobalContext()
  const mainChart = useRef<SVGSVGElement>(null)
  const lineRef = useRef<SVGPathElement>(null)
  const circleRef = useRef<SVGCircleElement>(null)
  const groupRef = useRef<SVGGElement>(null)
  const [timestamp, setTimestamp] = useState<{
    time: string
    meridiem: string
    summary: string
    icon: number
  }>({
    time: '10:40',
    meridiem: 'AM',
    summary: 'Sunny',
    icon: 0,
  })
  const [temperature, setTemperature] = useState(0)

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
    const scrollX = window.scrollX
    const { width: lineWidth } = lineRef.current.getBoundingClientRect()
    const progress = Math.min(Math.max(scrollX / lineWidth, 0), 1)
    const totalLength = lineRef.current.getTotalLength()
    const { x, y } = lineRef.current.getPointAtLength(progress * totalLength)

    circleRef.current.setAttribute('cx', x.toString())
    circleRef.current.setAttribute('cy', y.toString())
    groupRef.current.setAttribute('transform', `translate(${x + 6}, ${y - 40})`)
    const { scaleX, scaleY, formattedSevenDayHourly } = graphData
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
    const { timezone } = weatherData

    setTimestamp({
      time: moment(timestamp).tz(timezone).format('hh:mm'),
      meridiem: moment(timestamp).tz(timezone).format('A'),
      summary: currentData?.summary ?? '',
      icon: currentData?.icon ?? 0,
    })
    setTemperature(temperature)
  }, [graphData, hasD, weatherData])

  useEffect(() => {
    handleAnimation()
    document.addEventListener('scroll', handleAnimation)
    return () => document.removeEventListener('scroll', handleAnimation)
  }, [handleAnimation])

  useEffect(() => {
    if (!graphData) return
    const { GRAPH_WIDTH, GRAPH_HEIGHT, GRAPH_POP_HEIGHT } = graphData
    setGraphSize({
      width: GRAPH_WIDTH,
      height: GRAPH_HEIGHT,
      popHeight: GRAPH_POP_HEIGHT,
    })
  }, [graphData])

  if (!graphData) return null

  return (
    <>
      <div className='h-full flex flex-col justify-end bg-grey-700 relative'>
        {/* Temp Chart */}
        <svg
          ref={mainChart}
          width={graphSize.width}
          height={graphSize.height}
          viewBox={`0 0 ${graphSize.width} ${graphSize.height}`}
        >
          <path
            ref={lineRef}
            d={graphData.graphTemp.tempLinePath ?? ''}
            className='invisible'
          />
          <path
            d={graphData.graphTemp.path ?? ''}
            fill={'url(#chart-gradient)'}
            id='graph-path'
          />
          <LinearGradient id='chart-gradient' stops={graphTempColorStops} />
          <circle
            r='6'
            ref={circleRef}
            fill='white'
            stroke='rgba(255, 255, 255, 0.3)'
            strokeWidth={8}
          />
          <g ref={groupRef} fill='white'>
            <WeatherIcon
              icon={timestamp.icon}
              x={0}
              y={-40}
              width={'100%'}
              height={'100%'}
            />
            <text x={0} y={0} textLength={40}>
              {timestamp.time}
            </text>
            <text x={42} y={-6} className='text-3xs'>
              {timestamp.meridiem}
            </text>
            <text x={0} y={20} className='text-2xs'>
              {timestamp.summary}
            </text>
          </g>
        </svg>
        {/* POP Chart */}
        <svg
          width={graphSize.width}
          height={graphSize.popHeight}
          viewBox={`0 0 ${graphSize.width} ${graphSize.popHeight}`}
        >
          <path
            d={graphData.graphPop.path ?? ''}
            fill={'url(#chart-pop-gradient)'}
            id='graph-pop-path'
          />
          <LinearGradient id='chart-pop-gradient' stops={graphTempColorStops} />
        </svg>

        <Background
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
      </div>
    </>
  )
}

export default Graph
