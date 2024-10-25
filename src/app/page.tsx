'use client'

import { useGlobalContext } from '@/lib/GlobalContext'
import Background from './components/Background'
import Graph from './components/Graph/Graph'
import Header from './components/Header'
import Footer from './components/Footer'
import AnimatedBackground from './components/AnimatedBackground'
import { useState } from 'react'
import dynamic from 'next/dynamic'

// Avoid Build time errors
const PWAPrompt = dynamic(() => import('react-ios-pwa-prompt'), {
  ssr: false,
})

export default function Home() {
  const {
    isItDay,
    timestamp,
    handleAnimation,
    containerRef,
    graphData,
    weatherData,
    savedCurrentDayBreaks,
    initialGradient,
  } = useGlobalContext()

  const [isDragging, setIsDragging] = useState<boolean>(false)
  const [startX, setStartX] = useState<number>(0)
  const [scrollLeft, setScrollLeft] = useState<number>(0)

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return
    setIsDragging(true)
    setStartX(e.pageX - containerRef.current.offsetLeft)
    setScrollLeft(containerRef?.current?.scrollLeft)
  }

  const handleMouseLeave = () => {
    setIsDragging(false)
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !containerRef?.current) {
      return
    }
    e.preventDefault()
    const x = e.pageX - containerRef?.current?.offsetLeft
    const walk = (x - startX) * 1 // Scroll-fast (adjust multiplier for speed)
    containerRef.current.scrollLeft = scrollLeft - walk // Scroll the container
  }

  return (
    <main
      ref={containerRef}
      onScroll={handleAnimation}
      className="flex h-svh select-none flex-col justify-end overflow-y-hidden overflow-x-scroll"
      id="scroll1px"
      onMouseDown={handleMouseDown}
      onMouseLeave={handleMouseLeave}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
    >
      <PWAPrompt promptOnVisit={1} timesToShow={1} />
      <Header />
      <Graph />
      <Footer />
      {weatherData?.hourly ? (
        <AnimatedBackground
          icon={timestamp.icon}
          id="chart-bg-gradient"
          isItDay={isItDay}
          containerRef={containerRef}
          graphData={graphData}
          weatherData={weatherData}
          savedCurrentDayBreaks={savedCurrentDayBreaks}
          initialGradient={initialGradient}
          timestamp={timestamp}
        />
      ) : (
        <Background
          icon={timestamp.icon}
          id="chart-bg-gradient"
          isItDay={isItDay}
        />
      )}
    </main>
  )
}
