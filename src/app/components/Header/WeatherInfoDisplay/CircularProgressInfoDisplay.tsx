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
      <div className="h-[6rem] w-[6rem] md:h-[7.5rem] md:w-[7.5rem]">
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
