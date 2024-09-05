'use client'

import { QueryClient } from '@tanstack/react-query'
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister'
import { ReactNode } from 'react'
import { GlobalContextProvider } from './GlobalContext'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 15, // 15 min
    },
  },
})

const persister = createSyncStoragePersister({
  storage: typeof window !== 'undefined' ? window.localStorage : null,
})

export default function Providers({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister }}
    >
      {' '}
      <GlobalContextProvider>{children}</GlobalContextProvider>
    </PersistQueryClientProvider>
  )
}
