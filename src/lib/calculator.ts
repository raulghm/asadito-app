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
          lider: { price: { normal: number; promo: number } }
          jumbo: { price: { normal: number; promo: number } }
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
  /** Amount of grilled vegetables in kilograms needed for vegan guests */
  grilledVegetables: number
  /** Amount of marinated tofu in kilograms needed for vegan guests */
  marinatedTofu: number
  /** Total cost for vegan options in Chilean pesos */
  veganCost: number
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
  const veganCalculations = {
    lentilBurgers: user.vegan * 2,
    grilledVegetables: user.vegan * 0.3,
    marinatedTofu: user.vegan * 0.2,
    veganCost: user.vegan * 8000,
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
    beer: Math.round((user.men * 750 + user.women * 500) * multiplier), // ml per person (reducido a la mitad)
    wine: Math.round((user.men + user.women) * 250 * multiplier), // ml per person (reducido a la mitad)
    soda: Math.round((user.men * 375 + user.women * 375 + user.children * 250) * multiplier), // ml per person (reducido a la mitad)
  }

  return {
    meat: Number((user.men * 0.35 + user.women * 0.25 + user.children * 0.2).toFixed(1)),
    sausage: Number((user.men * 0.15 + user.women * 0.1 + user.children * 0.1).toFixed(1)),
    bread: Number((user.men * 0.16666 + user.women * 0.16666 + user.children * 0.08333).toFixed(1)),
    vegetables: Number((user.men * 0.2 + user.women * 0.15 + user.children * 0.15).toFixed(1)),
    ...drinkCalculations,
    carbon: function (isSausageSelected: boolean) {
      return Number((this.meat + (isSausageSelected ? this.sausage : 0)).toFixed(1))
    },
    totalPrice: function (params: {
      budgetSelected: {
        id: number
        name: string
        meats: {
          id: string
          name: string
          values: {
            lider: { price: { normal: number; promo: number } }
            jumbo: { price: { normal: number; promo: number } }
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
            acc + (meat.values.lider.price.normal + meat.values.jumbo.price.normal) / 2,
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
          ((budgetSelected.carbon.priceLider + budgetSelected.carbon.priceJumbo) / 2)
        : 0

      const vegetablesPrice = isVegetablesSelected
        ? this.vegetables *
          ((budgetSelected.vegetables.priceLider + budgetSelected.vegetables.priceJumbo) / 2)
        : 0

      // Calculate drink prices using the pricePerMl from the selected budget
      const beerPrice = includeBeer ? this.beer * budgetSelected.beverages.beer.pricePerMl : 0
      const winePrice = includeWine ? this.wine * budgetSelected.beverages.wine.pricePerMl : 0
      const sodaPrice = includeSoda ? this.soda * budgetSelected.beverages.soda.pricePerMl : 0

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
    ...veganCalculations,
  }
}
