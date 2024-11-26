import { useGlobalContext } from '@/lib/GlobalContext'
import { graphTempColorStops } from '@/utils'
import React from 'react'
import LinearGradient from '../LinearGradient'

const PopChart = ({ className }: { className?: string }) => {
  const { graphData, graphSize } = useGlobalContext()

  return (
    <svg
      className=""
      width={graphSize.width}
      height={graphSize.popHeight}
      viewBox={`0 0 ${graphSize.width} ${graphSize.popHeight}`}
    >
      <mask id="fadeMaskPop" x="0" y="0">
        <rect
          width={graphSize.width}
          height={graphSize.height}
          fill="url(#horizontal-gradient)"
        />
      </mask>
      <path
        d={graphData?.graphPop.path ?? ''}
        fill={'url(#chart-pop-gradient)'}
        id="graph-pop-path"
        mask={'url(#fadeMaskPop)'}
      />
      <LinearGradient id="chart-pop-gradient" stops={graphTempColorStops} />
    </svg>
  )
}

export default PopChart
