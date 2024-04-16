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
      value={precipitationChance}
      label="Precip"
    />,
    <CircularProgressInfoDisplay
      key="humidity"
      value={humidity}
      label="Humidity"
    />,
    <WeatherInfoSummary key="summary" />,
  ]

  const toggleDisplay = () => {
    setDisplayIndex((prevIndex) => (prevIndex + 1) % components.length)
  }

  return (
    <div
      className="relative top-1 flex min-h-[11rem] min-w-[10rem] cursor-pointer items-center justify-end md:justify-center"
      onClick={toggleDisplay}
    >
      {components[displayIndex]}
    </div>
  )
}

export default WeatherInfoDisplay
