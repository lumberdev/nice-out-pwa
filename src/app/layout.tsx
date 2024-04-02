import { Inter } from 'next/font/google'
import './globals.css'
import type { Metadata, Viewport } from 'next'
import type { ReactNode } from 'react'
import Providers from '@/lib/Providers'
import clsx from 'clsx'

const APP_NAME = 'Nice out App'
const APP_DEFAULT_TITLE = 'Nice Out'
const APP_TITLE_TEMPLATE = '%s - PWA'
const APP_DESCRIPTION = 'Best PWA app in the world!'

export const metadata: Metadata = {
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

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang='en'>
      <head />
      <body className={clsx(inter.className, 'overflow-y-hidden')}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
