import { useGlobalContext } from '@/lib/GlobalContext'
import React from 'react'
import WeatherIcon from '../Icon'
import clsx from 'clsx'
import { motion } from 'framer-motion'
import { getConvertedTemperature } from '@/utils/unitConverter'
import 'moment'
import 'moment/min/locales'
import moment, { Moment } from 'moment-timezone'

const Footer = () => {
  const { weatherData, currentDay, graphData, containerRef, isUnitMetric } =
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
  const getAverageTemperature = (
    date: string | number | Moment,
    isUnitMetric: boolean,
  ) => {
    // certain edge cases like London - UK will have start of day 11pm GST previous day
    // as it is GMT + 1
    // to match the "Same Day" both values need to be in timezone and not in timestamp
    const footerDate = moment
      .tz(date, weatherData?.timezone ?? '')
      .startOf('day')
    const day = graphData?.derivedSevenDayTemperatures.find((day) => {
      const weatherDayDate = moment.tz(day.date, weatherData?.timezone ?? '')
      return moment(weatherDayDate).isSame(footerDate, 'day')
    })
    if (day) {
      return getConvertedTemperature(day.dailyAverageTemp, isUnitMetric)
    }
    return '-'
  }

  return (
    <div className="animate-fade-in sticky bottom-0 left-0 right-0 flex w-full bg-white/10 text-white">
      {firstSevenDays?.map((day, index) => {
        return (
          <button
            onClick={() => handleClick(index)}
            key={index}
            className={clsx(
              `relative flex w-full translate-y-[100%] animate-[slide-up-footer_0.3s_ease-in-out_forwards] flex-col items-center justify-between gap-1 px-2 py-3 transition-transform`,
            )}
            style={{ animationDelay: `${(index + 1) * 0.15}s` }}
          >
            <span className="text-2xs uppercase opacity-60 md:text-sm">
              {moment
                .tz(day.forecastStart, weatherData?.timezone ?? '')
                .format('ddd')}
            </span>
            <span className="pb-0.5">
              <WeatherIcon
                icon={day.conditionCode}
                x={0}
                y={0}
                height={16}
                width={16}
                viewBox="0 0 24 24"
              />
            </span>
            <span className="relative text-2xs opacity-60 md:text-sm">
              {getAverageTemperature(day.forecastStart, isUnitMetric)}
            </span>
            {moment
              .tz(day.forecastStart, weatherData?.timezone ?? '')
              .isSame(currentDay?.forecastStart, 'day') && (
              <motion.div
                layoutId="selected"
                className="absolute inset-0 bg-white/30"
              />
            )}
          </button>
        )
      })}
    </div>
  )
}

export default Footer
