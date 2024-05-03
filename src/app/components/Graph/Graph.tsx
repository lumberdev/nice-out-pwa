import React, { useEffect } from 'react'
import { useGlobalContext } from '@/lib/GlobalContext'
import DayBreaks from './DayBreaks'
import TemperatureChart from './TemperatureChart'
import PopChart from './PopChart'
import Loader from '../Loader'

const Graph = () => {
  const { graphData, handleAnimation, dotRef, chartContainerRef } =
    useGlobalContext()

  useEffect(() => {
    handleAnimation()
  }, [handleAnimation])

  if (!graphData) {
    return (
      <div className="grid h-full place-items-center">
        <Loader />
      </div>
    )
  }

  return (
    <div ref={chartContainerRef} className="relative">
      <div
        ref={dotRef}
        className="-translate-1/2 fixed left-1/2  top-10 h-4 w-4 rounded-full bg-white"
      />

      <DayBreaks className="" />
      <TemperatureChart className="" />
      <PopChart className="" />
    </div>
  )
}

export default Graph
