const colorGradients = {
  clearNight: [
    '#264561',
    '#1F516D',
    '#255074',
    '#224C70',
    '#102143',
    '#0C1A36',
  ],
  cloudyNight: [
    '#989AA7',
    '#93939F',
    '#66758C',
    '#667789',
    '#405574',
    '#363A52',
  ],
  clearDay: ['#c1c8d1', '#8daac0', '#cfb5ae', '#e0b6ac', '#c38171', '#ca927a'],
  cloudyDay: ['#8e9b9e', '#b8b4ac', '#bea086', '#a28167', '#97745d', '#946a50'],
} as const

type ColorGradient = typeof colorGradients
const useGradientColorStops = (keyword: keyof ColorGradient) => {
  return colorGradients[keyword]
}
