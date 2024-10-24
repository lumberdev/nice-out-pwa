interface Props {
  id: string
  x1?: string
  y1?: string
  x2?: string
  y2?: string
  stops: {
    offset: string
    stopColor: string
    stopOpacity: string
  }[]
}

const LinearGradient = ({
  x1 = '0%',
  y1 = '0%',
  x2 = '0%',
  y2 = '100%',
  id,
  stops,
}: Props) => {
  return (
    <>
      <defs>
        <linearGradient
          id={id}
          gradientUnits="userSpaceOnUse"
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
        >
          {stops.map((stop, index) => (
            <stop
              key={index}
              offset={stop.offset}
              stopColor={stop.stopColor}
              stopOpacity={stop.stopOpacity}
            />
          ))}
        </linearGradient>
      </defs>
    </>
  )
}

export default LinearGradient
