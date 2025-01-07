import { create } from 'zustand'
import { Budget } from '~/types/types'

interface AsadoState {
  user: {
    men: number
    women: number
    children: number
  }
  budgetSelected: Budget | null
  isSausageSelected: boolean
  isCarbonSelected: boolean
  setUser: (user: AsadoState['user']) => void
  setBudgetSelected: (budget: Budget | null) => void
  toggleSausage: () => void
  toggleCarbon: () => void
}

export const useAsadoStore = create<AsadoState>((set) => ({
  user: {
    men: 0,
    women: 0,
    children: 0,
  },
  budgetSelected: null,
  isSausageSelected: false,
  isCarbonSelected: false,
  setUser: (user) => set({ user }),
  setBudgetSelected: (budget) => set({ budgetSelected: budget }),
  toggleSausage: () =>
    set((state) => ({
      isSausageSelected: !state.isSausageSelected,
    })),
  toggleCarbon: () =>
    set((state) => ({
      isCarbonSelected: !state.isCarbonSelected,
    })),
}))
