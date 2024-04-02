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

export const drawLinearGradient = (
  svg: d3.Selection<SVGSVGElement | null, unknown, null, undefined>,
  id: string,
  stops: {
    offset: string
    stopColor: string
    stopOpacity: string
  }[],
) => {
  svg
    .append('defs')
    .append('linearGradient')
    .attr('id', id)
    .attr('gradientUnits', 'userSpaceOnUse')
    .attr('x1', '0%')
    .attr('y1', '0%')
    .attr('x2', '0%')
    .attr('y2', '100%')
    .selectAll('stop')
    .data(stops)
    .enter()
    .append('stop')
    .attr('offset', (d, i) => d.offset)
    .attr('stop-color', (d) => d.stopColor)
    .attr('stop-opacity', (d) => d.stopOpacity)
}
