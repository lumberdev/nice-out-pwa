import React, { useState } from 'react'
import Background from '../../components/Background'
import WeatherIcon from '../Icon'
import { getConvertedTemperature } from '@/utils/unitConverter'
import { cachedLocation } from '@/types/weatherKit'
import { useRouter } from 'next/navigation'
import 'moment'
import 'moment/min/locales'
import moment from 'moment-timezone'
import { QueryKey } from '@tanstack/react-query'

interface Props {
  location: cachedLocation
  isUnitMetric: boolean
  setActiveLocationId: React.Dispatch<
    React.SetStateAction<string | null | undefined>
  >
  isEditing: boolean
  handleRemoval: (
    queryKey: QueryKey,
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => void
  i: number
}

export const LocationInfoCard = ({
  location,
  isUnitMetric,
  setActiveLocationId,
  isEditing,
  handleRemoval,
  i,
}: Props) => {
  const router = useRouter()
  const [remove, setRemove] = useState<string | object>('')

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

  const handleLocationSelection = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    e.stopPropagation()
    e.preventDefault()
    setActiveLocationId(locationId)
    router.push('/')
  }
  return (
    <div
      className={`translate-tranform translate-y-[100vh] ${remove === location.queryKey[0] ? 'animate-[slide-out_0.25s_ease-in-out_forwards]' : 'animate-[slide-up_0.5s_ease-in-out_forwards]'} overflow-hidden`}
      style={{ animationDelay: `${(i + 1) * 0.05}s` }}
    >
      <div
        className="relative h-[20vh] max-h-[150px] cursor-pointer overflow-hidden"
        onClick={(e) => handleLocationSelection(e)}
      >
        <Background
          card={true}
          icon={''}
          id={`card-bg-gradient-${locationId}`}
          isItDay={isItDay}
        />
        <div className="absolute top-0 h-full w-full px-4 py-6">
          <div className="relative flex flex h-full w-full items-center justify-between">
            {isEditing && !isGPSLocation ? (
              <div className="translate-tranform absolute mr-[1rem] flex max-w-[20vw] animate-[slide-in-left_0.3s_ease-in-out_forwards]">
                <div
                  onClick={(e) => {
                    setRemove(location.queryKey?.[0] ?? '')
                    handleRemoval(location.queryKey, e)
                  }}
                >
                  <WeatherIcon
                    icon={'delete'}
                    x={0}
                    y={0}
                    width={30}
                    height={30}
                    viewBox="0 0 30 30"
                  />
                </div>
              </div>
            ) : null}
            <div
              className={`flex h-full transition-all ${isEditing && !isGPSLocation ? 'max-w-[60vw] translate-x-[15%]' : 'max-w-[80vw] translate-x-[0%]'} w-full  flex-col justify-between duration-300`}
            >
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
              <div
                className={`${isEditing && !isGPSLocation ? 'max-w-[60vw]' : 'max-w-[80vw]'} truncate text-[32px] font-thin`}
              >
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
            <div className="flex h-full min-w-[20vw] max-w-[20vw] items-center text-[45px] font-thin">
              <span className="w-full text-center">
                <span>
                  {Math.trunc(currentTemp)}
                  <span className="h-full align-top text-[25px] leading-[45px]">
                    °
                  </span>
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
