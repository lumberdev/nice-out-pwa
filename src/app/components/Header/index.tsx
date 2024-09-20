import React from 'react'
import Temperature from './Temperature'
import WeatherInfoDisplay from './WeatherInfoDisplay'
import { useGlobalContext } from '@/lib/GlobalContext'
import WeatherIcon from '../Icon'
import Link from 'next/link'
import 'moment'
import 'moment/min/locales'
import moment from 'moment-timezone'

const Header = () => {
  const { currentDay, graphData, weatherData } = useGlobalContext()

  const currentDate = currentDay?.sunset
    ? moment
        .tz(currentDay.sunset, weatherData?.timezone ?? '')
        .format('MMMM DD')
    : ''
  if (!graphData) return null

  return (
    <div className="animate-fade-in fixed top-0 z-10 flex w-full flex-wrap items-center justify-between p-4 md:p-6 lg:p-10">
      <div className="relative mb-[2rem] flex w-full items-center justify-start">
        <Link href="/locations" className="absolute">
          <WeatherIcon
            icon={'add'}
            x={0}
            y={0}
            width={50}
            height={50}
            viewBox="0 0 30 30"
          />
        </Link>
        <div className="flex w-full flex-1 flex-col items-center">
          <div className="md:text-md text-sm font-medium text-white">
            {currentDate}
          </div>
          <div className="text-xl font-medium text-white md:text-3xl">
            {weatherData?.locationName}
          </div>
        </div>
      </div>
      {graphData?.SCREEN_HEIGHT &&
        document?.body?.clientHeight &&
        graphData?.GRAPH_HEIGHT && (
          <div className="text-md font-medium text-white md:text-3xl">
            {'SH --> '}
            {graphData?.SCREEN_HEIGHT} {'||'}
            {' client height --> '}
            {document?.body?.clientHeight} {'||'}
            {' GH --> '}
            {graphData?.GRAPH_HEIGHT}
          </div>
        )}
      <div className="flex flex-1 items-center justify-start">
        <Temperature />
      </div>
      <div className="flex flex-1 items-center justify-end">
        <WeatherInfoDisplay />
      </div>
    </div>
  )
}

export default Header
