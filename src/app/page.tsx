'use client'

import { useLocation } from '@/hooks/useLocation'
import { useWeatherData } from '@/hooks/useWeatherData'
import { useEffect } from 'react'
import Graph from './components/Graph'

export default function Home() {
  const location = useLocation()

  const { data: weatherData, isLoading } = useWeatherData({ location })

  useEffect(() => {
    if (!isLoading && weatherData) {
      console.log(weatherData)
    }
  }, [isLoading, weatherData])

  if (isLoading) return <div>Loading...</div>
  if (!weatherData) return <div>Something went wrong</div>

  return (
    <main className=''>
      <Graph weatherData={weatherData} />
    </main>
  )
}
