import React from 'react'
import BsArrowDown from '@/assets/svg/weather/BsArrowDown.svg'
import BsArrowUp from '@/assets/svg/weather/BsArrowUp.svg'
import BsLightRain from '@/assets/svg/weather/BsCloudDrizzle.svg'
import BsFog from '@/assets/svg/weather/BsCloudFog.svg'
import BsCloudHail from '@/assets/svg/weather/BsCloudHail.svg'
import BsCloudLightningRain from '@/assets/svg/weather/BsCloudLightningRain.svg'
import BsCloudMoon from '@/assets/svg/weather/BsCloudMoon.svg'
import BsCloudRainHeavy from '@/assets/svg/weather/BsCloudRainHeavy.svg'
import BsSleet from '@/assets/svg/weather/BsCloudSleet.svg'
import BsCloudSnow from '@/assets/svg/weather/BsCloudSnow.svg'
import BsCloudSun from '@/assets/svg/weather/BsCloudSun.svg'
import BsCloudy from '@/assets/svg/weather/BsCloudy.svg'
import BsMoon from '@/assets/svg/weather/BsMoon.svg'
import BsSun from '@/assets/svg/weather/BsSun.svg'
import BsSunrise from '@/assets/svg/weather/BsSunrise.svg'
import BsSunset from '@/assets/svg/weather/BsSunset.svg'
import IoAddCircleOutline from '@/assets/svg/ui/IoAddCircleOutline.svg'
import BiPlus from '@/assets/svg/ui/BiPlus.svg'
import BiX from '@/assets/svg/ui/BiX.svg'
import Location from '@/assets/svg/ui/location-arrow.svg'
import Delete from '@/assets/svg/ui/MdOutlineRemoveCircle.svg'
import Settings from '@/assets/svg/ui/IoSettingsSharp.svg'
const WeatherIcon = ({
  icon,
  x,
  y,
  width,
  height,
  viewBox
}: {
  icon: number | string
  x: number
  y: number
  width: number | string
  height: number | string
  viewBox?: string
}) => {
  switch (icon) {
    case 2:
      return <BsSun width={width} height={height} x={x} y={y} /> // 2 - Sunny
    case 3:
      return <BsSun width={width} height={height} x={x} y={y} /> // 3 - Mostly sunny
    case 4:
      return <BsCloudSun width={width} height={height} x={x} y={y} /> // 4 - Partly sunny
    case 5:
      return <BsCloudy width={width} height={height} x={x} y={y} /> // 5 - Mostly cloudy
    case 6:
      return <BsCloudy width={width} height={height} x={x} y={y} /> // 6 - Cloudy
    case 7:
      return <BsCloudy width={width} height={height} x={x} y={y} /> // 7 - Overcast
    case 8:
      return <BsCloudy width={width} height={height} x={x} y={y} /> // 8 - Overcast with low clouds
    case 9:
      return <BsFog width={width} height={height} x={x} y={y} /> // 9 - Fog - BsCloudFog
    case 10:
      return <BsLightRain width={width} height={height} x={x} y={y} /> // 10 - Light rain
    case 11:
      return <BsCloudRainHeavy width={width} height={height} x={x} y={y} /> // 11 - Rain - BsCloudRainHeavy
    case 12:
      return <BsLightRain width={width} height={height} x={x} y={y} /> // 12 - Possible rain
    case 13:
      return <BsLightRain width={width} height={height} x={x} y={y} /> // 13 - Rain shower
    case 14:
      return <BsCloudLightningRain width={width} height={height} x={x} y={y} /> // 14 - Thunderstorm - BsCloudLightningRain
    case 15:
      return <BsCloudLightningRain width={width} height={height} x={x} y={y} /> // 15 - Local thunderstorms - BsCloudLightningRain
    case 16:
      return <BsCloudSnow width={width} height={height} x={x} y={y} /> // 16 - Light snow - BsCloudSnow
    case 17:
      return <BsCloudSnow width={width} height={height} x={x} y={y} /> // 17 - Snow - BsCloudSnow
    case 18:
      return <BsCloudSnow width={width} height={height} x={x} y={y} /> // 18 - Possible snow - BsCloudSnow ?
    case 19:
      return <BsCloudSnow width={width} height={height} x={x} y={y} /> // 19 - Snow shower - BsCloudSnow ?
    case 20:
      return <BsSleet width={width} height={height} x={x} y={y} /> // 20 - Rain and snow
    case 21:
      return <BsSleet width={width} height={height} x={x} y={y} /> // 21 - Possible rain and snow
    case 22:
      return <BsSleet width={width} height={height} x={x} y={y} /> // 22 - Rain and snow
    case 23:
      return <BsSleet width={width} height={height} x={x} y={y} /> // 23 - Freezing rain
    case 24:
      return <BsSleet width={width} height={height} x={x} y={y} /> // 24 - Possible freezing rain
    case 25:
      return <BsCloudHail width={width} height={height} x={x} y={y} /> // Hail - BsCloudHail
    case 26:
      return <BsMoon width={width} height={height} x={x} y={y} /> // 26 - Clear (night) - BsMoon
    case 27:
      return <BsCloudMoon width={width} height={height} x={x} y={y} /> // 27 - Mostly clear (night)
    case 28:
      return <BsCloudMoon width={width} height={height} x={x} y={y} /> // 28 - Partly clear (night)
    case 29:
      return <BsMoon width={width} height={height} x={x} y={y} /> // 29 - Mostly cloudy (night)
    case 30:
      return <BsCloudy width={width} height={height} x={x} y={y} /> // 30 - Cloudy (night) - BsCloudy
    case 31:
      return <BsCloudy width={width} height={height} x={x} y={y} /> // 31 - Overcast with low clouds (night) -
    case 32:
      return <BsLightRain width={width} height={height} x={x} y={y} /> // 32 - Rain shower (night)
    case 33:
      return <BsCloudLightningRain width={width} height={height} x={x} y={y} /> // 33 - Local thunderstorms (night)
    case 34:
      return <BsSleet width={width} height={height} x={x} y={y} /> // 34 - Snow shower (night)
    case 35:
      return <BsSleet width={width} height={height} x={x} y={y} /> // 35 - Rain and snow (night)
    case 36:
      return <BsSleet width={width} height={height} x={x} y={y} /> // 36 - Possible freezing rain (night)
    case 'location':
      return <Location width={width} height={height} x={x} y={y} />
    case 'delete':
      return <Delete width={width} height={height} x={x} y={y} />
    case 'settings':
      return <Settings width={width} height={height} x={x} y={y} />
    case 'add':
      return <IoAddCircleOutline width={width} height={height} x={x} y={y} />
    case 'plus':
      return <BiPlus width={width} height={height} x={x} y={y} />
    case 'close':
      return <BiX width={width} height={height} x={x} y={y} />
    case 'max':
      return <BsArrowUp width={width} height={height} x={x} y={y} viewBox={viewBox}/>
    case 'min':
      return <BsArrowDown width={width} height={height} x={x} y={y} viewBox={viewBox}/>
    case 'sunset':
      return <BsSunset width={width} height={height} x={x} y={y} />
    case 'sunrise':
      return <BsSunrise width={width} height={height} x={x} y={y} />
    default:
      return null
  }
}

export default WeatherIcon
