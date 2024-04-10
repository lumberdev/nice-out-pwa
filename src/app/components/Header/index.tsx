import React from 'react'
import Temperature from './Temperature'
import Precipitation from './Precipitation'

const Header = () => {
  return (
    <div className="fixed top-0 w-full flex items-center justify-between p-10">
      <div className="flex-1 flex items-start">
        <Temperature />
      </div>
      <div className="flex-1 flex items-end">
        <Precipitation />
      </div>
    </div>
  )
}

export default Header
