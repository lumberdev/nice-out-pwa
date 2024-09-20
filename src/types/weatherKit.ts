import { generateGraphData } from '@/lib/generate-graph-data'

export type Metadata = {
  attributionURL: string
  expireTime: string
  latitude: number
  longitude: number
  readTime: string
  reportedTime: string
  units: string
  version: number
  sourceType: string
}

export type CurrentWeather = {
  name: string
  metadata: Metadata
  asOf: string
  cloudCover: number
  cloudCoverLowAltPct: number
  cloudCoverMidAltPct: number
  cloudCoverHighAltPct: number
  conditionCode: string
  daylight: boolean
  humidity: number
  precipitationIntensity: number
  pressure: number
  pressureTrend: string
  temperature: number
  temperatureApparent: number
  temperatureDewPoint: number
  uvIndex: number
  visibility: number
  windDirection: number
  windGust: number
  windSpeed: number
}

export type HourlyWeather = {
  forecastStart: string
  cloudCover: number
  conditionCode: string
  daylight: boolean
  humidity: number
  precipitationAmount: number
  precipitationIntensity: number
  precipitationChance: number
  precipitationType: string
  pressure: number
  pressureTrend: string
  snowfallIntensity: number
  snowfallAmount: number
  temperature: number
  temperatureApparent: number
  temperatureDewPoint: number
  uvIndex: number
  visibility: number
  windDirection: number
  windGust: number
  windSpeed: number
}

export type DailyWeather = {
  forecastStart: string
  forecastEnd: string
  conditionCode: string
  maxUvIndex: number
  moonPhase: string
  moonrise: string
  moonset: string
  precipitationAmount: number
  precipitationChance: number
  precipitationType: string
  snowfallAmount: number
  solarMidnight: string
  solarNoon: string
  sunrise: string
  sunriseCivil: string
  sunriseNautical: string
  sunriseAstronomical: string
  sunset: string
  sunsetCivil: string
  sunsetNautical: string
  sunsetAstronomical: string
  temperatureMax: number
  temperatureMin: number
  windGustSpeedMax: number
  windSpeedAvg?: number
  windSpeedMax: number
  daytimeForecast: {
    forecastStart: string
    forecastEnd: string
    cloudCover: number
    conditionCode: string
    humidity: number
    precipitationAmount: number
    precipitationChance: number
    precipitationType: string
    snowfallAmount: number
    temperatureMax: number
    temperatureMin: number
    windDirection: number
    windGustSpeedMax: number
    windSpeed: number
    windSpeedMax: number
  }
  overnightForecast: {
    forecastStart: string
    forecastEnd: string
    cloudCover: number
    conditionCode: string
    humidity: number
    precipitationAmount: number
    precipitationChance: number
    precipitationType: string
    snowfallAmount: number
    temperatureMax: number
    temperatureMin: number
    windDirection: number
    windGustSpeedMax: number
    windSpeed: number
    windSpeedMax: number
  }
  restOfDayForecast: {
    forecastStart: string
    forecastEnd: string
    cloudCover: number
    conditionCode: string
    humidity: number
    precipitationAmount: number
    precipitationChance: number
    precipitationType: string
    snowfallAmount: number
    temperatureMax: number
    temperatureMin: number
    windDirection: number
    windGustSpeedMax: number
    windSpeed: number
    windSpeedMax: number
  }
}

export type HourlyForecast = {
  name: string
  metadata: Metadata
  hours: HourlyWeather[]
}

export type DailyForecast = {
  name: string
  metadata: Metadata
  days: DailyWeather[]
}

export type WeatherData = {
  timezone: string
  current: CurrentWeather
  hourly: HourlyWeather[]
  daily: DailyWeather[]
  locationName?: string
  locationId?: string
  googleLocationID?: string
  location?: {
    coords: {
      latitude: number | undefined
      longitude: number | undefined
    }
  }
  isGPSLocation?: boolean
  SCREEN_HEIGHT: number
  GRAPH_HEIGHT: number
}

export type TemperatureData = {
  temperature: number
  feelsLikeTemperature?: number
  currentDayMaxTemp?: number
  currentDayMinTemp?: number
  currentDayFeelsLikeMaxTemp?: number
  currentDayFeelsLikeMinTemp?: number
  currentDayDailyAverageTemp?: number
}

export type WeatherInfo = {
  wind: number
  precipitation: number
  humidity: number
  feelsLike: number
  cloudCover: number
  pressure: number
  dew: number
  uvIndex: number
  precipitationChance: number
}

export type cachedLocation = {
  queryKey: [string, { lat: string; lon: string }]
  queryData: WeatherData
  queryStatus: string
}

export type GeoLocationData = {
  coords: {
    latitude: number | undefined
    longitude: number | undefined
  }
  timeStamp?: EpochTimeStamp
  name?: string
  googleLocationID?: string
  isGPSLocation?: boolean
}

export type GraphData = ReturnType<typeof generateGraphData>
