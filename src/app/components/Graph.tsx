'use client'
import React, {
  WheelEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import * as d3 from 'd3'
import LinearGradient from './LinearGradient'
import { useGlobalContext } from '@/lib/GlobalContext'
import { graphTempColorStops, normalizePosition } from '@/utils'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import MotionPathPlugin from 'gsap/MotionPathPlugin'
import { url } from 'inspector'
gsap.registerPlugin(ScrollTrigger, MotionPathPlugin)
const Graph = () => {
  const { graphData } = useGlobalContext()
  const d3Chart = useRef<SVGSVGElement>(null)
  const pathRef = useRef<SVGPathElement>(null)
  const scroller = useRef<HTMLDivElement | null>(null)
  const wrapperRef = useRef<HTMLDivElement | null>(null)
  const bgRef = useRef(null)
  const circleRef = useRef<SVGCircleElement>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [graphSize, setGraphSize] = useState({ width: 0, height: 0 })
  const drawChart = useCallback(() => {
    if (!graphData) return
    const {
      graphTemp,
      graphPop,
      GRAPH_WIDTH,
      GRAPH_HEIGHT,
      GRAPH_POP_HEIGHT,
      margins,
      scaleY,
    } = graphData
    setGraphSize({ width: GRAPH_WIDTH, height: GRAPH_HEIGHT })
    // const svg2 = d3
    //   .select(containerRef.current)
    //   .append('svg')
    //   .attr('width', GRAPH_WIDTH)
    //   .attr('height', GRAPH_POP_HEIGHT)
    //   .attr('viewBox', `0 0 ${GRAPH_WIDTH} ${GRAPH_POP_HEIGHT}`)
    // svg2
    //   .append('path')
    //   .attr('d', graphPop.path)
    //   .attr('fill', 'url(#graph-pop-gradient)')
    //   .attr('id', 'graph-pop-path')
    // svg2
    //   .append('defs')
    //   .append('linearGradient')
    //   .attr('id', 'graph-pop-gradient')
    //   .attr('gradientUnits', 'userSpaceOnUse')
    //   .attr('x1', '0%')
    //   .attr('y1', '0%')
    //   .attr('x2', '0%')
    //   .attr('y2', '100%')
    //   .selectAll('stop')
    //   .data(graphTempColorStops)
    //   .enter()
    //   .append('stop')
    //   .attr('offset', (d, i) => d.offset)
    //   .attr('stop-color', (d) => d.stopColor)
    //   .attr('stop-opacity', (d) => d.stopOpacity)
    d3.select(pathRef.current)
      .attr('d', graphTemp.path)
      .attr('fill', 'url(#chart-gradient)')
      .attr('id', 'graph-path')

    const svg = d3.select(d3Chart.current)

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
      .attr('offset', (d, i) => d.offset)
      .attr('stop-color', (d) => d.stopColor)
      .attr('stop-opacity', (d) => d.stopOpacity)
  }, [graphData])
  const hasD = !!pathRef.current?.getAttribute('d')

  useEffect(() => {
    if (
      !pathRef.current ||
      !hasD ||
      !circleRef.current ||
      !graphData ||
      !d3Chart.current ||
      !wrapperRef.current
    )
      return
    const initialPosition = pathRef.current?.getPointAtLength(0)
    circleRef.current?.setAttribute('cx', (initialPosition?.x ?? 0).toString())
    circleRef.current?.setAttribute('cy', (initialPosition?.y ?? 0).toString())
    const { GRAPH_WIDTH } = graphData
    const { width: pathWidth } = pathRef.current.getBoundingClientRect()
    const ww = window.innerWidth,
      scrollDist = pathWidth,
      chartWidth = d3Chart.current.getBoundingClientRect().width,
      chartHeight = d3Chart.current.getBoundingClientRect().height
    gsap.set(scroller.current, {
      width: scrollDist,
      height: chartHeight,
    })
    gsap.set(wrapperRef.current, {
      position: 'fixed',
      width: scrollDist,
      height: chartHeight,
      autoAlpha: 1,
    })

    const timeline = gsap.timeline({
      ease: 'none',
      scrollTrigger: {
        trigger: pathRef.current,
        start: 'left center',
        end: `${scrollDist / 4}`,
        endTrigger: pathRef.current,
        scrub: true,
        horizontal: true,
        markers: true,
        onUpdate: (self) => {
          console.log('progress', self.progress)

          console.log(position.x)
          console.log({
            x: Math.abs(position.x),
            graphSize,
            GRAPH_WIDTH,
            pathWidth,
          })
        },
      },
    })

    timeline.to(
      circleRef.current,
      {
        motionPath: {
          path: pathRef.current,
          align: pathRef.current,
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
      if (Math.abs(position.x) < GRAPH_WIDTH - ww) {
        console.log('setting position.x ', position.x)
        position.x +=
          (-gsap.getProperty(circleRef.current, 'x') - position.x) * delay
        xSet(position.x)
      }
    })
  }, [hasD, graphData, graphSize])

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
    const containerRefCurrent = containerRef.current
    drawChart()
    drawBackground()
    return () => {
      d3.select(pathRefCurrent).attr('d', '')
      d3.select(bgRefCurrent)
      d3.select(containerRefCurrent).select('#graph-pop-path').remove()
    }
  }, [drawChart, drawBackground])

  return (
    <>
      <div
        ref={containerRef}
        className='h-full flex flex-col justify-end bg-grey-700 relative overflow-hidden'
      >
        <div ref={scroller} />
        <div ref={wrapperRef}>
          <svg
            ref={d3Chart}
            width={graphSize.width}
            height={graphSize.height}
            viewBox={`0 0 ${graphSize.width} ${graphSize.height}`}
            className='absolute overflow-visible'
          >
            <path ref={pathRef} />
            <circle ref={circleRef} r='8' fill='grey' />
          </svg>
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
    </>
  )
}

export default Graph
