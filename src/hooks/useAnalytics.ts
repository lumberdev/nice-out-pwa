import { EVENT_NAMES } from '@/analytics/events'
import { useEffect, useState } from 'react'

const useAnalytics = () => {
  const [analytics, setAnalytics] = useState<{
    track: (...args: any[]) => unknown
    identify: (...args: any[]) => unknown
  }>()
  useEffect(() => {
    // @ts-ignore
    if (!window.analytics) {
      console.debug('ANALYTICS NOT FOUND')
    }
    console.debug('ANALYTICS FOUND')
    const timer = setTimeout(() => {
      // @ts-ignore
      if (!analytics) setAnalytics(window.analytics)
    }, 1000)
    return () => clearTimeout(timer)
  }, [analytics])

  function track(event: string, properties: object) {
    if (typeof analytics !== 'object') return
    analytics?.track(event, properties)
  }

  function identify(userId: string, traits: object) {
    if (typeof analytics !== 'object') return
    analytics.identify(userId, traits)
  }

  function trackMissingLocation(properties: {
    errorCode: number
    errorMessage: string
  }) {
    track(EVENT_NAMES.MISSING_LOCATION, properties)
  }
  function trackRequestCompleted(properties: { lat?: number; lon?: number }) {
    track(EVENT_NAMES.REQUEST_COMPLETED, properties)
  }
  function trackRequestError(properties: {
    lat?: number
    lon?: number
    errorCode: number
    errorMessage: string
  }) {
    track(EVENT_NAMES.REQUEST_ERROR, properties)
  }

  return {
    trackMissingLocation,
    trackRequestCompleted,
    trackRequestError,
    track,
    identify,
  }
}

export default useAnalytics
