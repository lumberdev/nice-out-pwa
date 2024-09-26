import { useGradientColorStops } from '@/hooks/useGradientColorStops'
import React from 'react'

const Background = ({
  icon,
  id,
  isItDay,
  card = false,
  colors,
}: {
  icon: number | string
  id: string
  isItDay: boolean
  card?: boolean
  colors?: string[]
}) => {
  const colorStops = useGradientColorStops(isItDay, icon)
  const finalColors = colors || colorStops
  const offsets = [2, 24, 46, 60, 81, 99]
  return (
    <div
      className={`${card ? 'h-full max-h-[150px]' : 'fixed min-h-[100vh] '} inset-0 -z-10`}
    >
      <svg width="100%" height="100%">
        <defs>
          <linearGradient
            id={id}
            x1={card ? '0%' : '50%'}
            y1={card ? '75%' : '0%'}
            x2={card ? '100%' : '75%'}
            y2={card ? '100%' : '100%'}
          >
            {finalColors?.map((color, i) => (
              <stop key={i} offset={`${offsets[i]}%`} stopColor={color} />
            ))}
          </linearGradient>
        </defs>
        <rect x="0" y="0" width="100%" height="100%" fill={`url(#${id})`} />
      </svg>
    </div>
  )
}

export default Background
