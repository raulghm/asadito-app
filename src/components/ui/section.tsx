import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '~/lib/utils'

const sectionVariants = cva(
  'mb-8 rounded-2xl border border-gray-100 p-6 shadow-sm dark:border-gray-800 lg:p-10',
  {
    variants: {
      variant: {
        blue: 'bg-blue-600/10 dark:bg-gray-950/40',
        green: 'bg-green-600/10 dark:bg-gray-900/40',
        purple: 'bg-purple-600/10 dark:bg-gray-950/40',
        default: 'bg-gray-100/50 dark:bg-gray-950/40',
        yellow: 'bg-yellow-600/10 dark:bg-gray-950/40',
        red: 'bg-red-600/10 dark:bg-gray-950/40',
        orange: 'bg-orange-600/10 dark:bg-gray-950/40',
        pink: 'bg-pink-600/10 dark:bg-gray-950/40',
        gray: 'bg-gray-600/10 dark:bg-gray-950/40',
        teal: 'bg-teal-600/10 dark:bg-gray-950/40',
        indigo: 'bg-indigo-600/10 dark:bg-gray-950/40',
        cyan: 'bg-cyan-600/10 dark:bg-gray-950/40',
        emerald: 'bg-emerald-600/10 dark:bg-gray-950/40',
        fuchsia: 'bg-fuchsia-600/10 dark:bg-gray-950/40',
        violet: 'bg-violet-600/10 dark:bg-gray-950/40',
        rose: 'bg-rose-600/10 dark:bg-gray-950/40',
        'blue-dark': 'bg-blue-900/10 dark:bg-gray-950/40',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

interface SectionProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof sectionVariants> {
  children: React.ReactNode
}

export function Section({ children, className, variant, ...props }: SectionProps) {
  return (
    <div className={cn(sectionVariants({ variant, className }))} {...props}>
      {children}
    </div>
  )
}
