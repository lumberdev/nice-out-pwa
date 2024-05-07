import React from 'react'
import { useGlobalContext } from '@/lib/GlobalContext'

const WeatherInfoSummary = () => {
  const { weatherInfo, isUnitMetric } = useGlobalContext()
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
      metricUnit: 'km/h',
      imperialUnit: 'mph',
    },
    {
      title: 'Precipitation',
      value: precipitation,
      metricUnit: 'mm',
      imperialUnit: 'in',
    },
    {
      title: 'Humidity',
      value: humidity,
      metricUnit: '%',
      imperialUnit: '%',
    },
    {
      title: 'Feels Like',
      value: feelsLike,
      metricUnit: '°',
      imperialUnit: '°',
    },
    {
      title: 'Cloud Cover',
      value: cloudCover,
      metricUnit: '%',
      imperialUnit: '%',
    },
    {
      title: 'Pressure',
      value: pressure,
      metricUnit: 'mb',
      imperialUnit: 'hg',
    },
    {
      title: 'Dew Point',
      value: dew,
      metricUnit: '°',
      imperialUnit: '°',
    },
    {
      title: 'UV Index',
      value: uvIndex,
      metricUnit: '',
      imperialUnit: '',
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
              <span className="text-3xs md:text-sm">
                {isUnitMetric ? info.metricUnit : info.imperialUnit}
              </span>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default WeatherInfoSummary
