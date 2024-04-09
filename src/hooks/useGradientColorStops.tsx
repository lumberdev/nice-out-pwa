const clearNight = [
  '#264561',
  '#1F516D',
  '#255074',
  '#224C70',
  '#102143',
  '#0C1A36',
]
const cloudyNight = [
  '#989AA7',
  '#93939F',
  '#66758C',
  '#667789',
  '#405574',
  '#363A52',
]
const clearDay = [
  '#c1c8d1',
  '#8daac0',
  '#cfb5ae',
  '#e0b6ac',
  '#c38171',
  '#ca927a',
]
const cloudyDay = [
  '#8e9b9e',
  '#b8b4ac',
  '#bea086',
  '#a28167',
  '#97745d',
  '#946a50',
]

export const useGradientColorStops = (isItDay: boolean, icon: number) => {
  return isItDay ? dayWeatherGradients[icon] : nightWeatherGradients[icon]
}

export const dayWeatherGradients: { [key: string]: string[] } = {
  // 1: Not Available,
  2: clearDay, // 2 - Sunny
  3: clearDay, // 3 - Mostly sunny
  4: cloudyDay, // 4 - Partly sunny
  5: cloudyDay, // 5 - Mostly cloudy
  6: cloudyDay, // 6 - Cloudy
  7: cloudyDay, // 7 - Overcast
  8: cloudyDay, // 8 - Overcast with low clouds
  9: cloudyDay, // 9 - Fog - BsCloudFog
  10: cloudyDay, // 10 - Light rain
  11: cloudyDay, // 11 - Rain - BsCloudRainHeavy
  12: cloudyDay, // 12 - Possible rain
  13: cloudyDay, // 13 - Rain shower
  14: cloudyDay, // 14 - Thunderstorm - BsCloudLightningRain
  15: cloudyDay, // 15 - Local thunderstorms - BsCloudLightningRain
  16: cloudyDay, // 16 - Light snow - BsCloudSnow
  17: cloudyDay, // 17 - Snow - BsCloudSnow
  18: cloudyDay, // 18 - Possible snow - BsCloudSnow ?
  19: cloudyDay, // 19 - Snow shower - BsCloudSnow ?
  20: cloudyDay, // 20 - Rain and snow
  21: cloudyDay, // 21 - Possible rain and snow
  22: cloudyDay, // 22 - Rain and snow
  23: cloudyDay, // 23 - Freezing rain
  24: cloudyDay, // 24 - Possible freezing rain
  25: cloudyDay, //Hail - BsCloudHail
  26: clearDay, // 26 - Clear (night) - BsMoon
  27: clearDay, // 27 - Mostly clear (night)
  28: clearDay, // 28 - Partly clear (night)
  29: cloudyDay, // 29 - Mostly cloudy (night)
  30: cloudyDay, // 30 - Cloudy (night) - BsCloudy
  31: cloudyDay, // 31 - Overcast with low clouds (night) -
  32: cloudyDay, // 32 - Rain shower (night)
  33: cloudyDay, // 33 - Local thunderstorms (night)
  34: cloudyDay, // 34 - Snow shower (night)
  35: cloudyDay, // 35 - Rain and snow (night)
  36: cloudyDay, // 36 - Possible freezing rain (night)
}

export const nightWeatherGradients: { [key: string]: string[] } = {
  // 1 - Not available
  2: clearNight, // 2 - Sunny
  3: clearNight, // 3 - Mostly sunny
  4: cloudyNight, // 4 - Partly sunny
  5: cloudyNight, // 5 - Mostly cloudy
  6: cloudyNight, // 6 - Cloudy
  7: cloudyNight, // 7 - Overcast
  8: cloudyNight, // 8 - Overcast with low clouds
  9: cloudyNight, // 9 - Fog - BsCloudFog
  10: cloudyNight, // 10 - Light rain
  11: cloudyNight, // 11 - Rain - BsCloudRainHeavy
  12: cloudyNight, // 12 - Possible rain
  13: cloudyNight, // 13 - Rain shower
  14: cloudyNight, // 14 - Thunderstorm - BsCloudLightningRain
  15: cloudyNight, // 15 - Local thunderstorms - BsCloudLightningRain
  16: cloudyNight, // 16 - Light snow - BsCloudSnow
  17: cloudyNight, // 17 - Snow - BsCloudSnow
  18: cloudyNight, // 18 - Possible snow - BsCloudSnow ?
  19: cloudyNight, // 19 - Snow shower - BsCloudSnow ?
  20: cloudyNight, // 20 - Rain and snow
  21: cloudyNight, // 21 - Possible rain and snow
  22: cloudyNight, // 22 - Rain and snow
  23: cloudyNight, // 23 - Freezing rain
  24: cloudyNight, // 24 - Possible freezing rain
  25: cloudyNight, //Hail - BsCloudHail
  26: clearNight, // 26 - Clear (night) - BsMoon
  27: clearNight, // 27 - Mostly clear (night)
  28: clearNight, // 28 - Partly clear (night)
  29: cloudyNight, // 29 - Mostly cloudy (night)
  30: cloudyNight, // 30 - Cloudy (night) - BsCloudy
  31: cloudyNight, // 31 - Overcast with low clouds (night) -
  32: cloudyNight, // 32 - Rain shower (night)
  33: cloudyNight, // 33 - Local thunderstorms (night)
  34: cloudyNight, // 34 - Snow shower (night)
  35: cloudyNight, // 35 - Rain and snow (night)
  36: cloudyNight, // 36 - Possible freezing rain (night)
}
