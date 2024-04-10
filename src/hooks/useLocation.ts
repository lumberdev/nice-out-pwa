import { useState, useEffect } from 'react'

export const useLocation = () => {
  const [location, setLocation] = useState<GeolocationPosition | null>(null)
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation(position)
      },
      (err) => console.error('error getting location', err),
    )
  }, [])

  return location
}
