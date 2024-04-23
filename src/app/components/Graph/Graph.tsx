import React, { useEffect } from 'react'
import { useGlobalContext } from '@/lib/GlobalContext'
import DayBreaks from './DayBreaks'
import TemperatureChart from './TemperatureChart'
import PopChart from './PopChart'
import Loader from '../Loader'

const Graph = () => {
  const { graphData, containerRef, chartContainerRef, handleAnimation } =
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
    <div className="relative ">
      {/* <div className="h-96 w-[3000px]" /> */}
      <div ref={chartContainerRef} className=" bottom-[84px]">
        <DayBreaks className="" />
        <TemperatureChart className="" />
        <PopChart className="" />
      </div>
    </div>
  )
}

export default Graph
