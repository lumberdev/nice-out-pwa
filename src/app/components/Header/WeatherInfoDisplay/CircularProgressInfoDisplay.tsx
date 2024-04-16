import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import React from 'react'
import ChipButton from '@/app/components/common/ChipButton'

interface CircularProgressInfoDisplayProps {
  value: number
  label: string
}

const CircularProgressInfoDisplay: React.FC<
  CircularProgressInfoDisplayProps
> = ({ value, label }) => {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="h-24 w-24 md:h-28 md:w-28">
        <CircularProgressbar
          value={value}
          text={`${value}%`}
          strokeWidth={7}
          styles={buildStyles({
            strokeLinecap: 'butt',
            rotation: 0.25,
            textColor: '#FFF',
            pathColor: '#FFF',
            trailColor: '#FFFFFF4C',
          })}
        />
      </div>
      <ChipButton>{label}</ChipButton>
    </div>
  )
}

export default CircularProgressInfoDisplay
