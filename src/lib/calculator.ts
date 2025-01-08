import { type User } from '~/types/types'

interface Calculations {
  meat: number
  sausage: number
  bread: number
  carbon: (isSausageSelected: boolean) => number
  totalPrice: (params: {
    budgetSelected: { meats: { value: number }[]; sausagePrice: number } | null
    isSausageSelected: boolean
    isCarbonSelected: boolean
  }) => number
  pricePerAdult: (totalPrice: number, adults: number) => number
  lentilBurgers: number
  grilledVegetables: number
  marinatedTofu: number
  veganCost: number
}

export function calculateAsado(user: User): Calculations {
  const veganCalculations = {
    lentilBurgers: user.vegan * 2,
    grilledVegetables: user.vegan * 0.3,
    marinatedTofu: user.vegan * 0.2,
    veganCost: user.vegan * 8000,
  }

  return {
    meat: Number((user.men * 0.35 + user.women * 0.25 + user.children * 0.2).toFixed(1)),
    sausage: Number((user.men * 0.1 + user.women * 0.05 + user.children * 0.05).toFixed(1)),
    bread: Number((user.men * 0.16666 + user.women * 0.16666 + user.children * 0.08333).toFixed(1)),
    carbon: function (isSausageSelected: boolean) {
      return Number((this.meat + (isSausageSelected ? this.sausage : 0)).toFixed(1))
    },
    totalPrice: function ({ budgetSelected, isSausageSelected, isCarbonSelected }) {
      if (!budgetSelected) return 0

      const meatPrice =
        this.meat *
        (budgetSelected.meats.reduce((acc, meat) => acc + meat.value, 0) /
          budgetSelected.meats.length)

      const sausagePrice = isSausageSelected
        ? this.sausage * budgetSelected.sausagePrice + this.bread * 1290
        : 0

      const carbonPrice = isCarbonSelected ? this.carbon(isSausageSelected) * 1156 : 0

      const veganCost = veganCalculations.veganCost

      return Math.round((meatPrice + sausagePrice + carbonPrice + veganCost) / 10) * 10
    },
    pricePerAdult: function (totalPrice: number, adults: number) {
      return Math.round(totalPrice / adults / 10) * 10
    },
    ...veganCalculations,
  }
}
