interface Props {
  id: string
  stops: {
    offset: string
    stopColor: string
    stopOpacity: string
  }[]
}

const LinearGradient = ({ id, stops }: Props) => {
  return (
    <>
      <defs>
        <linearGradient
          id={id}
          gradientUnits='userSpaceOnUse'
          x1='0%'
          y1='0%'
          x2='0%'
          y2='100%'
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
