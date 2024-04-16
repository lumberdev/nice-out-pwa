import React, { useState } from 'react'
import { useGlobalContext } from '@/lib/GlobalContext'
import WeatherIcon from '../Icon'
import clsx from 'clsx'
import { roboto } from '@/app/fonts'
import ChipButton from '@/app/components/common/ChipButton'

const Temperature = () => {
  const [isFeelsLikeTemperature, setIsFeelsLikeTemperature] = useState(false)
  const { temperatureData } = useGlobalContext()
  const {
    temperature,
    feelsLikeTemperature,
    currentDayMaxTemp,
    currentDayMinTemp,
    currentDayFeelsLikeMaxTemp,
    currentDayFeelsLikeMinTemp,
  } = temperatureData

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
    <div className="min-w-40 flex flex-col items-center text-white md:min-w-60 ">
      <div className={clsx(roboto.className, 'flex gap-0 font-thin md:gap-1')}>
        <div className="text-[7.5rem] leading-none md:text-9xl">
          {isFeelsLikeTemperature
            ? formattedTemperature(feelsLikeTemperature)
            : formattedTemperature(temperature)}
        </div>
        <div className="relative top-2 text-5xl leading-none md:text-6xl">
          °
        </div>
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
            <div className="text-sm font-medium md:text-xl">
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
            <div className="text-sm font-medium md:text-xl">
              {isFeelsLikeTemperature
                ? formattedTemperature(currentDayFeelsLikeMinTemp)
                : formattedTemperature(currentDayMinTemp)}
            </div>
          </div>
        </div>
        <ChipButton onClick={handleTemperatureTypeChange}>
          {isFeelsLikeTemperature ? 'Feels Like' : 'Temperature'}
        </ChipButton>
      </div>
    </div>
  )
}

export default Temperature
