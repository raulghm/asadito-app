'use client'

import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import { useState } from 'react'

import { cn } from '~/lib/utils'

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)

  // Detectar scroll
  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', () => {
      setIsScrolled(window.scrollY > 10)
    })
  }

  return (
    <motion.header
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={cn(
        'relative top-0 z-50 w-full transition-all duration-200',
        isScrolled && 'shadow-sm',
      )}
    ></motion.header>
  )
}
