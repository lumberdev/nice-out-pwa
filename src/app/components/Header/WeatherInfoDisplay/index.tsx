import React, { useState } from 'react'
import WeatherInfoSummary from './WeatherInfoSummary'
import { useGlobalContext } from '@/lib/GlobalContext'
import 'react-circular-progressbar/dist/styles.css'
import CircularProgressInfoDisplay from './CircularProgressInfoDisplay'

const INFO_TYPE_KEY = 'weatherInfoDisplayType'

const DISPLAY_TYPES = {
  PRECIP: 'precip',
  HUMIDITY: 'humidity',
  SUMMARY: 'summary'
} as const

type DisplayType = (typeof DISPLAY_TYPES)[keyof typeof DISPLAY_TYPES]

const WeatherInfoDisplay = () => {
  const {
    weatherInfo: { humidity, precipitationChance },
  } = useGlobalContext()
  
  const [displayType, setDisplayType] = useState<DisplayType>(() => {
    if (typeof window === 'undefined') return DISPLAY_TYPES.PRECIP
    const savedType = localStorage.getItem(INFO_TYPE_KEY) as DisplayType | null
    return savedType && Object.values(DISPLAY_TYPES).includes(savedType) 
      ? savedType 
      : DISPLAY_TYPES.PRECIP
  })

  const displayComponents = {
    [DISPLAY_TYPES.PRECIP]: (
      <CircularProgressInfoDisplay
        value={Math.round(precipitationChance * 100)}
        label="Precip"
      />
    ),
    [DISPLAY_TYPES.HUMIDITY]: (
      <CircularProgressInfoDisplay
        value={Math.round(humidity * 100)}
        label="Humidity"
      />
    ),
    [DISPLAY_TYPES.SUMMARY]: <WeatherInfoSummary />
  }

  const toggleDisplay = () => {
    setDisplayType((currentType) => {
      const types = Object.values(DISPLAY_TYPES)
      const currentIndex = types.indexOf(currentType)
      const nextType = types[(currentIndex + 1) % types.length]
      localStorage.setItem(INFO_TYPE_KEY, nextType)
      return nextType
    })
  }

  return (
    <div
      className="relative top-1 flex min-h-44 min-w-40 max-w-40 animate-[slide-in_0.5s_ease-in-out_forwards] cursor-pointer items-center justify-end transition-transform md:justify-center"
      onClick={toggleDisplay}
    >
      {displayComponents[displayType]}
    </div>
  )
}

export default WeatherInfoDisplay
