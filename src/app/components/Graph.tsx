'use client'
import React, { Fragment, useEffect } from 'react'
import Background from './Background'
import { useGlobalContext } from '@/lib/GlobalContext'
import { graphTempColorStops } from '@/utils'
import LinearGradient from './LinearGradient'

import WeatherIcon from './Icon'

const Graph = () => {
  const {
    graphData,
    circleRef,
    containerRef,
    graphSize,
    groupRef,
    handleAnimation,
    isItDay,
    lineRef,
    mainChart,
    timestamp,
  } = useGlobalContext()

  useEffect(() => {
    handleAnimation()
  }, [handleAnimation])

  if (!graphData) return null

  return (
    <>
      <div
        onScroll={handleAnimation}
        ref={containerRef}
        className='h-full flex flex-col justify-end bg-grey-700 relative overflow-x-scroll'
      >
        <svg
          className='absolute bottom-0 left-0 z-0'
          width={graphSize.width}
          height={graphSize.height + graphSize.popHeight}
        >
          {/* Day breaks + sunrise and sunset lines */}
          {graphData.dayBreaks.map((dayBreak, index) => {
            return (
              <Fragment key={dayBreak.xValue}>
                {dayBreak.xValue > window.innerWidth / 2 && (
                  <line
                    key={index}
                    x1={dayBreak.xValue - 1}
                    x2={dayBreak.xValue - 1}
                    y1={graphSize.height + graphSize.popHeight}
                    y2={dayBreak.yValue}
                    stroke='rgba(255, 255, 255, 0.8)'
                    strokeWidth={2}
                  />
                )}
                {dayBreak.twilight.sunrise.x > window.innerWidth / 2 && (
                  <g transform={`translate(${dayBreak.twilight.sunrise.x}, 0)`}>
                    <line
                      y1={graphSize.height + graphSize.popHeight}
                      y2={dayBreak.twilight.sunrise.y}
                      stroke='rgba(255, 255, 255, 0.8)'
                      strokeDasharray={5}
                      strokeWidth={2}
                    />
                    <text
                      x={25}
                      y={dayBreak.twilight.sunrise.y - 10}
                      className='text-sm font-bold tracking-wider fill-white/75'
                    >
                      {dayBreak.twilight.sunrise.time}
                    </text>
                    <WeatherIcon
                      icon={'sunrise'}
                      x={-12.5}
                      y={dayBreak.twilight.sunrise.y - 25}
                      width={'100%'}
                      height={'100%'}
                    />
                  </g>
                )}
                {dayBreak.twilight.sunset.x > window.innerWidth / 2 && (
                  <g transform={`translate(${dayBreak.twilight.sunset.x}, 0)`}>
                    <line
                      y1={graphSize.height + graphSize.popHeight}
                      y2={dayBreak.twilight.sunset.y}
                      stroke='rgba(255, 255, 255, 0.8)'
                      strokeDasharray={5}
                      strokeWidth={2}
                    />
                    <text
                      x={25}
                      y={dayBreak.twilight.sunset.y - 10}
                      className='text-sm font-bold tracking-wider fill-white/75'
                    >
                      {dayBreak.twilight.sunset.time}
                    </text>
                    <WeatherIcon
                      icon={'sunset'}
                      x={-12.5}
                      y={dayBreak.twilight.sunset.y - 25}
                      width={'100%'}
                      height={'100%'}
                    />
                  </g>
                )}
              </Fragment>
            )
          })}
        </svg>

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
          icon={timestamp.icon}
          id='chart-bg-gradient'
          isItDay={isItDay}
        />
      </div>
    </>
  )
}

export default Graph
