export const graphTempColorStops = [
  {
    offset: '99.1%',
    stopColor: 'white',
    stopOpacity: '0.01',
  },
  {
    offset: '75%',
    stopColor: 'white',
    stopOpacity: '0.3',
  },
  {
    offset: '50%',
    stopColor: 'white',
    stopOpacity: '0.5',
  },
  {
    offset: '20%',
    stopColor: 'white',
    stopOpacity: '0.7',
  },
  {
    offset: '0',
    stopColor: 'white',
    stopOpacity: '0.8',
  },
]

export function normalizePosition(length: number, position: number): number {
  return Math.min(Math.max(position / length, 0), 1)
}
