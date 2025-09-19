export interface Meat {
  name: string
  value: number
}

export interface Budget {
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
  sausagePrice: number
  vegetablesPrice: number
}

export interface User {
  men: number
  women: number
  children: number
  vegan: number
}
