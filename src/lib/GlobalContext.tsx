import { useLocation } from '@/hooks/useLocation'
import { useWeatherData } from '@/hooks/useWeatherData'
import { GraphData, WeatherData } from '@/types'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { generateGraphData } from './generate-graph-data'

interface GlobalContextValue {
  weatherData: WeatherData | undefined
  error: Error | null | unknown
  isLoading: boolean
  graphData: GraphData | undefined
}

const GlobalContext = createContext<GlobalContextValue | undefined>(undefined)

export const useGlobalContext = (): GlobalContextValue => {
  const context = useContext(GlobalContext)
  if (!context) {
    throw new Error(
      'useGlobalContext must be used within a GlobalContextProvider',
    )
  }
  return context
}

// Create a provider component to wrap your app
export const GlobalContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [graphData, setGraphData] = useState<GraphData>()
  const location = useLocation()
  const {
    data: weatherData,
    error,
    isLoading,
    isFetched,
  } = useWeatherData({ location })

  useEffect(() => {
    if (weatherData && isFetched) {
      const graphData = generateGraphData(weatherData)
      setGraphData(graphData)
    }
  }, [weatherData, isFetched])

  return (
    <GlobalContext.Provider
      value={{ weatherData, error, isLoading, graphData }}
    >
      {children}
    </GlobalContext.Provider>
  )
}
