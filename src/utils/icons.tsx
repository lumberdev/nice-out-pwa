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

export const weatherImages: Record<string | number, JSX.Element> = {
  location: <Location width={24} height={24} />,
  delete: <Delete width={24} height={24} />,
  settings: <Settings width={24} height={24} />,
  add: <IoAddCircleOutline width={40} height={40} />,
  plus: <BiPlus width={40} height={40} />,
  close: <BiX width={40} height={40} />,
  max: <BsArrowUp width={20} height={20} />,
  min: <BsArrowDown width={20} height={20} />,
  sunset: <BsSunset width={20} height={20} />,
  sunrise: <BsSunrise width={20} height={20} />,
  // 1 - Not available
  2: <BsSun width={20} height={20} />, // 2 - Sunny
  3: <BsSun width={20} height={20} />, // 3 - Mostly sunny
  4: <BsCloudSun width={20} height={20} />, // 4 - Partly sunny
  5: <BsCloudy width={20} height={20} />, // 5 - Mostly cloudy
  6: <BsCloudy width={20} height={20} />, // 6 - Cloudy
  7: <BsCloudy width={20} height={20} />, // 7 - Overcast
  8: <BsCloudy width={20} height={20} />, // 8 - Overcast with low clouds
  9: <BsFog width={20} height={20} />, // 9 - Fog - BsCloudFog
  10: <BsLightRain width={20} height={20} />, // 10 - Light rain
  11: <BsCloudRainHeavy width={20} height={20} />, // 11 - Rain - BsCloudRainHeavy
  12: <BsLightRain width={20} height={20} />, // 12 - Possible rain
  13: <BsLightRain width={20} height={20} />, // 13 - Rain shower
  14: <BsCloudLightningRain width={20} height={20} />, // 14 - Thunderstorm - BsCloudLightningRain
  15: <BsCloudLightningRain width={20} height={20} />, // 15 - Local thunderstorms - BsCloudLightningRain
  16: <BsCloudSnow width={20} height={20} />, // 16 - Light snow - BsCloudSnow
  17: <BsCloudSnow width={20} height={20} />, // 17 - Snow - BsCloudSnow
  18: <BsCloudSnow width={20} height={20} />, // 18 - Possible snow - BsCloudSnow ?
  19: <BsCloudSnow width={20} height={20} />, // 19 - Snow shower - BsCloudSnow ?
  20: <BsSleet width={20} height={20} />, // 20 - Rain and snow
  21: <BsSleet width={20} height={20} />, // 21 - Possible rain and snow
  22: <BsSleet width={20} height={20} />, // 22 - Rain and snow
  23: <BsSleet width={20} height={20} />, // 23 - Freezing rain
  24: <BsSleet width={20} height={20} />, // 24 - Possible freezing rain
  25: <BsCloudHail width={20} height={20} />, //Hail - BsCloudHail
  26: <BsMoon width={20} height={20} />, // 26 - Clear (night) - BsMoon
  27: <BsCloudMoon width={20} height={20} />, // 27 - Mostly clear (night)
  28: <BsCloudMoon width={20} height={20} />, // 28 - Partly clear (night)
  29: <BsMoon width={20} height={20} />, // 29 - Mostly cloudy (night)
  30: <BsCloudy width={20} height={20} />, // 30 - Cloudy (night) - BsCloudy
  31: <BsCloudy width={20} height={20} />, // 31 - Overcast with low clouds (night) -
  32: <BsLightRain width={20} height={20} />, // 32 - Rain shower (night)
  33: <BsCloudLightningRain width={20} height={20} />, // 33 - Local thunderstorms (night)
  34: <BsSleet width={20} height={20} />, // 34 - Snow shower (night)
  35: <BsSleet width={20} height={20} />, // 35 - Rain and snow (night)
  36: <BsSleet width={20} height={20} />, // 36 - Possible freezing rain (night)
}
