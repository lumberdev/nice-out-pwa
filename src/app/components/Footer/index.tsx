import { useGlobalContext } from '@/lib/GlobalContext'
import React from 'react'
import WeatherIcon from '../Icon'
import clsx from 'clsx'
import { motion } from 'framer-motion'
import { isSameDay } from 'date-fns'
import { formatInTimeZone } from 'date-fns-tz'
import { getConvertedTemperature } from '@/utils/unitConverter'

const Footer = () => {
  const { weatherData, currentDay, graphData, containerRef, isUnitMetric } =
    useGlobalContext()

  const firstSevenDays = weatherData?.daily.slice(0, 7)

  const getAverageTemp = (min: number, max: number, isUnitMetric: boolean) => {
    if (!min || !max) return '-'
    const averageTemp = Math.round((min + max) / 2)
    return getConvertedTemperature(averageTemp, isUnitMetric)
  }

  const handleClick = (index: number) => {
    if (!graphData) return
    const noon = graphData.dayBreaks[index]
    containerRef.current?.scrollTo({
      left: noon.noonValue.x - window.innerWidth / 2,
      behavior: 'smooth',
    })
  }

  return (
    <div className="sticky bottom-0 left-0 right-0 flex w-full bg-white/10 text-white">
      {firstSevenDays?.map((day, index) => {
        return (
          <button
            onClick={() => handleClick(index)}
            key={index}
            className={clsx(
              'relative flex w-full flex-col items-center justify-between gap-1 px-2 py-3',
            )}
          >
            <span className="text-2xs uppercase opacity-60 md:text-sm">
              {formatInTimeZone(
                day.forecastStart,
                weatherData?.timezone ?? '',
                'E',
              )}
            </span>
            <span className="pb-0.5">
              <WeatherIcon
                icon={5}
                // icon={day.icon}
                x={0}
                y={0}
                height={16}
                width={16}
                viewBox="0 0 24 24"
              />
            </span>
            <span className="relative left-0.5 text-2xs opacity-60 md:text-sm">
              {getAverageTemp(
                day.temperatureMin,
                day.temperatureMax,
                isUnitMetric,
              )}
              °
            </span>
            {isSameDay(day.forecastStart, currentDay?.forecastStart ?? '') && (
              <motion.div
                layoutId="selected"
                className={clsx('absolute inset-0 bg-white/30')}
              />
            )}
          </button>
        )
      })}
    </div>
  )
}

export default Footer
