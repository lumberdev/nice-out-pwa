'use client'
import React, { useEffect, useRef, useState } from 'react'
import * as d3 from 'd3'
import Background from './Background'
import { useGlobalContext } from '@/lib/GlobalContext'
import { graphTempColorStops } from '@/utils'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import MotionPathPlugin from 'gsap/MotionPathPlugin'

import { useGSAP } from '@gsap/react'
import LinearGradient from './LinearGradient'

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin, useGSAP)

const Graph = () => {
  const { graphData } = useGlobalContext()
  const mainChart = useRef<SVGSVGElement>(null)
  const lineRef = useRef<SVGPathElement>(null)
  const scroller = useRef<HTMLDivElement | null>(null)
  const wrapperRef = useRef<HTMLDivElement | null>(null)
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
      if (!lineRef.current || !circleRef.current || !mainChart.current || !hasD)
        return
      const chartHeight = mainChart.current.getBoundingClientRect().height * 1.5

      gsap.set(scroller.current, {
        width: graphSize.width,
        height: chartHeight,
      })
      gsap.set(wrapperRef.current, {
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
      let positionX = 0
      const xSet = gsap.quickSetter(wrapperRef.current, 'x', 'px')
      gsap.ticker.add(() => {
        positionX +=
          (-gsap.getProperty(circleRef.current, 'x') - positionX) * delay
        xSet(positionX)
      })
    },
    {
      dependencies: [hasD],
    },
  )

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
        <div ref={scroller} />
        <div ref={wrapperRef} className='fixed'>
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
            <circle ref={circleRef} r='8' fill='grey' />\
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
            <LinearGradient
              id='chart-pop-gradient'
              stops={graphTempColorStops}
            />
          </svg>
        </div>

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
