import React from 'react'

const LinearGradient = ({
  colorStops,
  id,
}: {
  colorStops: string[]
  id: string
}) => {
  return (
    <>
      <defs>
        <linearGradient id={id} gradientTransform='rotate(45)'>
          {colorStops.map((color, i) => (
            <stop key={i} offset={`${i * 20}%`} stopColor={color} />
          ))}
        </linearGradient>
      </defs>
    </>
  )
}

export default LinearGradient
