'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import * as React from 'react'

import { Button } from '~/components/ui/button'

export function ThemeToggle() {
  const { theme, setTheme, systemTheme } = useTheme()

  const toggleTheme = () => {
    const currentTheme = theme === 'system' ? systemTheme : theme
    setTheme(currentTheme === 'light' ? 'dark' : 'light')
  }

  return (
    <Button variant="outline" size="icon" onClick={toggleTheme}>
      <Sun className="size-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute size-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
