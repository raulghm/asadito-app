interface DrinksCalculatorProps {
  adults: number
  duration: number // horas
  consumptionLevel: 'light' | 'moderate' | 'high'
}

export function DrinksCalculator({ adults, duration, consumptionLevel }: DrinksCalculatorProps) {
  const consumptionMultipliers = {
    light: 0.7,
    moderate: 1.0,
    high: 1.5,
  }

  const multiplier = consumptionMultipliers[consumptionLevel]

  const calculations = {
    beer: Math.ceil(adults * duration * 0.75 * multiplier), // botellas por persona por hora
    wine: Math.ceil((adults * duration * 0.5 * multiplier) / 8), // botellas de vino (8 copas por botella)
    soda: Math.ceil((adults * duration * 0.5 * multiplier) / 6), // botellas de 2L (6 vasos por botella)
  }

  const consumptionLevelLabels = {
    light: 'Ligero (70%)',
    moderate: 'Moderado (100%)',
    high: 'Alto (150%)',
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-base font-medium">Bebidas 🥤</h4>
        <span className="text-sm text-amber-200">{consumptionLevelLabels[consumptionLevel]}</span>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-lg border-2 border-amber-900 p-4 text-white">
          <p className="mb-1 text-sm">Cerveza</p>
          <p className="text-xl font-semibold">{calculations.beer} botellas</p>
        </div>
        <div className="rounded-lg border-2 border-amber-900 p-4 text-white">
          <p className="mb-1 text-sm">Vino</p>
          <p className="text-xl font-semibold">{calculations.wine} botellas</p>
        </div>
        <div className="rounded-lg border-2 border-amber-900 p-4 text-white">
          <p className="mb-1 text-sm">Gaseosas</p>
          <p className="text-xl font-semibold">{calculations.soda} botellas 2L</p>
        </div>
      </div>
    </div>
  )
}
