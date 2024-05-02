import { useGlobalContext } from '@/lib/GlobalContext'
import React from 'react'
import WeatherIcon from '../Icon'
import clsx from 'clsx'
import { motion } from 'framer-motion'
import { isSameDay } from 'date-fns'
import { formatInTimeZone } from 'date-fns-tz'

const Footer = () => {
  const { weatherData, currentDay, graphData, containerRef } =
    useGlobalContext()

  const firstSevenDays = weatherData?.daily.slice(0, 7)

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
            <span className="text-sm font-light uppercase">
              {formatInTimeZone(day.day, weatherData?.timezone ?? '', 'E')}
            </span>
            <WeatherIcon
              icon={day.icon}
              x={0}
              y={0}
              height={16}
              width={16}
              viewBox="0 0 24 24"
            />
            <span className="text-xs">{day.statistics.temperature.avg}°</span>
            {isSameDay(day.day, currentDay?.day ?? '') && (
              <motion.div
                layoutId="selected"
                className={clsx('absolute inset-0 bg-white/50')}
              />
            )}
          </button>
        )
      })}
    </div>
  )
}

export default Footer
