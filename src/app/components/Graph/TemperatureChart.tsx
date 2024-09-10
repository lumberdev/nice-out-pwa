'use Client'
import { useGlobalContext } from '@/lib/GlobalContext'
import { graphTempColorStops } from '@/utils'
import React, { useEffect } from 'react'
import WeatherIcon from '../Icon'
import LinearGradient from '../LinearGradient'
import clsx from 'clsx'
import { roboto } from '@/app/fonts'
import { getAdjustedConditionCode } from '@/utils/WeatherKitConditionCodes'
import 'moment'
import 'moment/min/locales'
import moment from 'moment-timezone'

const TemperatureChart = ({ className }: { className?: string }) => {
  const {
    mainChart,
    graphData,
    graphSize,
    lineRef,
    timestamp,
    circleRef,
    groupRef,
    containerRef,
    weatherData,
  } = useGlobalContext()

  useEffect(() => {
    const timeout = setTimeout(() => {
      containerRef.current?.scrollTo({
        left:
          (graphData?.scaleX(
            moment.tz(moment(), weatherData?.timezone ?? '').valueOf() ?? 0,
          ) ?? 0) -
          window.innerWidth / 2,
      })
    }, 50)
    return () => {
      clearTimeout(timeout)
    }
  }, [JSON.stringify(graphData)])

  return (
    <svg
      className={className}
      ref={mainChart}
      width={graphSize.width}
      height={graphSize.height}
      viewBox={`0 0 ${graphSize.width} ${graphSize.height}`}
    >
      <path
        ref={lineRef}
        d={graphData?.graphTemp.tempLinePath ?? ''}
        className="invisible"
      />

      <path
        d={graphData?.graphTemp.path ?? ''}
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
          icon={getAdjustedConditionCode(timestamp.icon, timestamp.daylight)}
          x={0}
          y={-45}
          width={'100%'}
          height={'100%'}
        />
        <text
          x={0}
          y={0}
          textLength={50}
          className={clsx(roboto.className, 'text-xl font-medium')}
        >
          {timestamp.time}
        </text>
        <text x={54} y={-6} className="text-3xs">
          {timestamp.meridiem}
        </text>
        <text x={0} y={16} className={clsx(roboto.className, 'text-3xs')}>
          {timestamp.summary}
        </text>
      </g>
    </svg>
  )
}

export default TemperatureChart
