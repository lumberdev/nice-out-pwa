import React, { useState, useRef } from 'react'
import { useGlobalContext } from '@/lib/GlobalContext'
import WeatherIcon from '../Icon'
import clsx from 'clsx'
import { roboto } from '@/app/fonts'
import ChipButton from '@/app/components/common/ChipButton'

const Temperature = () => {
  const [isFeelsLikeTemperature, setIsFeelsLikeTemperature] = useState(false)
  const longPressTimer = useRef<NodeJS.Timeout | null>(null)
  const [longPressTriggered, setLongPressTriggered] = useState(false)
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

  // Start long press detection
  const handleMouseDown = () => {
    setLongPressTriggered(false)
    longPressTimer.current = setTimeout(() => {
      setLongPressTriggered(true)
      console.log('Long press activated')
    }, 700)
  }

  // Clear the timer on mouse up
  const handleMouseUp = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current)
      longPressTimer.current = null
    }
  }

  // Handle onClick only if it's not a long press
  const handleClick = () => {
    if (!longPressTriggered) {
      console.log('Click without long press')
    }
  }

  return (
    <div className="flex min-w-40 flex-col items-center text-white md:min-w-60 ">
      <div
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onClick={handleClick}
        className={clsx(
          roboto.className,
          'flex cursor-pointer gap-0 font-thin md:gap-1',
        )}
      >
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
