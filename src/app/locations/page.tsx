'use client'
import Background from '../components/Background'
import { useGlobalContext } from '@/lib/GlobalContext'
import WeatherIcon from '../components/Icon'
import { LocationInfoCard } from '../components/LocationInfoCard'
import Link from 'next/link'
import { cachedLocation } from '@/types/weatherKit'
import { useCachedLocations } from '@/hooks/useGetCachedLocations'

const Locations = () => {
  const {
    isUnitMetric,
    activeLocationId,
    setActiveLocationId,
    initialGradient,
  } = useGlobalContext()
  const cachedLocations = useCachedLocations({ activeLocationId })

  return (
    <main className="flex h-svh flex-col overflow-hidden text-white">
      <div className="mb-[1rem] flex translate-x-full animate-[slide-in_0.25s_ease-in-out_forwards]  justify-between p-6 transition-transform md:p-6 lg:p-10">
        <Link
          href="/search"
          className="relative flex h-[60px] w-[60px] items-center justify-center rounded-full bg-[#00000026]"
        >
          <WeatherIcon
            icon={'plus'}
            x={0}
            y={0}
            width={30}
            height={30}
            viewBox="6 6 20 20"
          />
          <span className="absolute -bottom-7 text-white">Location</span>
        </Link>
        <Link
          href="/"
          className=" flex h-[60px] w-[60px] items-center justify-center pb-1 pr-1"
        >
          <WeatherIcon
            icon={'close'}
            x={0}
            y={0}
            width={30}
            height={30}
            viewBox="6 6 20 20"
          />
        </Link>
      </div>
      <div className="h-full min-h-[80vh] overflow-y-auto">
        {/* sorting this array to always show the GPS location at the top */}
        {cachedLocations
          ?.sort(
            (a, b) =>
              Number(b.queryData.isGPSLocation) -
              Number(a.queryData.isGPSLocation),
          )
          ?.map((location: cachedLocation, i: number) => (
            <div
              key={location.queryKey[0]}
              className="translate-tranform translate-y-[100vh] animate-[slide-up_0.5s_ease-in-out_forwards] overflow-hidden"
              style={{ animationDelay: `${(i + 1) * 0.05}s` }}
            >
              <LocationInfoCard
                location={location}
                isUnitMetric={isUnitMetric}
                setActiveLocationId={setActiveLocationId}
              />
            </div>
          ))}
      </div>
      <Background
        icon={''}
        id="locations-chart-bg-gradient"
        isItDay
        colors={initialGradient}
      />
    </main>
  )
}

export default Locations
