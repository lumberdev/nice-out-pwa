import React from 'react'
import { useGlobalContext } from '@/lib/GlobalContext'

const WeatherInfoSummary = () => {
  const { weatherInfo } = useGlobalContext()
  const {
    wind,
    precipitation,
    humidity,
    feelsLike,
    cloudCover,
    pressure,
    dew,
    uvIndex,
  } = weatherInfo
  const weatherInfos = [
    {
      title: 'Wind',
      value: wind,
      unit: 'km/h',
      // unit: 'mph',
    },
    {
      title: 'Precipitation',
      value: precipitation,
      unit: 'mm',
    },
    {
      title: 'Humidity',
      value: humidity,
      unit: '%',
    },
    {
      title: 'Feels Like',
      value: feelsLike,
      unit: '°',
    },
    {
      title: 'Cloud Cover',
      value: cloudCover,
      unit: '%',
    },
    {
      title: 'Pressure',
      value: pressure,
      unit: 'mb',
      // unit: 'hg',
    },
    {
      title: 'Dew Point',
      value: dew,
      unit: '°',
    },
    {
      title: 'UV Index',
      value: uvIndex,
      unit: '',
    },
  ]
  return (
    <div className="relative left-1 md:left-3">
      {weatherInfos.map((info, index) => {
        return (
          <div key={index} className="flex items-center gap-1">
            <div className="text-3xs font-extralight tracking-wide text-white md:text-sm md:font-light">
              {info.title}:{' '}
            </div>
            <div className="flex gap-0.5 text-3xs font-medium tracking-wide text-white md:text-sm">
              <span>{info.value}</span>
              <span className="text-3xs md:text-sm">{info.unit}</span>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default WeatherInfoSummary
