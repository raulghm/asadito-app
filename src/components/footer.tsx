'use client'

import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'

export function Footer() {
  return (
    <footer className="py-6 text-center text-sm text-muted-foreground">
      <div className="container">
        <motion.p
          className="flex items-center justify-center gap-1.5"
          whileHover={{ scale: 1.02 }}
          transition={{ type: 'spring', stiffness: 400, damping: 10 }}
        >
          Con <Heart className="size-3.5 text-red-400" /> desde Valdivia, por{' '}
          <motion.a
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            href="https://twitter.com/raulghm"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
          >
            Raúl Hernández.
          </motion.a>{' '}
        </motion.p>
      </div>
    </footer>
  )
}
