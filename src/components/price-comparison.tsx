'use client'

import { motion } from 'framer-motion'

import { Card } from '~/components/ui/card'
import { formatPrice } from '~/lib/utils'
import { Budget } from '~/types/types'

interface PriceComparisonProps {
  budget: Budget
  meatQuantity: number
}

interface BestPrice {
  store: 'lider' | 'jumbo'
  price: number
  isPromo: boolean
  savings: number
  savingsPercentage: number
}

function findBestPrice(
  normalLider: number,
  promoLider: number,
  normalJumbo: number,
  promoJumbo: number,
): BestPrice {
  const prices = [
    { store: 'lider' as const, price: normalLider, isPromo: false },
    { store: 'lider' as const, price: promoLider, isPromo: true },
    { store: 'jumbo' as const, price: normalJumbo, isPromo: false },
    { store: 'jumbo' as const, price: promoJumbo, isPromo: true },
  ].filter((p) => p.price > 0) // Filtrar precios en 0

  if (prices.length === 0) {
    return { store: 'lider', price: 0, isPromo: false, savings: 0, savingsPercentage: 0 }
  }

  const bestPrice = prices.reduce((min, current) => (current.price < min.price ? current : min))

  // Calcular ahorro comparado con el precio más alto
  const maxPrice = Math.max(...prices.map((p) => p.price))
  const savings = maxPrice - bestPrice.price
  const savingsPercentage = maxPrice > 0 ? (savings / maxPrice) * 100 : 0

  return {
    ...bestPrice,
    savings,
    savingsPercentage,
  }
}

export function PriceComparison({ budget, meatQuantity }: PriceComparisonProps) {
  const meatPrices = budget.meats.map((meat) => {
    const bestPrice = findBestPrice(
      meat.values.lider.price.normal || 0,
      meat.values.lider.price.promo || 0,
      meat.values.jumbo.price.normal || 0,
      meat.values.jumbo.price.promo || 0,
    )

    return {
      meat,
      bestPrice,
      totalCost: bestPrice.price * meatQuantity,
    }
  })

  const totalSavings = meatPrices.reduce(
    (sum, item) => sum + item.bestPrice.savings * meatQuantity,
    0,
  )
  const averageSavingsPercentage =
    meatPrices.length > 0
      ? meatPrices.reduce((sum, item) => sum + item.bestPrice.savingsPercentage, 0) /
        meatPrices.length
      : 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-4"
    >
      <div className="flex items-center gap-2">
        <h4 className="font-serif text-lg font-semibold">💰 Mejores Precios por Corte</h4>
        {averageSavingsPercentage > 0 && (
          <span className="rounded-full bg-green-500/20 px-2 py-1 text-xs font-medium text-green-400">
            Ahorro promedio: {averageSavingsPercentage.toFixed(1)}%
          </span>
        )}
      </div>

      <div className="grid gap-3">
        {meatPrices.map(({ meat, bestPrice, totalCost }) => (
          <Card key={meat.id} className="border-2 p-4">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h5 className="font-medium text-white">{meat.name}</h5>
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <span
                    className={`inline-flex items-center gap-1 rounded px-2 py-1 text-xs font-medium ${
                      bestPrice.store === 'lider'
                        ? 'bg-blue-500/20 text-blue-400'
                        : 'bg-red-500/20 text-red-400'
                    }`}
                  >
                    {bestPrice.store === 'lider' ? '🏪 Lider' : '🏬 Jumbo'}
                  </span>
                  {bestPrice.isPromo && (
                    <span className="inline-flex items-center gap-1 rounded bg-orange-500/20 px-2 py-1 text-xs font-medium text-orange-400">
                      🔥 Promo
                    </span>
                  )}
                </div>
              </div>

              <div className="text-right">
                <div className="text-lg font-bold text-white">
                  ${formatPrice(bestPrice.price)}/kg
                </div>
                <div className="text-sm text-gray-400">Total: ${formatPrice(totalCost)}</div>
                {bestPrice.savings > 0 && (
                  <div className="text-xs text-green-400">
                    Ahorras: ${formatPrice(bestPrice.savings * meatQuantity)}
                  </div>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {totalSavings > 0 && (
        <motion.div
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          className="rounded-lg border-2 border-green-500/30 bg-green-500/10 p-4"
        >
          <div className="flex items-center justify-between">
            <div>
              <h5 className="font-semibold text-green-400">🎉 Ahorro Total Estimado</h5>
              <p className="text-sm text-gray-300">
                Comprando en los supermercados más convenientes
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-green-400">${formatPrice(totalSavings)}</div>
              <div className="text-sm text-green-300">
                {averageSavingsPercentage.toFixed(1)}% de ahorro
              </div>
            </div>
          </div>
        </motion.div>
      )}

      <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-3">
        <div className="flex items-start gap-2">
          <span className="text-amber-400">💡</span>
          <div className="text-sm text-amber-200">
            <p className="font-medium">Consejo de ahorro:</p>
            <p>
              Los precios mostrados son los más convenientes entre Lider y Jumbo, incluyendo
              promociones. Revisa las ofertas actuales en cada supermercado para maximizar tu
              ahorro.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
