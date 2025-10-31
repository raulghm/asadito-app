import { type User } from '~/types/types'

type DrinkConsumptionLevel = 'light' | 'moderate' | 'high'

/**
 * Interface representing the calculations for an asado (barbecue) event
 * @interface Calculations
 */
interface Calculations {
  /** Amount of meat in kilograms needed for the asado */
  meat: number
  /** Amount of sausage in kilograms needed for the asado */
  sausage: number
  /** Amount of bread in kilograms needed for the asado */
  bread: number
  /** Amount of vegetables in kilograms needed for the asado */
  vegetables: number
  /** Amount of beer in milliliters needed */
  beer: number
  /** Amount of wine in milliliters needed */
  wine: number
  /** Amount of soda in milliliters needed */
  soda: number
  /**
   * Calculates the amount of carbon needed based on meat and sausage
   * @param isSausageSelected - Whether sausage is included in the asado
   * @returns Amount of carbon in kilograms
   */
  carbon: (isSausageSelected: boolean) => number
  /**
   * Calculates the total price for the asado
   * @param params - Parameters for price calculation
   * @returns Total price in Chilean pesos
   */
  totalPrice: (params: {
    budgetSelected: {
      id: number
      name: string
      meats: {
        id: string
        name: string
        values: {
          lider: { price: { normal: number | null; promo: number | null } }
          jumbo: { price: { normal: number | null; promo: number | null } }
        }
      }[]
      sausage: { name: string; priceLider: number; priceJumbo: number }
      carbon: { name: string; priceLider: number; priceJumbo: number }
      bread: { name: string; priceLider: number; priceJumbo: number }
      vegetables: { name: string; priceLider: number; priceJumbo: number }
      beverages: {
        beer: { name: string; pricePerMl: number }
        wine: { name: string; pricePerMl: number }
        soda: { name: string; pricePerMl: number }
      }
    } | null
    isSausageSelected: boolean
    isCarbonSelected: boolean
    isVegetablesSelected: boolean
    includeBeer: boolean
    includeWine: boolean
    includeSoda: boolean
  }) => number
  /**
   * Calculates the price per adult for the asado
   * @param totalPrice - Total price of the asado
   * @param adults - Number of adults (men + women)
   * @returns Price per adult in Chilean pesos
   */
  pricePerAdult: (totalPrice: number, adults: number) => number
  /** Number of lentil burgers needed for vegan guests */
  lentilBurgers: number
  /** Amount of marinated tofu in kilograms needed for vegan guests */
  marinatedTofu: number
  /** Total cost for vegan options in Chilean pesos */
  veganCost: number
  /**
   * Calculates separate pricing for vegan and non-vegan diners
   * @param params - Parameters for separate price calculation
   * @returns Object with separate totals for vegans and non-vegans
   */
  separateVeganPricing: (params: {
    budgetSelected: {
      id: number
      name: string
      meats: {
        id: string
        name: string
        values: {
          lider: { price: { normal: number | null; promo: number | null } }
          jumbo: { price: { normal: number | null; promo: number | null } }
        }
      }[]
      sausage: { name: string; priceLider: number; priceJumbo: number }
      carbon: { name: string; priceLider: number; priceJumbo: number }
      bread: { name: string; priceLider: number; priceJumbo: number }
      vegetables: { name: string; priceLider: number; priceJumbo: number }
      beverages: {
        beer: { name: string; pricePerMl: number }
        wine: { name: string; pricePerMl: number }
        soda: { name: string; pricePerMl: number }
      }
    } | null
    isSausageSelected: boolean
    isCarbonSelected: boolean
    isVegetablesSelected: boolean
    includeBeer: boolean
    includeWine: boolean
    includeSoda: boolean
    veganCount: number
  }) => {
    veganTotal: number
    nonVeganTotal: number
    veganPerPerson: number
  }
}

/**
 * Calculates the required ingredients and costs for an asado based on the number of guests
 *
 * @param user - Object containing the number of men, women, children, and vegan guests
 * @param drinkConsumptionLevel - Level of drink consumption (light, moderate, high)
 * @returns Calculations object with all required ingredients and pricing methods
 *
 * @example
 * const calculations = calculateAsado({ men: 5, women: 3, children: 2, vegan: 1 }, 'moderate');
 * const totalPrice = calculations.totalPrice({
 *   budgetSelected: selectedBudget,
 *   isSausageSelected: true,
 *   isCarbonSelected: true
 * });
 */
export function calculateAsado(
  user: User,
  drinkConsumptionLevel: DrinkConsumptionLevel = 'moderate',
): Calculations {
  const isVeganOnly = user.vegan > 0 && user.men + user.women + user.children === 0
  const veganCalculations = {
    lentilBurgers: user.vegan * 2,
    marinatedTofu: Number((user.vegan * 0.2).toFixed(1)),
    veganCost: user.vegan * 6000, // Reduced cost since we removed grilled vegetables
  }

  // Consumption multipliers based on consumption level
  const consumptionMultipliers = {
    light: 0.7,
    moderate: 1.0,
    high: 1.5,
  }

  const multiplier = consumptionMultipliers[drinkConsumptionLevel]

  // Calculate drinks based on the consumption table and consumption level
  const drinkCalculations = {
    beer: Math.round((user.men * 750 + user.women * 500 + user.vegan * 500) * multiplier), // ml per person (reducido a la mitad)
    wine: Math.round((user.men + user.women + user.vegan) * 250 * multiplier), // ml per person (reducido a la mitad)
    soda: Math.round(
      (user.men * 375 + user.women * 375 + user.children * 250 + user.vegan * 375) * multiplier,
    ), // ml per person (reducido a la mitad)
  }

  return {
    meat: Number((user.men * 0.35 + user.women * 0.25 + user.children * 0.2).toFixed(1)),
    sausage: Number((user.men * 0.15 + user.women * 0.1 + user.children * 0.1).toFixed(1)),
    bread: Number((user.men * 0.16666 + user.women * 0.16666 + user.children * 0.08333).toFixed(1)),
    vegetables: Number(
      (user.men * 0.2 + user.women * 0.15 + user.children * 0.15 + user.vegan * 0.15).toFixed(1),
    ),
    ...drinkCalculations,
    carbon: function (isSausageSelected: boolean) {
      if (isVeganOnly) {
        // For vegan-only: 0.6kg carbon per kg of vegetables (if vegetables are selected)
        return Number((this.vegetables * 0.6).toFixed(1))
      }
      // For regular asados: 1.2kg carbon per kg of meat + sausage
      return Number(((this.meat + (isSausageSelected ? this.sausage : 0)) * 1.2).toFixed(1))
    },
    totalPrice: function (params: {
      budgetSelected: {
        id: number
        name: string
        meats: {
          id: string
          name: string
          values: {
            lider: { price: { normal: number | null; promo: number | null } }
            jumbo: { price: { normal: number | null; promo: number | null } }
          }
        }[]
        sausage: { name: string; priceLider: number; priceJumbo: number }
        carbon: { name: string; priceLider: number; priceJumbo: number }
        bread: { name: string; priceLider: number; priceJumbo: number }
        vegetables: { name: string; priceLider: number; priceJumbo: number }
        beverages: {
          beer: { name: string; pricePerMl: number }
          wine: { name: string; pricePerMl: number }
          soda: { name: string; pricePerMl: number }
        }
      } | null
      isSausageSelected: boolean
      isCarbonSelected: boolean
      isVegetablesSelected: boolean
      includeBeer: boolean
      includeWine: boolean
      includeSoda: boolean
    }) {
      const {
        budgetSelected,
        isSausageSelected,
        isCarbonSelected,
        isVegetablesSelected,
        includeBeer,
        includeWine,
        includeSoda,
      } = params

      if (!budgetSelected) return 0

      const meatPrice =
        this.meat *
        (budgetSelected.meats.reduce(
          (acc, meat) =>
            acc +
            ((meat.values.lider.price.normal || 0) + (meat.values.jumbo.price.normal || 0)) / 2,
          0,
        ) /
          budgetSelected.meats.length)

      const sausagePrice = isSausageSelected
        ? this.sausage *
            ((budgetSelected.sausage.priceLider + budgetSelected.sausage.priceJumbo) / 2) +
          this.bread * ((budgetSelected.bread.priceLider + budgetSelected.bread.priceJumbo) / 2)
        : 0

      const carbonPrice = isCarbonSelected
        ? this.carbon(isSausageSelected) *
          (budgetSelected
            ? (budgetSelected.carbon.priceLider + budgetSelected.carbon.priceJumbo) / 2
            : 3000) // Default price for vegan-only users
        : 0

      const vegetablesPrice = isVegetablesSelected
        ? this.vegetables *
          (budgetSelected
            ? (budgetSelected.vegetables.priceLider + budgetSelected.vegetables.priceJumbo) / 2
            : 3000) // Default price for vegan-only users
        : 0

      // Calculate drink prices using the pricePerMl from the selected budget
      const beerPrice = includeBeer
        ? this.beer * (budgetSelected ? budgetSelected.beverages.beer.pricePerMl : 0.002)
        : 0
      const winePrice = includeWine
        ? this.wine * (budgetSelected ? budgetSelected.beverages.wine.pricePerMl : 0.01)
        : 0
      const sodaPrice = includeSoda
        ? this.soda * (budgetSelected ? budgetSelected.beverages.soda.pricePerMl : 0.001)
        : 0

      const veganCost = veganCalculations.veganCost

      return (
        Math.round(
          (meatPrice +
            sausagePrice +
            carbonPrice +
            vegetablesPrice +
            beerPrice +
            winePrice +
            sodaPrice +
            veganCost) /
            10,
        ) * 10
      )
    },
    pricePerAdult: function (totalPrice: number, adults: number) {
      return Math.round(totalPrice / adults / 10) * 10
    },
    separateVeganPricing: function (params: {
      budgetSelected: {
        id: number
        name: string
        meats: {
          id: string
          name: string
          values: {
            lider: { price: { normal: number | null; promo: number | null } }
            jumbo: { price: { normal: number | null; promo: number | null } }
          }
        }[]
        sausage: { name: string; priceLider: number; priceJumbo: number }
        carbon: { name: string; priceLider: number; priceJumbo: number }
        bread: { name: string; priceLider: number; priceJumbo: number }
        vegetables: { name: string; priceLider: number; priceJumbo: number }
        beverages: {
          beer: { name: string; pricePerMl: number }
          wine: { name: string; pricePerMl: number }
          soda: { name: string; pricePerMl: number }
        }
      } | null
      isSausageSelected: boolean
      isCarbonSelected: boolean
      isVegetablesSelected: boolean
      includeBeer: boolean
      includeWine: boolean
      includeSoda: boolean
      veganCount: number
    }) {
      const {
        budgetSelected,
        isSausageSelected,
        isCarbonSelected,
        isVegetablesSelected,
        includeBeer,
        includeWine,
        includeSoda,
        veganCount,
      } = params

      if (veganCount === 0)
        return { veganTotal: 0, nonVeganTotal: this.totalPrice(params), veganPerPerson: 0 }

      // Calculate vegan-specific costs
      const veganVegetables = veganCount * 0.15 // 0.15kg per vegan
      const veganCarbonAmount = isCarbonSelected ? veganVegetables * 0.6 : 0
      const veganBeer = includeBeer ? veganCount * 500 : 0 // 500ml per vegan
      const veganWine = includeWine ? veganCount * 250 : 0 // 250ml per vegan
      const veganSoda = includeSoda ? veganCount * 375 : 0 // 375ml per vegan

      const veganVegetablesPrice = isVegetablesSelected
        ? veganVegetables *
          (budgetSelected
            ? (budgetSelected.vegetables.priceLider + budgetSelected.vegetables.priceJumbo) / 2
            : 3000)
        : 0

      const veganCarbonPrice = isCarbonSelected
        ? veganCarbonAmount *
          (budgetSelected
            ? (budgetSelected.carbon.priceLider + budgetSelected.carbon.priceJumbo) / 2
            : 3000)
        : 0

      const veganBeerPrice = includeBeer
        ? veganBeer * (budgetSelected ? budgetSelected.beverages.beer.pricePerMl : 0.002)
        : 0
      const veganWinePrice = includeWine
        ? veganWine * (budgetSelected ? budgetSelected.beverages.wine.pricePerMl : 0.01)
        : 0
      const veganSodaPrice = includeSoda
        ? veganSoda * (budgetSelected ? budgetSelected.beverages.soda.pricePerMl : 0.001)
        : 0

      const veganOptionsPrice = veganCalculations.veganCost

      const veganTotal =
        Math.round(
          (veganVegetablesPrice +
            veganCarbonPrice +
            veganBeerPrice +
            veganWinePrice +
            veganSodaPrice +
            veganOptionsPrice) /
            10,
        ) * 10

      // Calculate non-vegan costs (excluding vegan portions)
      const originalTotal = this.totalPrice(params)
      const nonVeganTotal = originalTotal - veganTotal

      return {
        veganTotal,
        nonVeganTotal,
        veganPerPerson: Math.round(veganTotal / veganCount / 10) * 10,
      }
    },
    ...veganCalculations,
  }
}
