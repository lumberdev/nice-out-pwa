// Temperature
export function convertCToF(celsius: number) {
  const fahrenheit = Math.round((celsius * 9) / 5 + 32)
  return fahrenheit
}

export function getConvertedTemperature(
  temperature: number | undefined,
  isUnitMetric: boolean,
) {
  if (temperature === undefined) return undefined
  if (isUnitMetric) {
    return temperature
  } else {
    return convertCToF(temperature)
  }
}

// Wind Speed
export function convertKmhToMph(kmh: number) {
  return Number((kmh * 0.621371).toFixed(2))
}

export function getConvertedWindSpeed(
  speed: number | undefined,
  isUnitMetric: boolean,
) {
  if (speed === undefined) return undefined
  if (isUnitMetric) {
    return speed
  } else {
    return convertKmhToMph(speed)
  }
}

// Precipitation
export function convertMmToInches(mm: number) {
  return Number((mm / 25.4).toFixed(2))
}

export function getConvertedPrecipitation(
  precipitation: number | undefined,
  isUnitMetric: boolean,
) {
  if (precipitation === undefined) return undefined
  if (isUnitMetric) {
    return precipitation
  } else {
    return convertMmToInches(precipitation)
  }
}

// Pressure
export function convertMbToHg(mb: number) {
  return Number((mb * 0.02953).toFixed(2))
}

export function getConvertedPressure(
  pressure: number | undefined,
  isUnitMetric: boolean,
) {
  if (pressure === undefined) return undefined
  if (isUnitMetric) {
    return pressure
  } else {
    return convertMbToHg(pressure)
  }
}
