'use client'

import { useGlobalContext } from '@/lib/GlobalContext'
import Background from './components/Background'
import Graph from './components/Graph/Graph'
import Header from './components/Header'
import Footer from './components/Footer'

export default function Home() {
  const { isItDay, timestamp } = useGlobalContext()
  return (
    <main className="flex h-svh flex-col justify-end">
      <Header />
      <Graph />
      <Footer />
      <Background
        icon={timestamp.icon}
        id="chart-bg-gradient"
        isItDay={isItDay}
      />
    </main>
  )
}
