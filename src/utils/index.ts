export const graphTempColorStops = [
  {
    offset: '0%',
    stopColor: '#fff',
    stopOpacity: '0.8',
  },
  {
    offset: '20%',
    stopColor: '#fff',
    stopOpacity: '0.7',
  },
  {
    offset: '50%',
    stopColor: '#fff',
    stopOpacity: '0.5',
  },
  {
    offset: '75%',
    stopColor: '#fff',
    stopOpacity: '0.3',
  },
  {
    offset: '99.1%',
    stopColor: '#fff',
    stopOpacity: '0',
  },
]
export const horizontalGradientStops = [
  {
    offset: '0%',
    stopColor: '#fff',
    stopOpacity: '0',
  },
  {
    offset: '20%',
    stopColor: '#fff',
    stopOpacity: '0.7',
  },
  {
    offset: '80%',
    stopColor: '#fff',
    stopOpacity: '0.7',
  },
  {
    offset: '100%',
    stopColor: '#fff',
    stopOpacity: '0',
  },
]
export function normalizePosition(length: number, position: number): number {
  return position / length
  // return Math.min(Math.max(position / length, 0), 1)
}
