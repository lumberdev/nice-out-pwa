'use client'
import React, { useEffect, useRef, useState } from 'react'
import * as d3 from 'd3'
import LinearGradient from './LinearGradient'
import { useGlobalContext } from '@/lib/GlobalContext'
import { drawLinearGradient, graphTempColorStops } from '@/utils'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import MotionPathPlugin from 'gsap/MotionPathPlugin'

import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin, useGSAP)

const Graph = () => {
  const { graphData } = useGlobalContext()
  const mainChart = useRef<SVGSVGElement>(null)
  const secondaryChart = useRef<SVGSVGElement>(null)
  const lineRef = useRef<SVGPathElement>(null)
  const scroller = useRef<HTMLDivElement | null>(null)
  const wrapperRef = useRef<HTMLDivElement | null>(null)
  const tempPath = useRef<SVGPathElement>(null)
  const popPath = useRef<SVGPathElement>(null)
  const bgRef = useRef(null)
  const circleRef = useRef<SVGCircleElement>(null)
  const [graphSize, setGraphSize] = useState({
    width: 0,
    height: 0,
    popHeight: 0,
  })
  const hasD = !!lineRef.current?.getAttribute('d')

  useEffect(() => {
    if (!lineRef.current || !hasD || !circleRef.current) return
    const initialPosition = lineRef.current?.getPointAtLength(0)
    circleRef.current?.setAttribute('cx', (initialPosition?.x ?? 0).toString())
    circleRef.current?.setAttribute('cy', (initialPosition?.y ?? 0).toString())
  }, [hasD])

  useGSAP(
    () => {
      if (
        !lineRef.current ||
        !circleRef.current ||
        !mainChart.current ||
        !secondaryChart.current ||
        !hasD
      )
        return
      const chartHeight = mainChart.current.getBoundingClientRect().height * 1.5

      gsap.set(scroller.current, {
        width: graphSize.width,
        height: chartHeight,
      })
      gsap.set(wrapperRef.current, {
        position: 'fixed',
        width: graphSize.width,
        height: chartHeight,
      })

      gsap
        .timeline({
          ease: 'none',
          scrollTrigger: {
            trigger: lineRef.current,
            start: 'left center',
            end: `right center`,
            scrub: true,
            horizontal: true,
            markers: true,
          },
        })
        .to(
          circleRef.current,
          {
            motionPath: {
              path: lineRef.current,
              align: lineRef.current,
              autoRotate: true,
              alignOrigin: [0.5, 0.5],
            },
          },
          0,
        )

      let delay = 0.6
      let position = { x: 0 }
      const xSet = gsap.quickSetter(wrapperRef.current, 'x', 'px')
      gsap.ticker.add(() => {
        position.x +=
          (-gsap.getProperty(circleRef.current, 'x') - position.x) * delay
        xSet(position.x)
      })
    },
    {
      dependencies: [hasD],
    },
  )

  useEffect(() => {
    const tempPathCurrent = tempPath.current
    const popPathCurrent = popPath.current
    const lineRefCurrent = lineRef.current
    const mainChartCurrent = mainChart.current
    const secondaryChartCurrent = secondaryChart.current
    if (!graphData) return
    const { graphTemp, graphPop, GRAPH_WIDTH, GRAPH_HEIGHT, GRAPH_POP_HEIGHT } =
      graphData
    setGraphSize({
      width: GRAPH_WIDTH,
      height: GRAPH_HEIGHT,
      popHeight: GRAPH_POP_HEIGHT,
    })
    /**
     * Our temperature graph
     */
    d3.select(tempPath.current)
      .attr('d', graphTemp.path)
      .attr('fill', 'url(#chart-gradient)')
      .attr('id', 'graph-path')
    /**
     * Hidden line for the circle to follow
     * If we used the temperature graph path, the circle would loop around the graph.
     */
    d3.select(lineRef.current)
      .attr('d', graphTemp.tempLinePath)
      .style('visibility', 'hidden')
    /**
     * Our POP graph
     */
    d3.select(popPath.current)
      .attr('d', graphPop.path)
      .attr('fill', 'url(#chart-pop-gradient)')
      .attr('id', 'graph-pop-path')

    const mainSvg = d3.select(mainChart.current)
    const secondarySvg = d3.select(secondaryChart.current)

    drawLinearGradient(mainSvg, 'chart-gradient', graphTempColorStops)
    drawLinearGradient(secondarySvg, 'chart-pop-gradient', graphTempColorStops)

    return () => {
      d3.select(tempPathCurrent).attr('d', '')
      d3.select(popPathCurrent).attr('d', '')
      d3.select(lineRefCurrent).attr('d', '')
      d3.select(mainChartCurrent).selectAll('defs').remove()
      d3.select(secondaryChartCurrent).selectAll('defs').remove()
    }
  }, [graphData])

  return (
    <>
      <div className='h-full flex flex-col justify-end bg-grey-700 relative'>
        <div ref={scroller} />
        <div ref={wrapperRef}>
          <svg
            ref={mainChart}
            width={graphSize.width}
            height={graphSize.height}
            viewBox={`0 0 ${graphSize.width} ${graphSize.height}`}
          >
            <path ref={lineRef} />
            <path ref={tempPath} />

            <circle ref={circleRef} r='8' fill='grey' />
          </svg>
          <svg
            ref={secondaryChart}
            width={graphSize.width}
            height={graphSize.popHeight}
            viewBox={`0 0 ${graphSize.width} ${graphSize.popHeight}`}
          >
            <path ref={popPath} />
          </svg>
        </div>

        <svg
          width={document.body.clientWidth}
          height={document.body.clientHeight}
          ref={bgRef}
          className='fixed inset-0 -z-10 '
        >
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
    </>
  )
}

export default Graph
