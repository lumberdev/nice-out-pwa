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

