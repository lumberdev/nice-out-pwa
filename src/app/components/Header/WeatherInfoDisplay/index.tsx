import React, { useState } from 'react'
import WeatherInfoSummary from './WeatherInfoSummary'
import { useGlobalContext } from '@/lib/GlobalContext'
import 'react-circular-progressbar/dist/styles.css'
import CircularProgressInfoDisplay from './CircularProgressInfoDisplay'

const WeatherInfoDisplay = () => {
  const {
    weatherInfo: { humidity, precipitationChance },
  } = useGlobalContext()
  const [displayIndex, setDisplayIndex] = useState(0)

  const components = [
    <CircularProgressInfoDisplay
      key="precip"
      value={Math.round(precipitationChance * 100)}
      label="Precip"
    />,
    <CircularProgressInfoDisplay
      key="humidity"
      value={Math.round(humidity * 100)}
      label="Humidity"
    />,
    <WeatherInfoSummary key="summary" />,
  ]

  const toggleDisplay = () => {
    setDisplayIndex((prevIndex) => (prevIndex + 1) % components.length)
  }

  return (
    <div
      className="relative top-1 flex min-h-44 min-w-40 max-w-40 animate-[slide-in_0.5s_ease-in-out_forwards] cursor-pointer items-center justify-end transition-transform md:justify-center"
      onClick={toggleDisplay}
    >
      {components[displayIndex]}
    </div>
  )
}

export default WeatherInfoDisplay
