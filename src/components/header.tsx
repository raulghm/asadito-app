'use client'

import { motion } from 'framer-motion'
import { HelpCircle } from 'lucide-react'
import { useState } from 'react'

import { cn } from '~/lib/utils'

import { HelpSection } from './help-section'
import { Button } from './ui/button'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from './ui/drawer'

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
      className={cn('relative top-0 z-50 transition-all duration-200', isScrolled && 'shadow-sm')}
    >
      <div className="container mx-auto flex justify-end p-4">
        <Drawer direction="right">
          <DrawerTrigger asChild>
            <Button variant="link" className="gap-2 font-serif">
              <HelpCircle className="size-4" />
              ¿Cómo funciona?
            </Button>
          </DrawerTrigger>
          <DrawerContent className="!fixed !inset-y-0 !bottom-auto !left-auto !right-0 !mt-0 !h-full !w-full !rounded-none !border-y-0 !border-l !border-r-0 lg:!w-1/2">
            <DrawerHeader className="border-b px-6">
              <DrawerTitle className="font-serif text-2xl">¿Cómo funciona?</DrawerTitle>
              <DrawerDescription>
                Comprende cada detalle de cómo calculamos tu asado perfecto
              </DrawerDescription>
            </DrawerHeader>
            <div className="flex-1 overflow-y-auto py-6">
              <HelpSection />
            </div>
            <DrawerFooter className="border-t">
              <DrawerClose asChild>
                <Button variant="outline">Cerrar</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
    </motion.header>
  )
}
