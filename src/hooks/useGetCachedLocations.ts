import { cachedLocation } from '@/types/weatherKit'
import { useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

export const useCachedLocations = ({
  activeLocationId,
}: {
  activeLocationId: string | null | undefined
}) => {
  const queryClient = useQueryClient()
  const [result, setResult] = useState<cachedLocation[] | null>(null)

  useEffect(() => {
    const r = queryClient
      .getQueryCache()
      .getAll()
      .filter(
        (query: any) =>
          !!query?.state?.data && query?.queryKey[0].includes('weather-'),
      )
      .map((query: any) => {
        return {
          queryKey: query.queryKey,
          queryData: query.state.data,
          queryStatus: query.state.status,
        }
      })
    setResult(r)
  }, [queryClient, activeLocationId])

  return result
}
