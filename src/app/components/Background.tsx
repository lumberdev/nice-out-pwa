import { useGradientColorStops } from '@/hooks/useGradientColorStops'
import React from 'react'

const Background = ({
  icon,
  id,
  isItDay,
}: {
  icon: number
  id: string
  isItDay: boolean
}) => {
  const colorStops = useGradientColorStops(isItDay, icon)
  const offsets = [2, 24, 46, 60, 81, 99]
  return (
    <svg
      width={window.innerWidth}
      height={window.innerHeight}
      className='fixed inset-0 -z-10 '
    >
      <defs>
        <linearGradient id={id} x1='0%' y1='0%' x2='100%' y2='100%'>
          {colorStops.map((color, i) => (
            <stop key={i} offset={`${offsets[i]}%`} stopColor={color} />
          ))}
        </linearGradient>
      </defs>
      <rect
        x='0'
        y='0'
        width='100%'
        height='100%'
        fill={`url(#chart-bg-gradient)`}
      />
    </svg>
  )
}

export default Background
