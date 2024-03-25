'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactNode } from 'react'
import { GlobalContextProvider } from './GlobalContext'

const queryClient = new QueryClient()

export default function Providers({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalContextProvider>{children}</GlobalContextProvider>
    </QueryClientProvider>
  )
}
