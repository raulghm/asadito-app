export interface Meat {
  name: string
  value: number
}

export interface Budget {
  id: number
  name: string
  meats: Meat[]
  sausagePrice: number
}

export interface User {
  men: number
  women: number
  children: number
}
