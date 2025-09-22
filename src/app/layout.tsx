import { Analytics } from '@vercel/analytics/next'
import { DM_Sans, Caveat } from 'next/font/google'
import Script from 'next/script'

import { Providers } from './providers'

import type { Metadata } from 'next'

import './globals.css'

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
})

const caveat = Caveat({
  subsets: ['latin'],
  variable: '--font-caveat',
})

export const metadata: Metadata = {
  title: 'Calculadora de Asaditos',
  description: 'Lleva tu asado al siguiente nivel',
  keywords: ['asado', 'calculadora'].join(', '),
  icons: {
    icon: '/ico-app.png',
    shortcut: '/ico-app.png',
    apple: '/ico-app.png',
  },
  openGraph: {
    title: 'Calculadora de Asaditospa',
    description: 'Lleva tu asado al siguiente nivel',
    url: 'https://asaditoapp.com',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Calculadora de Asaditos',
    description: 'Lleva tu asado al siguiente nivel',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      {process.env.NODE_ENV === 'production' && (
        <Script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id={process.env.UMAMI_ID}
        ></Script>
      )}
      <body className={`${dmSans.className} ${dmSans.variable} ${caveat.variable}`}>
        <Providers>
          {children}
          <Analytics />
        </Providers>
      </body>
    </html>
  )
}
