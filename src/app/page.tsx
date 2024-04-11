'use client'

import { useGlobalContext } from '@/lib/GlobalContext'
import Background from './components/Background'
import Graph from './components/Graph'
import Header from './components/Header'

export default function Home() {
  const { isItDay, timestamp } = useGlobalContext()
  return (
    <main className="h-svh">
      <Header />
      <Graph />
      <Background
        icon={timestamp.icon}
        id="chart-bg-gradient"
        isItDay={isItDay}
      />
    </main>
  )
}
