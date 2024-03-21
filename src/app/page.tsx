'use client'

import { useLocation } from '@/hooks/useLocation'
import { useWeatherData } from '@/hooks/useWeatherData'
import { use, useEffect } from 'react'

export default function Home() {
  const location = useLocation()

  const { data: weatherData, isLoading } = useWeatherData({ location })
  useEffect(() => {
    if (!isLoading && weatherData) {
      console.log(weatherData)
    }
  }, [isLoading])
  return (
    <main className=''>
      <h1>Nice out</h1>
    </main>
  )
}
