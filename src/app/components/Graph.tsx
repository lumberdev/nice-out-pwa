import React, { Fragment, useEffect } from 'react'
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

  if (!graphData) {
    return (
      <div className="grid h-full place-items-center">
        <svg
          width="48"
          height="48"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          className="animate-spin text-white"
        >
          <path
            d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z"
            opacity=".25"
            className="fill-current stroke-current"
          />
          <path
            d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z"
            className="fill-current stroke-current"
          />
        </svg>
      </div>
    )
  }

  return (
    <div
      onScroll={handleAnimation}
      ref={containerRef}
      className="bg-grey-700 relative flex h-full flex-col justify-end overflow-x-scroll"
    >
      <svg
        className="absolute bottom-0 left-0 z-0"
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
                  stroke="rgba(255, 255, 255, 0.8)"
                  strokeWidth={2}
                />
              )}
              {dayBreak.twilight.sunrise.x > window.innerWidth / 2 && (
                <g transform={`translate(${dayBreak.twilight.sunrise.x}, 0)`}>
                  <line
                    y1={graphSize.height + graphSize.popHeight}
                    y2={dayBreak.twilight.sunrise.y}
                    stroke="rgba(255, 255, 255, 0.8)"
                    strokeDasharray={5}
                    strokeWidth={2}
                  />
                  <text
                    x={25}
                    y={dayBreak.twilight.sunrise.y - 10}
                    className="fill-white/75 text-sm font-bold tracking-wider"
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
                    stroke="rgba(255, 255, 255, 0.8)"
                    strokeDasharray={5}
                    strokeWidth={2}
                  />
                  <text
                    x={25}
                    y={dayBreak.twilight.sunset.y - 10}
                    className="fill-white/75 text-sm font-bold tracking-wider"
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
          className="invisible"
        />

        <path
          d={graphData.graphTemp.path ?? ''}
          fill={'url(#chart-gradient)'}
          id="graph-path"
        />

        <LinearGradient id="chart-gradient" stops={graphTempColorStops} />
        <circle
          r="6"
          ref={circleRef}
          fill="white"
          stroke="rgba(255, 255, 255, 0.3)"
          strokeWidth={8}
        />
        <g ref={groupRef} fill="white">
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
          <text x={42} y={-6} className="text-3xs">
            {timestamp.meridiem}
          </text>
          <text x={0} y={20} className="text-2xs">
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
          id="graph-pop-path"
        />
        <LinearGradient id="chart-pop-gradient" stops={graphTempColorStops} />
      </svg>
    </div>
  )
}

export default Graph
