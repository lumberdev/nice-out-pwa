import React from 'react'
import Background from '../../components/Background'
import { formatInTimeZone } from 'date-fns-tz'
import { getTime } from 'date-fns'
import WeatherIcon from '../Icon'
import { getConvertedTemperature } from '@/utils/unitConverter'
import { cachedLocation, WeatherData } from '@/types/weatherKit'
import { redirect } from 'next/dist/server/api-utils'
import { useRouter } from 'next/navigation'

interface Props {
  location: cachedLocation
  isUnitMetric: boolean
  setActiveLocationId: React.Dispatch<
    React.SetStateAction<string | null | undefined>
  >
}

export const LocationInfoCard = ({
  location,
  isUnitMetric,
  setActiveLocationId,
}: Props) => {
  const router = useRouter()

  const { timezone, current, locationId, isGPSLocation } = location.queryData

  const currenTime = formatInTimeZone(getTime(new Date()), timezone, 'hh:mm a')
  const currentTemp =
    getConvertedTemperature(current?.temperature, isUnitMetric) ?? 0

  if (!currenTime) return

  const handleLocationSelection = () => {
    setActiveLocationId(locationId)
    router.push('/')
  }
  return (
    <div
      className="relative h-[20vh] max-h-[150px] cursor-pointer"
      onClick={handleLocationSelection}
    >
      <Background card={true} icon={''} id="card-bg-gradient" isItDay={false} />
      <div className="absolute top-0 h-full w-full px-4 py-6">
        <div className="flex flex h-full items-center justify-between">
          <div className="flex h-full flex-col justify-between">
            <div className="flex items-center">
              <div className="mr-2 font-bold">{currenTime}</div>
              {isGPSLocation && (
                <WeatherIcon
                  icon={'location'}
                  x={0}
                  y={0}
                  width={20}
                  height={20}
                  viewBox="0 0 30 30"
                />
              )}
            </div>
            <div className="mr-[1rem] max-w-[80vw]  truncate text-[32px] font-thin">
              {location.queryData.locationName}
            </div>
            <div className="flex items-center text-[18px]">
              <WeatherIcon
                icon={current.conditionCode}
                x={0}
                y={0}
                width={20}
                height={20}
                viewBox="0 0 30 30"
              />
              <span className="ml-1 text-[#dfdfdf]">
                {current.conditionCode}
              </span>
            </div>
          </div>
          <div className="flex h-full min-w-[2ch] max-w-[3ch] items-center text-[45px] font-thin">
            <span>
              {Math.trunc(currentTemp)}
              <span className="h-full align-top text-[25px] leading-[45px]">
                °
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
