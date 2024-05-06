import { useGlobalContext } from '@/lib/GlobalContext'
import { graphTempColorStops } from '@/utils'
import React from 'react'
import WeatherIcon from '../Icon'
import LinearGradient from '../LinearGradient'

const TemperatureChart = ({ className }: { className?: string }) => {
  const {
    mainChart,
    graphData,
    graphSize,
    lineRef,
    timestamp,
    circleRef,
    groupRef,
  } = useGlobalContext()
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
          icon={timestamp.icon}
          x={0}
          y={-40}
          width={'100%'}
          height={'100%'}
        />
        <text x={0} y={0} textLength={40}>
          {timestamp.time}
        </text>
        <text x={42} y={-6} className="text-4xs">
          {timestamp.meridiem}
        </text>
        <text x={0} y={20} className="text-3xs">
          {timestamp.summary}
        </text>
      </g>
    </svg>
  )
}

export default TemperatureChart
