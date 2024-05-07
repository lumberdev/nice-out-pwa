// Apple doesn't list the possible values of `conditionCodes` in their WeatherKit REST API

// Found two references and combined them together to get the list of possible values:
// 1. Extracted from WeatherKit Swift API Docs https://gist.github.com/mikesprague/048a93b832e2862050356ca233ef4dc1
// 2. https://github.com/hrbrmstr/weatherkit/blob/batman/R/enumerations.R

export interface ConditionCode {
  code: string
  description: string
  type:
    | 'visibility'
    | 'wind'
    | 'precipitation'
    | 'hazardous'
    | 'winter-precipitation'
    | 'hazardous-winter'
    | 'tropical-hazard'
}

export const conditionCodes: ConditionCode[] = [
  // from the 1st reference
  {
    code: 'BlowingDust',
    description: 'Blowing dust',
    type: 'visibility',
  },
  {
    code: 'Clear',
    description: 'Clear',
    type: 'visibility',
  },
  {
    code: 'Cloudy',
    description: 'Cloudy',
    type: 'visibility',
  },
  {
    code: 'Foggy',
    description: 'Fog',
    type: 'visibility',
  },
  {
    code: 'Haze',
    description: 'Haze',
    type: 'visibility',
  },
  {
    code: 'MostlyClear',
    description: 'Mostly clear',
    type: 'visibility',
  },
  {
    code: 'MostlyCloudy',
    description: 'Mostly cloudy',
    type: 'visibility',
  },
  {
    code: 'PartlyCloudy',
    description: 'Partly cloudy',
    type: 'visibility',
  },
  {
    code: 'Smoky',
    description: 'Smoky',
    type: 'visibility',
  },
  {
    code: 'Breezy',
    description: 'Breezy',
    type: 'wind',
  },
  {
    code: 'Windy',
    description: 'Windy',
    type: 'wind',
  },
  {
    code: 'Drizzle',
    description: 'Drizzle',
    type: 'precipitation',
  },
  {
    code: 'HeavyRain',
    description: 'Heavy rain',
    type: 'precipitation',
  },
  {
    code: 'IsolatedThunderstorms',
    description: 'Thunderstorms',
    type: 'precipitation',
  },
  {
    code: 'Rain',
    description: 'Rain',
    type: 'precipitation',
  },
  {
    code: 'SunShowers',
    description: 'Rain',
    type: 'precipitation',
  },
  {
    code: 'ScatteredThunderstorms',
    description: 'Scattered Thunderstorms',
    type: 'precipitation',
  },
  {
    code: 'StrongStorms',
    description: 'Strong thunderstorms',
    type: 'precipitation',
  },
  {
    code: 'Thunderstorms',
    description: 'Thunderstorms',
    type: 'precipitation',
  },
  {
    code: 'Frigid',
    description: 'Frigid conditions',
    type: 'hazardous',
  },
  {
    code: 'Hail',
    description: 'Hail',
    type: 'hazardous',
  },
  {
    code: 'Hot',
    description: 'Hot',
    type: 'hazardous',
  },
  {
    code: 'Flurries',
    description: 'Flurries',
    type: 'winter-precipitation',
  },
  {
    code: 'Sleet',
    description: 'Sleet',
    type: 'winter-precipitation',
  },
  {
    code: 'Snow',
    description: 'Snow',
    type: 'winter-precipitation',
  },
  {
    code: 'SunFlurries',
    description: 'Flurries',
    type: 'winter-precipitation',
  },
  {
    code: 'WintryMix',
    description: 'Wintry mix',
    type: 'winter-precipitation',
  },
  {
    code: 'Blizzard',
    description: 'Blizzard',
    type: 'hazardous-winter',
  },
  {
    code: 'BlowingSnow',
    description: 'Blowing snow',
    type: 'hazardous-winter',
  },
  {
    code: 'FreezingDrizzle',
    description: 'Freezing drizzle',
    type: 'hazardous-winter',
  },
  {
    code: 'FreezingRain',
    description: 'Freezing rain',
    type: 'hazardous-winter',
  },
  {
    code: 'HeavySnow',
    description: 'Heavy snow',
    type: 'hazardous-winter',
  },
  {
    code: 'Hurricane',
    description: 'Hurricane',
    type: 'tropical-hazard',
  },
  {
    code: 'TropicalStorm',
    description: 'Tropical storm',
    type: 'tropical-hazard',
  },
  // From 2nd reference that wasn't present above
  {
    code: 'Dust',
    description: 'Dust',
    type: 'visibility',
  },
  {
    code: 'Fog',
    description: 'Fog',
    type: 'visibility',
  },
  {
    code: 'Smoke',
    description: 'Smoke',
    type: 'visibility',
  },
  {
    code: 'Showers',
    description: 'Showers',
    type: 'precipitation',
  },
  {
    code: 'MixedRainAndSleet',
    description: 'Mixed rain and sleet',
    type: 'winter-precipitation',
  },
  {
    code: 'MixedRainAndSnow',
    description: 'Mixed rain and snow',
    type: 'winter-precipitation',
  },
  {
    code: 'MixedRainfall',
    description: 'Rain',
    type: 'precipitation',
  },
  {
    code: 'MixedSnowAndSleet',
    description: 'Mixed snow and sleet',
    type: 'winter-precipitation',
  },
  {
    code: 'ScatteredShowers',
    description: 'Scattered showers',
    type: 'precipitation',
  },
  {
    code: 'ScatteredSnowShowers',
    description: 'Scattered snow showers',
    type: 'winter-precipitation',
  },
  {
    code: 'SnowShowers',
    description: 'Snow showers',
    type: 'winter-precipitation',
  },
  {
    code: 'SevereThunderstorm',
    description: 'Severe thunderstorm',
    type: 'precipitation',
  },
  {
    code: 'Thunderstorm',
    description: 'Thunderstorm',
    type: 'precipitation',
  },
  {
    code: 'Tornado',
    description: 'Tornado',
    type: 'hazardous',
  },
]
