import React, { useEffect, useState } from 'react'
import { useGlobalContext } from '@/lib/GlobalContext'
import WeatherIcon from '../Icon'
import clsx from 'clsx'
import { roboto } from '@/app/fonts'

const Temperature = () => {
  const { temperature, graphData, currentDayMaxTemp, currentDayMinTemp } =
    useGlobalContext()
  if (!graphData) return null
  return (
    <div className="flex flex-col items-center text-white">
      <div className={clsx(roboto.className, 'flex gap-1 font-thin')}>
        <div className="text-[8rem] leading-none">
          {Math.round(temperature)}
        </div>
        <div className="relative top-2 text-[4rem] leading-none">°</div>
      </div>
      <div className="flex justify-between gap-3">
        <div className="flex items-center gap-1">
          <div className="flex items-center">
            <WeatherIcon
              icon={'min'}
              x={0}
              y={0}
              width={'1rem'}
              height={'1rem'}
              viewBox="0 0 24 24"
            />
            <div className="text-[1.25rem] font-medium">
              {Math.round(currentDayMaxTemp)}
            </div>
          </div>
          <div className="flex items-center">
            <WeatherIcon
              icon={'max'}
              x={0}
              y={0}
              width={'1rem'}
              height={'1rem'}
              viewBox="0 0 24 24"
            />
            <div className="text-[1.25rem] font-medium">
              {Math.round(currentDayMinTemp)}
            </div>
          </div>
        </div>
        <div className="flex cursor-pointer items-center justify-center rounded-full bg-white/30 px-3 leading-none">
          Temperature
        </div>
      </div>
    </div>
  )
}

export default Temperature
