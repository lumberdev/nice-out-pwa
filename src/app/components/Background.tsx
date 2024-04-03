import React from 'react'

const Background = ({
  colorStops,
  id,
}: {
  colorStops: string[]
  id: string
}) => {
  return (
    <svg
      width={window.innerWidth}
      height={window.innerHeight}
      className='fixed inset-0 -z-10 '
    >
      <defs>
        <linearGradient id={id} gradientTransform='rotate(45)'>
          {colorStops.map((color, i) => (
            <stop key={i} offset={`${i * 20}%`} stopColor={color} />
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
