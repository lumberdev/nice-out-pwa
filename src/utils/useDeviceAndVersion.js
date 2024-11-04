import { useState, useEffect } from 'react'

const useDeviceAndVersion = () => {
  const [platform, setPlatform] = useState(void 0)
  const [version, setVersion] = useState(void 0)
  const [isStandalone, setIsStandalone] = useState(void 0)
  const [isValidOS, setIsValidOS] = useState(void 0)
  const [userAgent, setUserAgent] = useState(void 0)
  return (
    useEffect(() => {
      if (typeof window !== 'undefined') {
        const userAgent = window?.navigator?.userAgent?.toLowerCase()
        const appleDeviceRegex = new RegExp('(iphone|ipad|ipod|macintosh)', 'g')
        const osVersionRegex = new RegExp('os (\\d+)', 'g')

        // Determine Apple device type from user agent
        const appleDeviceMatch = appleDeviceRegex.exec(userAgent)
        const appleDeviceType = appleDeviceMatch
          ? appleDeviceMatch[1]
          : undefined

        const isTouchMac =
          appleDeviceType === 'macintosh' && window.navigator.maxTouchPoints > 1

        // Extract OS version from user agent
        const osVersionMatch = osVersionRegex.exec(userAgent)
        const osVersion = osVersionMatch ? osVersionMatch[1] : undefined

        // Check if app is in standalone mode (PWA)
        const isStandaloneMode =
          'standalone' in window.navigator && !!window.navigator.standalone

        // Set the state values based on computed variables
        setIsStandalone(isStandaloneMode)
        setIsValidOS(
          isTouchMac || !!(appleDeviceType && appleDeviceType !== 'macintosh'),
        )
        setPlatform(isTouchMac ? 'ipad' : appleDeviceType ?? null)
        setVersion(appleDeviceType || isTouchMac ? osVersion ?? null : null)
        setUserAgent(userAgent)
      }
    }, []),
    {
      platform,
      version,
      isStandalone,
      isValidOS,
      userAgent,
    }
  )
}

export { useDeviceAndVersion }
