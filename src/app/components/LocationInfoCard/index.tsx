import React from 'react'
import Background from '../../components/Background'
import WeatherIcon from '../Icon'
import { getConvertedTemperature } from '@/utils/unitConverter'
import { cachedLocation, WeatherData } from '@/types/weatherKit'
import { useRouter } from 'next/navigation'
import 'moment'
import 'moment/min/locales'
import moment from 'moment-timezone'

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

  const { timezone, current, locationId, isGPSLocation, daily } =
    location.queryData

  const currentTimeStamp = moment().valueOf()
  const currenTime = moment.tz(currentTimeStamp, timezone).format('hh:mm a')

  // check its day or not based on if the time is between sunrise and sunset
  const sunsetToday = moment(daily[0].sunset).valueOf()
  const sunriseToday = moment(daily[0].sunrise).valueOf()
  const isItDay =
    sunriseToday && sunsetToday
      ? sunriseToday < currentTimeStamp && sunsetToday > currentTimeStamp
      : false

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
      <Background
        card={true}
        icon={''}
        id={`card-bg-gradient-${locationId}`}
        isItDay={isItDay}
      />
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
