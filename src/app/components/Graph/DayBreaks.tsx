import React, { Fragment } from 'react'
import WeatherIcon from '../Icon'
import { useGlobalContext } from '@/lib/GlobalContext'
import clsx from 'clsx'

const DayBreaks = ({ className }: { className?: string }) => {
  const { graphSize, graphData } = useGlobalContext()
  return (
    <svg
      className={clsx('absolute bottom-0 left-0 ', className)}
      width={graphSize.width}
      height={graphSize.height + graphSize.popHeight}
    >
      {/* Day breaks + sunrise and sunset lines */}
      {graphData?.dayBreaks.map((dayBreak, index) => {
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
  )
}

export default DayBreaks
