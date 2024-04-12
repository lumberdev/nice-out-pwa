import { useGlobalContext } from '@/lib/GlobalContext'
import React from 'react'
import WeatherIcon from '../Icon'
import { isSameDay } from 'date-fns'
import { format } from 'date-fns/format'
import clsx from 'clsx'
import { motion } from 'framer-motion'

const Footer = () => {
  const { weatherData, currentDay } = useGlobalContext()
  const firstSevenDays = weatherData?.daily.slice(1, 8)

  return (
    <div className="flex w-full bg-white/10 text-white">
      {firstSevenDays?.map((day, index) => (
        <div
          key={index}
          className={clsx(
            'relative flex w-full flex-col items-center justify-between gap-1 px-2 py-3',
          )}
        >
          <span className="text-sm font-light uppercase">
            {format(day.day, 'E')}
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
        </div>
      ))}
    </div>
  )
}

export default Footer