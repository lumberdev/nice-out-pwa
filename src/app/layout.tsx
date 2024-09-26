import { inter } from '@/app/fonts'
import './globals.css'
import type { Metadata, Viewport } from 'next'
import type { ReactNode } from 'react'
import Providers from '@/lib/Providers'
import clsx from 'clsx'
import * as snippet from '@segment/snippet'
import Script from 'next/script'

const APP_NAME = 'Nice out App'
const APP_DEFAULT_TITLE = 'Nice Out'
const APP_TITLE_TEMPLATE = '%s - PWA'
const APP_DESCRIPTION = 'Best PWA app in the world!'

export const metadata: Metadata = {
  manifest: '/manifest.json',
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: APP_DEFAULT_TITLE,
    // startUpImage: [],
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: 'website',
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: 'summary',
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
}

export const viewport: Viewport = {
  themeColor: '#FFFFFF',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  const loadSegment = () => {
    const options = {
      apiKey: process.env.NEXT_PUBLIC_SEGMENT_WRITE_KEY,
    }
    if (process.env.NEXT_PUBLIC_NODE_ENV) return snippet.max(options)
    else return snippet.min(options)
  }
  return (
    <html lang="en" className="overflow-hidden">
      <head />
      <Script
        id="segmentScript"
        dangerouslySetInnerHTML={{ __html: loadSegment() }}
        strategy="lazyOnload"
      />
      <body className={clsx(inter.className)}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
