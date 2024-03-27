'use client'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import * as d3 from 'd3'
import LinearGradient from './LinearGradient'
import { useGlobalContext } from '@/lib/GlobalContext'
import { graphTempColorStops, normalizePosition } from '@/utils'

const Graph = () => {
  const { graphData } = useGlobalContext()
  const d3Chart = useRef<SVGSVGElement>(null)
  const pathRef = useRef<SVGPathElement>(null)
  const bgRef = useRef(null)
  const cursorRef = useRef<HTMLDivElement>(null)
  const circleRef = useRef<SVGCircleElement>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [graphSize, setGraphSize] = useState({ width: 0, height: 0 })
  const [isChartDrawn, setIsChartDrawn] = useState(false)

  const drawChart = useCallback(() => {
    if (!graphData) return
    const { graphTemp, GRAPH_WIDTH, GRAPH_HEIGHT, margins, scaleY } = graphData
    setGraphSize({ width: GRAPH_WIDTH, height: GRAPH_HEIGHT })

    d3.select(pathRef.current)
      .attr('d', graphTemp.path)
      .attr('fill', 'url(#chart-gradient)')
      .attr('id', 'graph-path')

    d3.select(d3Chart.current)
      .append('defs')
      .append('linearGradient')
      .attr('id', 'chart-gradient')
      .attr('gradientUnits', 'userSpaceOnUse')
      .attr('x1', '50%')
      .attr('y1', '0%')
      .attr('x2', '50%')
      .attr('y2', '100%')
      .selectAll('stop')
      .data(graphTempColorStops)
      .enter()
      .append('stop')
      .attr('offset', (d, i) => `${i * 20}%`)
      .attr('stop-color', (d) => d.stopColor)
      .attr('stop-opacity', (d) => d.stopOpacity)
  }, [graphData])
  const hasD = !!pathRef.current?.getAttribute('d')

  const handleScroll = useCallback(() => {
    if (!d3Chart.current || !pathRef.current || !circleRef.current || !hasD) {
      return
    }
    const { width: totalWidth } = d3Chart.current.getBoundingClientRect()
    const { width: pathWidth } = pathRef.current.getBoundingClientRect()
    const { scrollLeft: docScrollLeft } = document.documentElement

    const progress = normalizePosition(
      totalWidth - window.innerWidth,
      docScrollLeft,
    )
    const cursorPosition = pathRef.current?.getPointAtLength(
      progress * totalWidth,
    )
    console.log('cursorPosition', cursorPosition)
    console.log('pathWidth', pathWidth + window.innerWidth / 2)
    circleRef.current.setAttribute('cy', cursorPosition?.y.toString())
    circleRef.current.setAttribute('cx', (cursorPosition?.x).toString())
  }, [hasD])

  useEffect(() => {
    if (!pathRef.current || !hasD || !circleRef.current) return
    const initialPosition = pathRef.current?.getPointAtLength(0)
    circleRef.current?.setAttribute('cx', (initialPosition?.x ?? 0).toString())
    circleRef.current?.setAttribute('cy', (initialPosition?.y ?? 0).toString())

    document.addEventListener('scroll', handleScroll)
    return () => {
      document.removeEventListener('scroll', handleScroll)
    }
  }, [hasD, handleScroll])

  const drawBackground = useCallback(() => {
    d3.select(bgRef.current)
      .attr('width', document.body.clientWidth)
      .attr('height', document.body.clientHeight)
      .attr('viewBox', [
        0,
        0,
        document.body.clientWidth,
        document.body.clientHeight,
      ])
  }, [])

  useEffect(() => {
    const bgRefCurrent = bgRef.current
    const pathRefCurrent = pathRef.current
    drawChart()
    drawBackground()
    return () => {
      d3.select(pathRefCurrent).attr('d', '')
      d3.select(bgRefCurrent)
    }
  }, [drawChart, drawBackground])

  return (
    <div ref={containerRef} className='h-screen flex flex-col justify-end'>
      <div className='relative'>
        <svg
          className='overflow-auto relative'
          ref={d3Chart}
          width={graphSize.width}
          height={graphSize.height}
          viewBox={`0 0 ${graphSize.width} ${graphSize.height}`}
        >
          <path ref={pathRef} />
          <circle className='fixed' ref={circleRef} r='8' fill='grey' />
        </svg>

        <div
          ref={cursorRef}
          className='fixed w-5 h-5 rounded-full bg-white/60 flex items-center justify-center'
        >
          <div className='w-3 h-3 rounded-full bg-white'></div>
        </div>
      </div>
      <svg ref={bgRef} className='fixed inset-0 -z-10 '>
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
