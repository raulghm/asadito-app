'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export function Hero() {
  return (
    <div id="home" className="relative mb-12 mt-16 text-center">
      <div className="mx-auto max-w-2xl space-y-6">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            type: 'spring',
            stiffness: 260,
            damping: 20,
            delay: 0.1,
          }}
          className="mx-auto mb-6 flex justify-center">
          <div className="relative">
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 opacity-10 blur-xl"
            />
            <Image
              src="/img-house.png"
              alt="House illustration"
              width={160}
              height={160}
              priority={true}
              quality={100}
              className="relative drop-shadow-lg dark:opacity-90 dark:brightness-90"
            />
          </div>
        </motion.div>

        <h1 className="font-playfair text-4xl font-bold text-[#2c3b8d] dark:text-blue-100">
          Analiza tu Inversión Inmobiliaria
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-300">
          Toma decisiones informadas con datos claros y precisos sobre tu futura propiedad.
        </p>

        <div className="hidden justify-center gap-2 md:flex">
          <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-50 via-blue-100 to-indigo-50 px-4 py-2 text-sm text-blue-700 dark:from-blue-900/40 dark:via-blue-800/30 dark:to-indigo-900/40 dark:text-blue-200">
            <svg
              className="size-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
              />
            </svg>
            Calculadora Inteligente
          </div>
          <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-green-50 via-emerald-50 to-teal-50 px-4 py-2 text-sm text-green-700 dark:from-green-900/40 dark:via-emerald-800/30 dark:to-teal-900/40 dark:text-green-200">
            <svg
              className="size-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
            Análisis
          </div>

          <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-50 via-fuchsia-50 to-pink-50 px-4 py-2 text-sm text-purple-700 dark:from-purple-900/40 dark:via-fuchsia-800/30 dark:to-pink-900/40 dark:text-purple-200">
            <svg
              className="size-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Proyecciones
          </div>
        </div>
      </div>
    </div>
  )
}
