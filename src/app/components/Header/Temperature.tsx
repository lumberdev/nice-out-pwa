import React, { useState } from 'react'
import { useGlobalContext } from '@/lib/GlobalContext'
import WeatherIcon from '../Icon'
import clsx from 'clsx'
import { roboto } from '@/app/fonts'

const Temperature = () => {
  const [isFeelsLikeTemperature, setIsFeelsLikeTemperature] = useState(false)
  const { temperatureData, graphData } = useGlobalContext()
  const {
    temperature,
    feelsLikeTemperature,
    currentDayMaxTemp,
    currentDayMinTemp,
    currentDayFeelsLikeMaxTemp,
    currentDayFeelsLikeMinTemp,
  } = temperatureData
  if (!graphData) return null

  const formattedTemperature = (temperature: number | undefined) => {
    if (temperature !== undefined) {
      return Math.round(temperature)
    }
    return '-'
  }

  const handleTemperatureTypeChange = () => {
    setIsFeelsLikeTemperature((prev) => !prev)
  }
  return (
    <div className="flex min-w-[15rem] flex-col items-center text-white ">
      <div className={clsx(roboto.className, 'flex gap-1 font-thin')}>
        <div className="text-[8rem] leading-none">
          {isFeelsLikeTemperature
            ? formattedTemperature(feelsLikeTemperature)
            : formattedTemperature(temperature)}
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
              {isFeelsLikeTemperature
                ? formattedTemperature(currentDayFeelsLikeMaxTemp)
                : formattedTemperature(currentDayMaxTemp)}
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
              {isFeelsLikeTemperature
                ? formattedTemperature(currentDayFeelsLikeMinTemp)
                : formattedTemperature(currentDayMinTemp)}
            </div>
          </div>
        </div>
        <button
          onClick={handleTemperatureTypeChange}
          className="flex cursor-pointer items-center justify-center rounded-full bg-white/30 px-3 leading-none transition-colors hover:bg-white/20"
        >
          {isFeelsLikeTemperature ? 'Feels Like' : 'Temperature'}
        </button>
      </div>
    </div>
  )
}

export default Temperature
