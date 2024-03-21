import { QueryFunctionContext, QueryKey, useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'

type GetWeatherDataArgs = {
  lat: number | undefined
  lon: number | undefined
}

export const useWeatherData = ({
  location,
}: {
  location: GeolocationPosition | null
}) => {
  const getWeather = async ({ lat, lon }: GetWeatherDataArgs) => {
    try {
      const res = await fetch(`/api/weather?lat=${lat}&lon=${lon}`)
      if (!res.ok) throw new Error('An error occurred')
      return res.json()
    } catch (err) {
      if (err instanceof Error) throw new Error(err.message)
      else throw new Error('An unknown error occurred')
    }
  }

  const query = useQuery({
    queryKey: [
      'weather',
      { lat: location?.coords.latitude, lon: location?.coords.longitude },
    ],
    queryFn: () =>
      getWeather({
        lat: location?.coords.latitude,
        lon: location?.coords.longitude,
      }),
    enabled: location !== null,
  })
  return query
}
