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
      unit: 'mph',
    },
    {
      title: 'Precipitation',
      value: precipitation,
      unit: 'in',
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
      unit: 'hg',
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
    <div className="relative left-3">
      {weatherInfos.map((info, index) => {
        return (
          <div key={index} className="flex items-center gap-2">
            <div className="text-sm text-white">{info.title}: </div>
            <div className="text-sm font-medium text-white">
              {info.value}
              <span className="text-sm">{info.unit}</span>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default WeatherInfoSummary
