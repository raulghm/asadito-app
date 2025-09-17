/**
 * Valores extraidos desde la web de supermercados Jumbo y Lider
 * promediando ambos valores.
 * Solo carnes al vacio y con precios normales.
 * Se segmentan presupuestos en base a sus valores.
 */
export const budgets = [
  {
    id: 0,
    name: 'Económico 🪙',
    meats: [
      { name: 'Carnicero', valueLider: 7790, valueJumbo: 8690 },
      { name: 'Sobre costilla', valueLider: 8760, valueJumbo: 8690 },
      { name: 'Tapapecho', valueLider: 8890, valueJumbo: 8690 },
      { name: 'Abastero', valueLider: 9390, valueJumbo: 8690 },
      { name: 'Huachalomo', valueLider: 7790, valueJumbo: 10290 },
      { name: 'Tapabarriga', valueLider: 11190, valueJumbo: 9690 },
    ],
    sausage: {
      name: 'Chorizos o salchichas 🌭',
      priceLider: 4390,
      priceJumbo: 4490,
    },
    carbon: {
      name: 'Carbon 🔥',
      priceLider: 3500,
      priceJumbo: 3500,
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
      { name: 'Punta paleta', valueLider: 8990, valueJumbo: 10590 },
      { name: 'Plateada', valueLider: 10390, valueJumbo: 11290 },
      { name: 'Punta picana', valueLider: 12290, valueJumbo: 13490 },
      { name: 'Malaya Cerdo', valueLider: 12390, valueJumbo: 13890 },
      { name: 'Asado de tira', valueLider: 14990, valueJumbo: 12590 },
      { name: 'Asiento', valueLider: 13190, valueJumbo: 14590 },
    ],
    sausage: {
      name: 'Chorizos o salchichas',
      priceLider: 4390,
      priceJumbo: 4490,
    },
    carbon: {
      name: 'Carbon',
      priceLider: 3500,
      priceJumbo: 3500,
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
      { name: 'Punta de ganso', valueLider: 13990, valueJumbo: 14990 },
      { name: 'Lomo liso', valueLider: 11990, valueJumbo: 16990 },
      { name: 'Palanca', valueLider: 13990, valueJumbo: 14990 },
      { name: 'Lomo vetado', valueLider: 12990, valueJumbo: 17990 },
      { name: 'Filete', valueLider: 14990, valueJumbo: 18990 },
      { name: 'Entraña', valueLider: 17990, valueJumbo: 18990 },
    ],
    sausage: {
      name: 'Longanizas',
      priceLider: 7990,
      priceJumbo: 7990,
    },
    carbon: {
      name: 'Carbon',
      priceLider: 3500,
      priceJumbo: 3500,
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
      { name: 'Lomo vetado premium', valueLider: 22990, valueJumbo: 32990 },
      { name: 'Otros cortes premium', valueLider: 23990, valueJumbo: 33990 },
      { name: 'Filete premium', valueLider: 24990, valueJumbo: 34990 },
      { name: 'Wagyu', valueLider: 29990, valueJumbo: 39990 },
      { name: 'Angus', valueLider: 34990, valueJumbo: 44990 },
    ],
    sausage: {
      name: 'Longanizas premium',
      priceLider: 11990,
      priceJumbo: 11990,
    },
    carbon: {
      name: 'Carbon',
      priceLider: 3500,
      priceJumbo: 3500,
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
