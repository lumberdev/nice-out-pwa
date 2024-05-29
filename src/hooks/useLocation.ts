import { useState, useEffect } from 'react'
import useAnalytics from './useAnalytics'

export const useLocation = () => {
  const { trackMissingLocation } = useAnalytics()
  const [location, setLocation] = useState<GeolocationPosition | null>(null)

  useEffect(() => {
    if (!location) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation(position)
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
