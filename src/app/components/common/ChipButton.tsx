import React from 'react'

interface ChipButtonProps {
  onClick?: () => void
  children: React.ReactNode
}

const ChipButton: React.FC<ChipButtonProps> = ({ onClick, children }) => {
  return (
    <button
      onClick={onClick}
      className="flex cursor-pointer items-center justify-center rounded-full bg-white/30 px-3 py-1.5 text-base leading-none text-white transition-colors hover:bg-white/20"
    >
      {children}
    </button>
  )
}

export default ChipButton
