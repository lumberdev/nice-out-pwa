import { generateGraphData } from '@/lib/generate-graph-data'

export type CurrentWeatherData = {
  icon: string
  icon_num: number
  summary: string
  temperature: number
  feels_like: number
  soil_temperature: number
  wind_chill: number
  surface_temperature: number
  dew_point: number
  wind: {
    speed: number
    gusts: number
    angle: number
    dir: string
  }
  precipitation: {
    total: number
    type: string
    convective: number
    rainspot: string
  }
  probability: {
    precipitation: number
    storm: number
    freeze: number
  }
  cloud_cover: number
  cape: number
  evaporation: number
  lftx: number
  snow_depth: number
  sunshine_duration: number
  irradiance: number
  ozone: number
  pressure: number
  uv_index: number
  humidity: number
  visibility: number
}

export type WeatherData = {
  timezone: string
  hourly: HourlyWeather[]
  daily: DailyWeather[]
}
export type HourlyWeather = {
  date: string
  weather: string
  icon: number
  summary: string
  temperature: number
  feels_like: number
  soil_temperature: number
  wind_chill: number
  dew_point: number
  surface_temperature: number
  wind: {
    speed: number
    gusts: number
    dir: string
    angle: number
  }
  cloud_cover: {
    total: number
    low: number
    middle: number
    high: number
  }
  pressure: number
  precipitation: {
    total: number
    type: string
    convective: number
    rainspot: string
  }
  probability: {
    precipitation: number
    storm: number
    freeze: number
  }
  cape: number
  evaporation: number
  irradiance: number
  lftx: number
  ozone: number
  uv_index: number
  humidity: number
  snow_depth: number
  sunshine_duration: number
  visibility: number
}
export type DailyWeather = {
  day: string
  weather: string
  icon: number
  summary: string
  predictability: number
  all_day: DayWeather
  morning: DayWeather
  afternoon: DayWeather
  evening: DayWeather
  astro: {
    sun: {
      rise: string
      set: string
      always_up: boolean
      always_down: boolean
    }
    moon: {
      phase: string
      rise: string
      set: string
      always_up: boolean
      always_down: boolean
    }
  }
  statistics: {
    temperature: {
      avg: number
      avg_min: number
      avg_max: number
      record_min: number
      record_max: number
    }
    wind: {
      avg_speed: number
      avg_angle: number
      avg_dir: string
      max_speed: number
      max_gust: number
    }
    precipitation: {
      avg: number
      probability: number
    }
  }
}

export type DayWeather = {
  weather: string
  icon: number
  temperature: number
  feels_like: number
  soil_temperature: number
  wind_chill: number
  dew_point: number
  surface_temperature: number
  wind: {
    speed: number
    gusts: number
    dir: string
    angle: number
  }
  cloud_cover: {
    total: number
    low: number
    middle: number
    high: number
  }
  pressure: number
  precipitation: {
    total: number
    type: string
  }
  probability: {
    precipitation: number
    storm: number
    freeze: number
  }
  ozone: number
  humidity: number
  snow_depth: number
  visibility: number
  temperature_min?: number
  temperature_max?: number
  feels_like_min?: number
  feels_like_max?: number
  soil_temperature_min?: number
  soil_temperature_max?: number
  wind_chill_min?: number
  wind_chill_max?: number
  dew_point_min?: number
  dew_point_max?: number
  surface_temperature_min?: number
  surface_temperature_max?: number
}

export type TemperatureData = {
  temperature: number
  feelsLikeTemperature: number
  currentDayMaxTemp: number
  currentDayMinTemp: number
  currentDayFeelsLikeMaxTemp: number
  currentDayFeelsLikeMinTemp: number
}

export type GraphData = ReturnType<typeof generateGraphData>
