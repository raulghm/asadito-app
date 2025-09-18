import { DM_Sans, Playfair_Display, Caveat } from 'next/font/google'
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

const caveat = Caveat({
  subsets: ['latin'],
  variable: '--font-caveat',
})

export const metadata: Metadata = {
  title: 'Calculadora de Asaditos',
  description: 'Lleva tu asado al siguiente nivel',
  keywords: ['asado', 'calculadora'].join(', '),
  icons: {
    icon: '/ico-meat.png',
    shortcut: '/ico-meat.png',
    apple: '/ico-meat.png',
  },
  openGraph: {
    title: 'Calculadora de Asaditos',
    description: 'Lleva tu asado al siguiente nivel',
    url: 'https://asadito-app.vercel.app',
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
          data-website-id={process.env.UMAMI_ID}></Script>
      )}
      <body
        className={`${dmSans.className} ${playfair.variable} ${dmSans.variable} ${caveat.variable}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
