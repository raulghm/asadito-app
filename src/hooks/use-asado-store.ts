import { create } from 'zustand'

import { Budget } from '~/types/types'

interface User {
  men: number
  women: number
  children: number
  vegan: number
}

const initialState: User = {
  men: 0,
  women: 0,
  children: 0,
  vegan: 0,
}

type DrinkConsumptionLevel = 'light' | 'moderate' | 'high'

interface AsadoState {
  user: User
  budgetSelected: Budget | null
  isSausageSelected: boolean
  isCarbonSelected: boolean
  isVegetablesSelected: boolean
  includeBeer: boolean
  includeWine: boolean
  includeSoda: boolean
  drinkConsumptionLevel: DrinkConsumptionLevel
  setUser: (user: AsadoState['user']) => void
  setBudgetSelected: (budget: Budget | null) => void
  toggleSausage: () => void
  toggleCarbon: () => void
  toggleVegetables: () => void
  toggleBeer: () => void
  toggleWine: () => void
  toggleSoda: () => void
  setDrinkConsumptionLevel: (level: DrinkConsumptionLevel) => void
}

export const useAsadoStore = create<AsadoState>((set) => ({
  user: initialState,
  budgetSelected: null,
  isSausageSelected: false,
  isCarbonSelected: false,
  isVegetablesSelected: false,
  includeBeer: false,
  includeWine: false,
  includeSoda: false,
  drinkConsumptionLevel: 'moderate',
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
  toggleVegetables: () =>
    set((state) => ({
      isVegetablesSelected: !state.isVegetablesSelected,
    })),
  toggleBeer: () =>
    set((state) => ({
      includeBeer: !state.includeBeer,
    })),
  toggleWine: () =>
    set((state) => ({
      includeWine: !state.includeWine,
    })),
  toggleSoda: () =>
    set((state) => ({
      includeSoda: !state.includeSoda,
    })),
  setDrinkConsumptionLevel: (level) => set({ drinkConsumptionLevel: level }),
}))
