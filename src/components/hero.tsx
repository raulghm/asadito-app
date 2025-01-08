'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export function Hero() {
  return (
    <div id="home" className="relative mb-12 mt-16 text-center">
      <div className="mx-auto max-w-2xl space-y-8">
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
                scale: [1, 1.1, 1],
                rotate: [0, 3, -3, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 opacity-20 blur-lg"
            />
            <Image
              src="/img-house.png"
              alt="House illustration"
              width={180}
              height={180}
              priority={true}
              quality={100}
              className="relative drop-shadow-xl dark:opacity-90 dark:brightness-90"
            />
          </div>
        </motion.div>

        <div className="relative">
          <motion.h1
            className="font-handwritten text-5xl text-amber-900 dark:text-amber-100"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}>
            Calculadora de{' '}
            <span className="relative inline-block font-handwritten text-6xl text-orange-700 dark:text-orange-400">
              asaditos
              <motion.svg
                width="100%"
                height="8"
                viewBox="0 0 100 8"
                className="absolute -bottom-2 left-0"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, delay: 1 }}>
                <path
                  d="M0,5 Q25,0 50,5 T100,5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-orange-500 dark:text-orange-400"
                />
              </motion.svg>
            </span>
          </motion.h1>
        </div>

        <div className="relative">
          <motion.p
            className="font-handwritten text-3xl text-slate-700 dark:text-slate-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}>
            Organiza tu asado fácilmente
          </motion.p>
        </div>
      </div>
    </div>
  )
}
