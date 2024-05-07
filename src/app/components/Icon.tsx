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
import BsWind from '@/assets/svg/weather/BsWind.svg'
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
  icon: number | string | undefined
  x: number
  y: number
  width: number | string
  height: number | string
  viewBox?: string
}) => {
  switch (icon) {
    case 2:
      return <BsSun width={width} height={height} x={x} y={y} viewBox={viewBox} /> // 2 - Sunny
    case 3:
      return <BsSun width={width} height={height} x={x} y={y} viewBox={viewBox} /> // 3 - Mostly sunny
    case 4:
      return <BsCloudSun width={width} height={height} x={x} y={y} viewBox={viewBox} /> // 4 - Partly sunny
    case 5:
      return <BsCloudy width={width} height={height} x={x} y={y} viewBox={viewBox} /> // 5 - Mostly cloudy
    case 6:
      return <BsCloudy width={width} height={height} x={x} y={y} viewBox={viewBox} /> // 6 - Cloudy
    case 7:
      return <BsCloudy width={width} height={height} x={x} y={y} viewBox={viewBox} /> // 7 - Overcast
    case 8:
      return <BsCloudy width={width} height={height} x={x} y={y} viewBox={viewBox} /> // 8 - Overcast with low clouds
    case 9:
      return <BsFog width={width} height={height} x={x} y={y} viewBox={viewBox} /> // 9 - Fog - BsCloudFog
    case 10:
      return <BsLightRain width={width} height={height} x={x} y={y} viewBox={viewBox} /> // 10 - Light rain
    case 11:
      return <BsCloudRainHeavy width={width} height={height} x={x} y={y} viewBox={viewBox} /> // 11 - Rain - BsCloudRainHeavy
    case 12:
      return <BsLightRain width={width} height={height} x={x} y={y} viewBox={viewBox} /> // 12 - Possible rain
    case 13:
      return <BsLightRain width={width} height={height} x={x} y={y} viewBox={viewBox} /> // 13 - Rain shower
    case 14:
      return <BsCloudLightningRain width={width} height={height} x={x} y={y} viewBox={viewBox} /> // 14 - Thunderstorm - BsCloudLightningRain
    case 15:
      return <BsCloudLightningRain width={width} height={height} x={x} y={y} viewBox={viewBox} /> // 15 - Local thunderstorms - BsCloudLightningRain
    case 16:
      return <BsCloudSnow width={width} height={height} x={x} y={y} viewBox={viewBox} /> // 16 - Light snow - BsCloudSnow
    case 17:
      return <BsCloudSnow width={width} height={height} x={x} y={y} viewBox={viewBox} /> // 17 - Snow - BsCloudSnow
    case 18:
      return <BsCloudSnow width={width} height={height} x={x} y={y} viewBox={viewBox} /> // 18 - Possible snow - BsCloudSnow ?
    case 19:
      return <BsCloudSnow width={width} height={height} x={x} y={y} viewBox={viewBox} /> // 19 - Snow shower - BsCloudSnow ?
    case 20:
      return <BsSleet width={width} height={height} x={x} y={y} viewBox={viewBox} /> // 20 - Rain and snow
    case 21:
      return <BsSleet width={width} height={height} x={x} y={y} viewBox={viewBox} /> // 21 - Possible rain and snow
    case 22:
      return <BsSleet width={width} height={height} x={x} y={y} viewBox={viewBox} /> // 22 - Rain and snow
    case 23:
      return <BsSleet width={width} height={height} x={x} y={y} viewBox={viewBox} /> // 23 - Freezing rain
    case 24:
      return <BsSleet width={width} height={height} x={x} y={y} viewBox={viewBox} /> // 24 - Possible freezing rain
    case 25:
      return <BsCloudHail width={width} height={height} x={x} y={y} viewBox={viewBox} /> // Hail - BsCloudHail
    case 26:
      return <BsMoon width={width} height={height} x={x} y={y} viewBox={viewBox} /> // 26 - Clear (night) - BsMoon
    case 27:
      return <BsCloudMoon width={width} height={height} x={x} y={y} viewBox={viewBox} /> // 27 - Mostly clear (night)
    case 28:
      return <BsCloudMoon width={width} height={height} x={x} y={y} viewBox={viewBox} /> // 28 - Partly clear (night)
    case 29:
      return <BsMoon width={width} height={height} x={x} y={y} viewBox={viewBox} /> // 29 - Mostly cloudy (night)
    case 30:
      return <BsCloudy width={width} height={height} x={x} y={y} viewBox={viewBox} /> // 30 - Cloudy (night) - BsCloudy
    case 31:
      return <BsCloudy width={width} height={height} x={x} y={y} viewBox={viewBox} /> // 31 - Overcast with low clouds (night) -
    case 32:
      return <BsLightRain width={width} height={height} x={x} y={y} viewBox={viewBox} /> // 32 - Rain shower (night)
    case 33:
      return <BsCloudLightningRain width={width} height={height} x={x} y={y} viewBox={viewBox} /> // 33 - Local thunderstorms (night)
    case 34:
      return <BsSleet width={width} height={height} x={x} y={y} viewBox={viewBox} /> // 34 - Snow shower (night)
    case 35:
      return <BsSleet width={width} height={height} x={x} y={y} viewBox={viewBox} /> // 35 - Rain and snow (night)
    case 36:
      return <BsSleet width={width} height={height} x={x} y={y} viewBox={viewBox} /> // 36 - Possible freezing rain (night)
    case 'location':
      return <Location width={width} height={height} x={x} y={y} viewBox={viewBox} />
    case 'delete':
      return <Delete width={width} height={height} x={x} y={y} viewBox={viewBox} />
    case 'settings':
      return <Settings width={width} height={height} x={x} y={y} viewBox={viewBox} />
    case 'add':
      return <IoAddCircleOutline width={width} height={height} x={x} y={y} viewBox={viewBox} />
    case 'plus':
      return <BiPlus width={width} height={height} x={x} y={y} viewBox={viewBox} />
    case 'close':
      return <BiX width={width} height={height} x={x} y={y} viewBox={viewBox} />
    case 'max':
      return <BsArrowUp width={width} height={height} x={x} y={y} viewBox={viewBox} />
    case 'min':
      return <BsArrowDown width={width} height={height} x={x} y={y} viewBox={viewBox}/>
    case 'sunset':
      return <BsSunset width={width} height={height} x={x} y={y} viewBox={viewBox} />
    case 'sunrise':
      return <BsSunrise width={width} height={height} x={x} y={y} viewBox={viewBox} />

    case 'BlowingDust':
      return <BsWind width={width} height={height} x={x} y={y} viewBox={viewBox} />;
    case 'Clear':
    case 'MostlyClear':
      return <BsSun width={width} height={height} x={x} y={y} viewBox={viewBox} />;
    case 'SunShowers':
      return <BsLightRain width={width} height={height} x={x} y={y} viewBox={viewBox} />;
    case 'Cloudy':
    case 'MostlyCloudy':
    case 'PartlyCloudy':
    case 'Overcast':
      return <BsCloudy width={width} height={height} x={x} y={y} viewBox={viewBox} />;
    case 'Foggy':
    case 'Haze':
    case 'Smoky':
    case 'Dust':
    case 'Fog':
    case 'Smoke':
      return <BsFog width={width} height={height} x={x} y={y} viewBox={viewBox} />;
    case 'Breezy':
    case 'Windy':
      return <BsWind width={width} height={height} x={x} y={y} viewBox={viewBox} />;
    case 'Drizzle':
    case 'LightRain':
    case 'MixedRainfall':
      return <BsLightRain width={width} height={height} x={x} y={y} viewBox={viewBox} />;
    case 'HeavyRain':
    case 'Rain':
    case 'Showers':
    case 'ScatteredShowers':
      return <BsCloudRainHeavy width={width} height={height} x={x} y={y} viewBox={viewBox} />;
    case 'IsolatedThunderstorms':
    case 'ScatteredThunderstorms':
    case 'StrongStorms':
    case 'Thunderstorms':
    case 'SevereThunderstorm':
    case 'Thunderstorm':
      return <BsCloudLightningRain width={width} height={height} x={x} y={y} viewBox={viewBox} />;
    case 'Frigid':
    case 'HeavySnow':
    case 'Blizzard':
    case 'BlowingSnow':
    case 'FreezingDrizzle':
    case 'FreezingRain':
    case 'MixedRainAndSnow':
    case 'MixedSnowAndSleet':
    case 'PossibleFreezingRain':
    case 'PossibleRainAndSnow':
    case 'Snow':
    case 'SnowShowers':
    case 'ScatteredSnowShowers':
    case 'WintryMix':
    case 'Sleet':
      return <BsCloudSnow width={width} height={height} x={x} y={y} viewBox={viewBox} />;
    case 'Hail':
      return <BsCloudHail width={width} height={height} x={x} y={y} viewBox={viewBox} />;
    case 'Hot':
      return <BsSun width={width} height={height} x={x} y={y} viewBox={viewBox} />;
    case 'Tornado':
    case 'TropicalStorm':
    case 'Hurricane':
      return <BsCloudLightningRain width={width} height={height} x={x} y={y} viewBox={viewBox} />;

    case 'ClearNight':
      return <BsMoon width={width} height={height} x={x} y={y} viewBox={viewBox} />;
    case 'MostlyClearNight':
    case 'PartlyCloudyNight':
      return <BsCloudMoon width={width} height={height} x={x} y={y} viewBox={viewBox} />
    default:
      return <BsCloudy width={width} height={height} x={x} y={y} viewBox={viewBox} /> // Sending back a general Cloudy Icon as default
  }
}

export default WeatherIcon
