import React from 'react'
import Temperature from './Temperature'
import WeatherInfoDisplay from './WeatherInfoDisplay'
import { useGlobalContext } from '@/lib/GlobalContext'

const Header = () => {
  const { graphData } = useGlobalContext()
  if (!graphData) return null
  return (
    <div className="fixed top-0 z-10 flex w-full items-center justify-between p-4 md:p-6 lg:p-10">
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
