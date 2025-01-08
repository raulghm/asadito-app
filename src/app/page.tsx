'use client'

import { motion } from 'framer-motion'

import { Asado } from '~/components/asado'
import { Footer } from '~/components/footer'
import { Header } from '~/components/header'
import { BackgroundEffects } from '~/components/ui/background-effects'

export default function Page() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="relative flex min-h-screen flex-col">
      {/* Background Image */}
      <div
        className="fixed inset-0 -z-10 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url("/images/bg.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />

      {/* Gradient Overlay */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-b from-background/70 to-background/80 dark:from-background/60 dark:via-background/80 dark:to-background/90" />

      {/* Rest of the content */}
      <Header />
      {/* <BackgroundEffects /> */}
      <main className="flex flex-1">
        <div className="mx-auto w-full max-w-3xl p-4">
          <Asado />
        </div>
      </main>
      <Footer />
    </motion.div>
  )
}
