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
      <path
        d={graphData?.graphPop.path ?? ''}
        fill={'url(#chart-pop-gradient)'}
        id="graph-pop-path"
        mask="url(#fadeMask)"
      />
      <LinearGradient id="chart-pop-gradient" stops={graphTempColorStops} />
    </svg>
  )
}

export default PopChart
