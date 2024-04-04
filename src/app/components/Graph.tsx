'use client'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import Background from './Background'
import { useGlobalContext } from '@/lib/GlobalContext'
import { graphTempColorStops } from '@/utils'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import MotionPathPlugin from 'gsap/MotionPathPlugin'

import { useGSAP } from '@gsap/react'
import LinearGradient from './LinearGradient'
import moment from 'moment'

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin, useGSAP)

const Graph = () => {
  const { graphData, weatherData } = useGlobalContext()
  const mainChart = useRef<SVGSVGElement>(null)
  const lineRef = useRef<SVGPathElement>(null)
  const circleRef = useRef<SVGCircleElement>(null)
  const groupRef = useRef<SVGGElement>(null)
  const textRef = useRef<SVGTextElement>(null)
  const [timestamp, setTimestamp] = useState('')
  const [temperature, setTemperature] = useState(0)
  const [graphSize, setGraphSize] = useState({
    width: 0,
    height: 0,
    popHeight: 0,
  })
  const hasD = !!lineRef.current?.getAttribute('d')

  useEffect(() => {
    if (!lineRef.current || !hasD || !circleRef.current || !textRef.current)
      return
    const initialPosition = lineRef.current?.getPointAtLength(0)
    circleRef.current.setAttribute('cx', (initialPosition?.x ?? 0).toString())
    circleRef.current.setAttribute('cy', (initialPosition?.y ?? 0).toString())
    textRef.current.setAttribute('x', (initialPosition?.x ?? 0).toString())
    textRef.current.setAttribute('y', (initialPosition?.y ?? 0).toString())
    textRef.current.style.transformBox = 'fill-box'
  }, [hasD])

  const handleScroll = useCallback(() => {
    if (
      !lineRef.current ||
      !hasD ||
      !circleRef.current ||
      !graphData ||
      !weatherData ||
      !textRef.current
    )
      return
    const scrollX = window.scrollX
    const { width: lineWidth } = lineRef.current.getBoundingClientRect()
    const progress = Math.min(Math.max(scrollX / lineWidth, 0), 1)
    const totalLength = lineRef.current.getTotalLength()
    const { x, y } = lineRef.current.getPointAtLength(progress * totalLength)

    circleRef.current.setAttribute('cx', x.toString())
    circleRef.current.setAttribute('cy', y.toString())
    textRef.current.setAttribute('x', (x ?? 0).toString())
    textRef.current.setAttribute('y', (y ?? 0).toString())
    textRef.current.style.transform = `translate(-50%, -100%)`
    const { scaleX, scaleY } = graphData
    const timestamp = scaleX.invert(x)
    const temperature = scaleY.invert(y)
    const { timezone } = weatherData
    setTimestamp(moment(timestamp).tz(timezone).format('hh:mm A'))
    setTemperature(temperature)
  }, [graphData, hasD])

  useEffect(() => {
    document.addEventListener('scroll', handleScroll)
    return () => document.removeEventListener('scroll', handleScroll)
  })

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
          <g ref={groupRef} fill='grey'>
            <circle r='8' ref={circleRef} />
            <text ref={textRef}>{timestamp}</text>
          </g>
          <LinearGradient id='chart-gradient' stops={graphTempColorStops} />
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
