import React from 'react'
import Temperature from './Temperature'
import Precipitation from './Precipitation'

const Header = () => {
  return (
    <div className="fixed top-0 z-10 flex w-full items-center justify-between p-4 lg:p-10">
      <div className="flex flex-1 items-center justify-start">
        <Temperature />
      </div>
      <div className="flex flex-1 items-center justify-end">
        <Precipitation />
      </div>
    </div>
  )
}

export default Header
