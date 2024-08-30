import { useState, useEffect } from 'react'
import useAnalytics from './useAnalytics'
import { GeoLocationData } from '@/types/weatherKit'

export const useLocation = () => {
  const { trackMissingLocation } = useAnalytics()
  const [location, setLocation] = useState<GeoLocationData | null>(null)

  useEffect(() => {
    if (!location) {
      navigator.geolocation.getCurrentPosition(
        ({ coords, timestamp }) => {
          if (coords) {
            const gpsLocation = { coords, timestamp, isGPSLocation: true }
            setLocation(gpsLocation)
          }
        },
        (err) => {
          console.error('Error getting location', err)
          trackMissingLocation({
            errorCode: err.code,
            errorMessage: err.message,
          })
        },
      )
    }
  }, [location, trackMissingLocation])

  return location
}
