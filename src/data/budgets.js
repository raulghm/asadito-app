/**
 * Valores extraidos desde la web de supermercados Jumbo y Lider
 * promediando ambos valores.
 * Solo carnes al vacio y con precios normales.
 * Se segmentan presupuestos en base a sus valores.
 * Última actualización: 2025-09-19T12:59:08.455Z
 */

// Fecha de última actualización de precios
export const lastUpdated = '2025-09-19T12:59:08.455Z'

export const budgets = [
  {
    id: 0,
    name: 'Económico 🪙',
    meats: [
      {
        id: 'carnicero',
        name: 'Carnicero',
        values: {
          lider: {
            price: {
              normal: 8990,
              promo: 6990,
            },
          },
          jumbo: {
            price: {
              normal: 10790,
              promo: 7990,
            },
          },
        },
      },
      {
        id: 'sobre-costilla',
        name: 'Sobre costilla',
        values: {
          lider: {
            price: {
              normal: 8990,
              promo: 6990,
            },
          },
          jumbo: {
            price: {
              normal: 10790,
              promo: 7990,
            },
          },
        },
      },
      {
        id: 'tapapecho',
        name: 'Tapapecho',
        values: {
          lider: {
            price: {
              normal: 8490,
              promo: 6990,
            },
          },
          jumbo: {
            price: {
              normal: 9990,
              promo: 8990,
            },
          },
        },
      },
      {
        id: 'abastero',
        name: 'Abastero',
        values: {
          lider: {
            price: {
              normal: 8990,
              promo: 6990,
            },
          },
          jumbo: {
            price: {
              normal: 10790,
              promo: 7990,
            },
          },
        },
      },
      {
        id: 'huachalomo',
        name: 'Huachalomo',
        values: {
          lider: {
            price: {
              normal: 9990,
              promo: 6990,
            },
          },
          jumbo: {
            price: {
              normal: 10790,
              promo: 7990,
            },
          },
        },
      },
      {
        id: 'tapabarriga',
        name: 'Tapabarriga',
        values: {
          lider: {
            price: {
              normal: 7990,
              promo: 6990,
            },
          },
          jumbo: {
            price: {
              normal: 12190,
              promo: 0,
            },
          },
        },
      },
    ],
    sausage: {
      name: 'Chorizos o salchichas 🌭',
      priceLider: 4390,
      priceJumbo: 4490,
    },
    carbon: {
      name: 'Carbon 🔥',
      priceLider: 1596,
      priceJumbo: 1596,
    },
    bread: {
      name: 'Pan 🍞',
      priceLider: 1100,
      priceJumbo: 1100,
    },
    vegetables: {
      name: 'Vegetales 🥗',
      priceLider: 1976,
      priceJumbo: 1976,
    },
    beverages: {
      beer: {
        name: 'Cerveza 🍺',
        pricePerMl: 2.75,
      },
      wine: {
        name: 'Vino 🍷',
        pricePerMl: 9.32,
      },
      soda: {
        name: 'Bebidas/Jugos 🥤',
        pricePerMl: 1.1,
      },
    },
  },
  {
    id: 1,
    name: 'Medio 💰',
    meats: [
      {
        id: 'punta-paleta',
        name: 'Punta paleta',
        values: {
          lider: {
            price: {
              normal: 9990,
              promo: 9990,
            },
          },
          jumbo: {
            price: {
              normal: 0,
              promo: 0,
            },
          },
        },
      },
      {
        id: 'plateada',
        name: 'Plateada',
        values: {
          lider: {
            price: {
              normal: 10290,
              promo: 10290,
            },
          },
          jumbo: {
            price: {
              normal: 10590,
              promo: 11290,
            },
          },
        },
      },
      {
        id: 'punta-picana',
        name: 'Punta picana',
        values: {
          lider: {
            price: {
              normal: 11590,
              promo: 11590,
            },
          },
          jumbo: {
            price: {
              normal: 13490,
              promo: 14690,
            },
          },
        },
      },
      {
        id: 'asado-de-tira',
        name: 'Asado de tira',
        values: {
          lider: {
            price: {
              normal: 7990,
              promo: 6990,
            },
          },
          jumbo: {
            price: {
              normal: 12590,
              promo: 12590,
            },
          },
        },
      },
      {
        id: 'asiento',
        name: 'Asiento',
        values: {
          lider: {
            price: {
              normal: 13190,
              promo: 13190,
            },
          },
          jumbo: {
            price: {
              normal: 14590,
              promo: 14590,
            },
          },
        },
      },
    ],
    sausage: {
      name: 'Chorizos o salchichas',
      priceLider: 4390,
      priceJumbo: 4490,
    },
    carbon: {
      name: 'Carbon',
      priceLider: 1596,
      priceJumbo: 1596,
    },
    bread: {
      name: 'Pan',
      priceLider: 1100,
      priceJumbo: 1100,
    },
    vegetables: {
      name: 'Vegetales',
      priceLider: 1976,
      priceJumbo: 1976,
    },
    beverages: {
      beer: {
        name: 'Cerveza',
        pricePerMl: 2.75,
      },
      wine: {
        name: 'Vino',
        pricePerMl: 9.32,
      },
      soda: {
        name: 'Gaseosa',
        pricePerMl: 1.1,
      },
    },
  },
  {
    id: 2,
    name: 'Alto 💸',
    meats: [
      {
        id: 'punta-de-ganso',
        name: 'Punta de ganso',
        values: {
          lider: {
            price: {
              normal: 13690,
              promo: 13690,
            },
          },
          jumbo: {
            price: {
              normal: 14990,
              promo: 14990,
            },
          },
        },
      },
      {
        id: 'lomo-liso',
        name: 'Lomo liso',
        values: {
          lider: {
            price: {
              normal: 14590,
              promo: 11990,
            },
          },
          jumbo: {
            price: {
              normal: 16990,
              promo: 16990,
            },
          },
        },
      },
      {
        id: 'palanca',
        name: 'Palanca',
        values: {
          lider: {
            price: {
              normal: 7990,
              promo: 6990,
            },
          },
          jumbo: {
            price: {
              normal: 14990,
              promo: 14990,
            },
          },
        },
      },
      {
        id: 'lomo-vetado',
        name: 'Lomo vetado',
        values: {
          lider: {
            price: {
              normal: 15390,
              promo: 12990,
            },
          },
          jumbo: {
            price: {
              normal: 17990,
              promo: 17990,
            },
          },
        },
      },
      {
        id: 'filete',
        name: 'Filete',
        values: {
          lider: {
            price: {
              normal: 16690,
              promo: 13990,
            },
          },
          jumbo: {
            price: {
              normal: 18990,
              promo: 18990,
            },
          },
        },
      },
      {
        id: 'entrana',
        name: 'Entraña',
        values: {
          lider: {
            price: {
              normal: 25990,
              promo: 22990,
            },
          },
          jumbo: {
            price: {
              normal: 28990,
              promo: 18990,
            },
          },
        },
      },
    ],
    sausage: {
      name: 'Longanizas',
      priceLider: 7990,
      priceJumbo: 7990,
    },
    carbon: {
      name: 'Carbon',
      priceLider: 1596,
      priceJumbo: 1596,
    },
    bread: {
      name: 'Pan',
      priceLider: 1100,
      priceJumbo: 1100,
    },
    vegetables: {
      name: 'Vegetales',
      priceLider: 1976,
      priceJumbo: 1976,
    },
    beverages: {
      beer: {
        name: 'Cerveza',
        pricePerMl: 2.75,
      },
      wine: {
        name: 'Vino',
        pricePerMl: 9.32,
      },
      soda: {
        name: 'Gaseosa',
        pricePerMl: 1.1,
      },
    },
  },
  {
    id: 3,
    name: 'Premium 💎',
    meats: [
      {
        id: 'lomo-vetado-premium',
        name: 'Lomo vetado premium',
        values: {
          lider: {
            price: {
              normal: 7990,
              promo: 6990,
            },
          },
          jumbo: {
            price: {
              normal: 32990,
              promo: 32990,
            },
          },
        },
      },
      {
        id: 'otros-cortes-premium',
        name: 'Otros cortes premium',
        values: {
          lider: {
            price: {
              normal: 23990,
              promo: 23990,
            },
          },
          jumbo: {
            price: {
              normal: 33990,
              promo: 33990,
            },
          },
        },
      },
      {
        id: 'filete-premium',
        name: 'Filete premium',
        values: {
          lider: {
            price: {
              normal: 24990,
              promo: 24990,
            },
          },
          jumbo: {
            price: {
              normal: 34990,
              promo: 34990,
            },
          },
        },
      },
      {
        id: 'wagyu',
        name: 'Wagyu',
        values: {
          lider: {
            price: {
              normal: 29990,
              promo: 29990,
            },
          },
          jumbo: {
            price: {
              normal: 39990,
              promo: 39990,
            },
          },
        },
      },
      {
        id: 'angus',
        name: 'Angus',
        values: {
          lider: {
            price: {
              normal: 34990,
              promo: 34990,
            },
          },
          jumbo: {
            price: {
              normal: 44990,
              promo: 44990,
            },
          },
        },
      },
    ],
    sausage: {
      name: 'Longanizas premium',
      priceLider: 11990,
      priceJumbo: 11990,
    },
    carbon: {
      name: 'Carbon',
      priceLider: 1596,
      priceJumbo: 1596,
    },
    bread: {
      name: 'Pan',
      priceLider: 1100,
      priceJumbo: 1100,
    },
    vegetables: {
      name: 'Vegetales',
      priceLider: 1976,
      priceJumbo: 1976,
    },
    beverages: {
      beer: {
        name: 'Cerveza',
        pricePerMl: 2.75,
      },
      wine: {
        name: 'Vino',
        pricePerMl: 9.32,
      },
      soda: {
        name: 'Gaseosa',
        pricePerMl: 1.1,
      },
    },
  },
]
