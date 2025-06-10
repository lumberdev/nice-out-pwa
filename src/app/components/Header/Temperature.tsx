import React, { useState, useRef, useEffect } from 'react'
import { useGlobalContext } from '@/lib/GlobalContext'
import WeatherIcon from '../Icon'
import clsx from 'clsx'
import { roboto } from '@/app/fonts'
import ChipButton from '@/app/components/common/ChipButton'
import 'moment'
import 'moment/min/locales'
import moment from 'moment-timezone'

const FEELS_LIKE_KEY = 'isFeelsLikeTemperature'

const Temperature = () => {
  const [isFeelsLikeTemperature, setIsFeelsLikeTemperature] = useState(() => {
    if (typeof window === 'undefined') return false
    const saved = localStorage.getItem(FEELS_LIKE_KEY)
    return saved === 'true'
  })
  const longPressTimer = useRef<NodeJS.Timeout | null>(null)
  const [longPressTriggered, setLongPressTriggered] = useState(false)
  const {
    temperatureData,
    setIsUnitMetric,
    containerRef,
    graphData,
    weatherData,
  } = useGlobalContext()
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

  // Update localStorage when isFeelsLikeTemperature changes
  useEffect(() => {
    localStorage.setItem(FEELS_LIKE_KEY, String(isFeelsLikeTemperature))
  }, [isFeelsLikeTemperature])

  // Start long press detection
  const handleMouseDown = () => {
    setLongPressTriggered(false)
    longPressTimer.current = setTimeout(() => {
      setLongPressTriggered(true)
      setIsUnitMetric((prev) => !prev)
    }, 500)
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
    containerRef.current?.scrollTo({
      left:
        graphData?.scaleX(
          moment.tz(moment(), weatherData?.timezone ?? '').valueOf() ?? 0,
        ) ?? 0,
      behavior: 'smooth',
    })
  }

  return (
    <div className="flex min-w-40 max-w-40 animate-[slide-in-left_0.5s_ease-in-out_forwards] flex-col items-center text-white transition-transform md:min-w-60">
      <div
        onTouchStart={handleMouseDown}
        onTouchEnd={handleMouseUp}
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
              width={16}
              height={16}
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
              width={16}
              height={16}
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
