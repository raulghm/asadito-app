import { DM_Sans, Playfair_Display } from 'next/font/google'
import Script from 'next/script'

import { Providers } from './providers'

import type { Metadata } from 'next'

import './globals.css'

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
})

export const metadata: Metadata = {
  title: 'Asadito-app',
  description: 'Calculadora de asados',
  keywords: ['asado', 'calculadora'].join(', '),
  openGraph: {
    title: 'Asadito-app',
    description: 'Calculadora de asados',
    url: 'https://asadito.netlify.app/',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Asadito-app',
    description: 'Calculadora de asados',
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
          src="https://analytics.us.umami.is/script.js"
          data-website-id={process.env.UMAMI_ID}></Script>
      )}
      <body className={`${dmSans.className} ${playfair.variable} ${dmSans.variable}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
