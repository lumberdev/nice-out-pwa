'use client'
import Background from '../components/Background'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { fetchSearchLocations } from '@/utils/fetchSearchLocations'
import { cachedLocation } from '@/types/weatherKit'
import { fetchLocationCoordinates } from '@/utils/fetchSearchLocations'
import { useWeatherData } from '@/hooks/useWeatherData'
import { useRouter } from 'next/navigation'
import { useCachedLocations } from '@/hooks/useGetCachedLocations'
import { useGlobalContext } from '@/lib/GlobalContext'

const Search = () => {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState([{ description: '' }])
  const [newLocation, setnewLocation] = useState<any>(null)
  const { activeLocationId } = useGlobalContext()

  const cachedLocations = useCachedLocations({ activeLocationId })

  useEffect(() => {
    if (searchTerm?.split('').length === 0) {
      setSearchResults([{ description: '' }])
    } else if (searchTerm?.split('').length > 2) {
      ;(async () => {
        const result = await fetchSearchLocations(searchTerm)
        setSearchResults(result)
      })()
    }
  }, [searchTerm])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const handleSelection = async (r: {
    description?: string
    place_id?: any
  }) => {
    const isItSaved = cachedLocations?.find(
      (location: cachedLocation) =>
        location?.queryData?.googleLocationID === r.place_id,
    )

    if (!isItSaved) {
      const details = await fetchLocationCoordinates(r.place_id)
      setnewLocation(details)
    } else {
      router.push('/locations')
    }
  }

  const { data, isLoading } = useWeatherData({
    location: newLocation,
  })

  useEffect(() => {
    if (!isLoading && newLocation && data) {
      router.push('/locations')
    }
  }, [newLocation, router, isLoading, data])

  return (
    <div className="flex h-svh flex-col pt-8 text-[#efefef]">
      <div className="mb-[1rem] flex justify-between bg-[#00000099] p-6 md:p-6 lg:p-10">
        <input
          type="text"
          className="w-full bg-transparent px-4 py-2 focus:outline-none"
          placeholder="Type a city or zip"
          value={searchTerm}
          onChange={handleChange}
        />
        <Link href="/locations" className="relative flex items-center">
          <span className=" text-white">Cancel</span>
        </Link>
      </div>
      <div className="flex flex-col">
        {searchResults?.map((r) => (
          <div
            className="border-bottom-2 px-6 py-2 md:px-6"
            key={r?.description}
            onClick={() => handleSelection(r)}
          >
            {r?.description}
          </div>
        ))}
      </div>
      <Background icon={''} id="chart-bg-gradient" isItDay />
    </div>
  )
}

export default Search
