'use client'

import { useGlobalContext } from '@/lib/GlobalContext'
import Background from './components/Background'
import Graph from './components/Graph/Graph'
import Header from './components/Header'
import Footer from './components/Footer'
import AnimatedBackground from './components/AnimatedBackground'

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

  return (
    <main
      ref={containerRef}
      onScroll={handleAnimation}
      className="flex h-svh flex-col justify-end overflow-y-hidden overflow-x-scroll"
      id="scroll1px"
    >
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
