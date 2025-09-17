'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export function Hero() {
  return (
    <section id="home" className="relative mb-16 text-center">
      <div className="mx-auto max-w-4xl space-y-8 px-4">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            type: 'spring',
            stiffness: 260,
            damping: 20,
            delay: 0.1,
          }}
          className="mx-auto mb-4 flex justify-center"
        >
          <div className="relative">
            {/* Glow effect */}
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
              className="absolute"
            />
            {/* Main image container */}
            <div className="relative rounded-2xl">
              <Image
                src="/images/img-asadito.png"
                alt="Asado illustration"
                width={240}
                height={240}
                priority={true}
                quality={100}
                className="relative transition-all duration-300 hover:scale-105 dark:opacity-90 dark:brightness-90"
              />
            </div>
          </div>
        </motion.div>

        <div className="relative">
          <motion.h1
            className="font-serif text-4xl text-amber-900 dark:text-amber-100 sm:text-5xl lg:text-6xl"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            Calculadora
            <div className="relative -mt-6 block -rotate-2 font-handwritten text-5xl text-orange-700 dark:text-orange-400 sm:text-6xl lg:text-7xl">
              asaditos
              <motion.svg
                width="100%"
                height="8"
                viewBox="0 0 100 8"
                className="absolute -bottom-2 left-0"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, delay: 1 }}
              >
                <path
                  d="M0,5 Q25,0 50,5 T100,5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-orange-500 dark:text-orange-400"
                />
              </motion.svg>
            </div>
          </motion.h1>
        </div>

        <div className="relative">
          <motion.p
            className="mx-auto max-w-2xl font-serif text-lg text-slate-700 dark:text-slate-300 sm:text-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Lleva tu asado al siguiente nivel.
          </motion.p>
        </div>
      </div>
    </section>
  )
}
