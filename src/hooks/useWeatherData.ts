import { WeatherData } from '@/types/weatherKit'
import { useQuery } from '@tanstack/react-query'
import useAnalytics from '@/hooks/useAnalytics'
import { HttpError } from '@/utils/httpError'

type GetWeatherDataArgs = {
  lat: number | undefined
  lon: number | undefined
}

export const useWeatherData = ({
  location,
}: {
  location: GeolocationPosition | null
}) => {
  const { trackRequestError, trackRequestCompleted } = useAnalytics()
  const getWeather = async ({
    lat,
    lon,
  }: GetWeatherDataArgs): Promise<WeatherData> => {
    try {
      const res = await fetch(`/api/weather?lat=${lat}&lon=${lon}`)

      if (!res.ok) {
        throw new HttpError(res.statusText, res.status)
      }

      const json = await res.json()
      trackRequestCompleted({ lat, lon })

      return {
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        current: json.currentWeather,
        hourly: json.forecastHourly.hours,
        daily: json.forecastDaily.days,
      }
    } catch (err) {
      if (err instanceof HttpError) {
        trackRequestError({
          lat,
          lon,
          errorCode: err.status,
          errorMessage: err.message,
        })
        throw err
      } else {
        throw new Error('An unknown error occurred')
      }
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
