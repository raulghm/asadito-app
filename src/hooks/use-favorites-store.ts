import { create } from 'zustand'

export interface FavoriteAsado {
  id: string
  name: string
  config: {
    men: number
    women: number
    children: number
    vegan: number
    budget: number
    includeSausage: boolean
    includeCarbon: boolean
    includeVegetables: boolean
  }
}

export const useFavoritesStore = create<{
  favorites: FavoriteAsado[]
  addFavorite: (favorite: FavoriteAsado) => void
  removeFavorite: (id: string) => void
}>((set) => ({
  favorites: [],
  addFavorite: (favorite) =>
    set((state) => ({
      favorites: [...state.favorites, favorite],
    })),
  removeFavorite: (id) =>
    set((state) => ({
      favorites: state.favorites.filter((f) => f.id !== id),
    })),
}))
