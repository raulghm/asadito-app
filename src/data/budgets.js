/**
 * Valores extraidos desde la web de supermercados Jumbo y Lider
 * promediando ambos valores.
 * Solo carnes al vacio y con precios normales.
 * Se segmentan presupuestos en base a sus valores.
 */
export const budgets = [
  {
    id: 0,
    name: 'Económico',
    meats: [
      {
        name: 'Abastero',
        value: 8990,
      },
      {
        name: 'Carnicero',
        value: 8490,
      },
      {
        name: 'Tapapecho',
        value: 7990,
      },
      {
        name: 'Tapabarriga',
        value: 8290,
      },
      {
        name: 'Asado de tira',
        value: 8990,
      },
      {
        name: 'Sobre costilla',
        value: 7990,
      },
      {
        name: 'Huachalomo',
        value: 7490,
      },
      {
        name: 'Punta paleta',
        value: 7990,
      },
    ],
    sausage: 'Chorizos o salchichas',
    sausagePrice: 4990,
  },
  {
    id: 1,
    name: 'Medio',
    meats: [
      {
        name: 'Plateada',
        value: 9990,
      },
      {
        name: 'Punta picana',
        value: 10990,
      },
      {
        name: 'Asiento',
        value: 11490,
      },
      {
        name: 'Lomo liso',
        value: 11990,
      },
      {
        name: 'Punta de ganso',
        value: 12490,
      },
      {
        name: 'Malaya',
        value: 11990,
      },
    ],
    sausage: 'Chorizos',
    sausagePrice: 5990,
  },
  {
    id: 2,
    name: 'Alto',
    meats: [
      {
        name: 'Lomo vetado',
        value: 13990,
      },
      {
        name: 'Palanca',
        value: 14990,
      },
      {
        name: 'Filete',
        value: 15990,
      },
      {
        name: 'Entraña',
        value: 16990,
      },
    ],
    sausage: 'Longanizas',
    sausagePrice: 7990,
  },
  {
    id: 3,
    name: 'Premium',
    meats: [
      {
        name: 'Wagyu',
        value: 29990,
      },
      {
        name: 'Angus',
        value: 34990,
      },
      {
        name: 'Filete premium',
        value: 24990,
      },
      {
        name: 'Lomo vetado premium',
        value: 22990,
      },
      {
        name: 'Otros cortes premium',
        value: 23990,
      },
    ],
    sausage: 'Longanizas premium',
    sausagePrice: 11990,
  },
]
