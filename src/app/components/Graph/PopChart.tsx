import { useGlobalContext } from '@/lib/GlobalContext'
import { graphTempColorStops } from '@/utils'
import React from 'react'
import LinearGradient from '../LinearGradient'

const PopChart = ({ className }: { className?: string }) => {
  const { graphData, graphSize, weatherData } = useGlobalContext()

  const correctLocationName =
    weatherData?.locationName !== 'City of Spruce Grove'
  return (
    <svg
      className=""
      width={graphSize.width}
      height={graphSize.popHeight}
      viewBox={`0 0 ${graphSize.width} ${graphSize.popHeight}`}
    >
      {correctLocationName && (
        <mask id="fadeMask2" x="0" y="0">
          <rect
            width={graphSize.width}
            height={graphSize.height}
            fill="url(#horizontal-gradient)"
          />
        </mask>
      )}
      <path
        d={graphData?.graphPop.path ?? ''}
        fill={'url(#chart-pop-gradient)'}
        id="graph-pop-path"
        mask={correctLocationName ? 'url(#fadeMask2)' : 'url(#fadeMask)'}
      />
      <LinearGradient id="chart-pop-gradient" stops={graphTempColorStops} />
    </svg>
  )
}

export default PopChart
