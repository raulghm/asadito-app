'use client'

import { motion } from 'framer-motion'

import { Footer } from '~/components/footer'
import { Header } from '~/components/header'
import { Asado } from '~/components/asado'
import { BackgroundEffects } from '~/components/ui/background-effects'

export default function Page() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="relative flex min-h-screen flex-col">
      {/* Header */}
      <Header />

      {/* Background Effects */}
      <BackgroundEffects />

      {/* Main Content */}
      <main className="flex flex-1">
        <div className="mx-auto w-full max-w-3xl p-4">
          <Asado />
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </motion.div>
  )
}
