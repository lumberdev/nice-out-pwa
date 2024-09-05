import { GeoLocationData, WeatherData } from '@/types/weatherKit'
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
  location: GeoLocationData | null
}) => {
  const { trackRequestError, trackRequestCompleted } = useAnalytics()
  const formatedLat =
    Number(location?.coords?.latitude?.toFixed(2)) || location?.coords?.latitude

  const formatedLong =
    Number(location?.coords?.longitude?.toFixed(2)) ||
    location?.coords?.longitude

  const getlocationNameInfo = async ({ lat, lon }: GetWeatherDataArgs) => {
    try {
      if (!lat || !lon) {
        throw new Error('Location Not Found')
      }
      const res = await fetch(`/api/locationNameInfo?lat=${lat}&lon=${lon}`)

      if (!res.ok) {
        throw new HttpError(res.statusText, res.status)
      }

      const json = await res.json()
      const formattedId = `weather-${json.name}-${json.state}-${json.country}`
      return {
        name: json.name,
        id: formattedId.replace(/\s/g, ''),
        timeZone: json.timeZone,
      }
    } catch (err) {
      if (err instanceof HttpError) {
        trackRequestError({
          lat: formatedLat,
          lon: formatedLong,
          errorCode: err.status,
          errorMessage: err.message,
        })
        throw err
      } else {
        console.log(err)
        throw new Error('An unknown error occurred')
      }
    }
  }

  const locationInfoQuery = useQuery({
    queryKey: [
      'location',
      {
        lat: formatedLat,
        lon: formatedLong,
      },
    ],
    queryFn: () =>
      getlocationNameInfo({
        lat: formatedLat,
        lon: formatedLong,
      }),
    enabled: location !== null,
    staleTime: 1000 * 60 * 15, // Refresh cache after 15 minutes
    gcTime: Infinity, // dont delete cache ever
  })

  const { data = { name: '', id: '', timeZone: '' } } = locationInfoQuery
  const { name, id, timeZone } = data

  const getWeather = async ({
    lat,
    lon,
  }: GetWeatherDataArgs): Promise<WeatherData> => {
    try {
      if (!id) {
        throw new Error('Location Not Found')
      }
      const res = await fetch(`/api/weather?lat=${lat}&lon=${lon}`)

      if (!res.ok) {
        throw new HttpError(res.statusText, res.status)
      }

      const json = await res.json()
      trackRequestCompleted({ lat, lon })

      return {
        timezone: timeZone,
        current: json.currentWeather,
        hourly: json.forecastHourly.hours,
        daily: json.forecastDaily.days,
        locationName: name,
        locationId: id,
        googleLocationID: location?.googleLocationID || '',
        isGPSLocation: location?.isGPSLocation,
        location: {
          coords: {
            latitude: formatedLat,
            longitude: formatedLong,
          },
        },
      }
    } catch (err) {
      console.log(err)
      if (err instanceof HttpError) {
        trackRequestError({
          lat,
          lon,
          errorCode: err.status,
          errorMessage: err.message,
        })
        throw err
      } else if (err) {
        throw err
      } else {
        throw new Error('An unknown error occurred')
      }
    }
  }

  const query = useQuery({
    queryKey: [
      id,
      {
        lat: formatedLat,
        lon: formatedLong,
      },
    ],
    queryFn: () =>
      getWeather({
        lat: formatedLat,
        lon: formatedLong,
      }),
    enabled: location !== null && !!id,
    staleTime: 1000 * 60 * 15, // Refresh cache after 15 minutes
    gcTime: Infinity, // dont delete cache ever
  })

  return query
}
