'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

import { ExportButtons } from '~/components/export-buttons'
import { Footer } from '~/components/footer'
import { Header } from '~/components/header'
import { Hero } from '~/components/hero'
import { ShoppingList } from '~/components/shopping-list'
import { Card } from '~/components/ui/card'
import { Checkbox } from '~/components/ui/checkbox'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select'
import { budgets } from '~/data/budgets'
import { useAsadoStore } from '~/hooks/use-asado-store'
import { useFavoritesStore } from '~/hooks/use-favorites-store'
import { calculateAsado } from '~/lib/calculator'
import { formatPrice } from '~/lib/utils'
import { Budget } from '~/types/types'

// Transform budget data to match the Budget interface
function transformBudget(budget: (typeof budgets)[0]): Budget {
  return {
    id: budget.id,
    name: budget.name,
    meats: budget.meats,
    sausage: budget.sausage,
    carbon: budget.carbon,
    bread: budget.bread,
    vegetables: budget.vegetables,
    beverages: budget.beverages,
    sausagePrice: (budget.sausage.priceLider + budget.sausage.priceJumbo) / 2,
    vegetablesPrice: (budget.vegetables.priceLider + budget.vegetables.priceJumbo) / 2,
  }
}

// Transform budget data to match the expected structure for totalPrice
function transformBudgetForTotalPrice(budget: (typeof budgets)[0]) {
  return {
    id: budget.id,
    name: budget.name,
    meats: budget.meats,
    sausage: budget.sausage,
    carbon: budget.carbon,
    bread: budget.bread,
    vegetables: budget.vegetables,
    beverages: budget.beverages,
  }
}

export default function Page() {
  const {
    user,
    setUser,
    budgetSelected,
    setBudgetSelected,
    toggleSausage,
    toggleCarbon,
    toggleVegetables,
    isSausageSelected,
    isCarbonSelected,
    isVegetablesSelected,
    includeBeer,
    includeWine,
    includeSoda,
    toggleBeer,
    toggleWine,
    toggleSoda,
    drinkConsumptionLevel,
    setDrinkConsumptionLevel,
  } = useAsadoStore()

  const { favorites, removeFavorite } = useFavoritesStore()

  const peopleCount = user.men + user.women + user.children

  const calculations = calculateAsado(user, drinkConsumptionLevel)
  const totalPrice = calculations.totalPrice({
    budgetSelected: budgetSelected
      ? transformBudgetForTotalPrice(budgets.find((b) => b.id === budgetSelected.id)!)
      : null,
    isSausageSelected,
    isCarbonSelected,
    isVegetablesSelected,
    includeBeer,
    includeWine,
    includeSoda,
  })
  const pricePerAdult = calculations.pricePerAdult(totalPrice, user.men + user.women + user.vegan)

  // Background image state for client-side hydration
  const [backgroundImage, setBackgroundImage] = useState('0.jpg')

  useEffect(() => {
    // Only run on client side to avoid hydration mismatch
    setBackgroundImage(`${Math.floor(Math.random() * 7)}.jpg`)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="relative flex min-h-screen flex-col"
    >
      {/* Background Image */}
      <div
        className="fixed inset-0 -z-10 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url("/images/background/${backgroundImage}")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />

      {/* Blur Overlay */}
      <div className="fixed inset-0 -z-10 bg-black/10 backdrop-blur-sm" />

      {/* Gradient Overlay */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-b from-background/70 to-background/80 dark:from-background/60 dark:via-background/80 dark:to-background/90" />

      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex flex-1">
        <div className="mx-auto w-full max-w-3xl p-4 py-12">
          <Hero />

          <div className="grid gap-8">
            <div className="mx-auto w-full max-w-3xl">
              <Card className="mb-8 rounded-3xl p-10 drop-shadow-xl">
                <div className="p-2 md:p-6">
                  <div className="relative">
                    <h3 className="mb-6 flex items-center gap-2 font-serif text-xl">
                      <span className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                        1
                      </span>
                      Ingresa la cantidad de comensales
                    </h3>

                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                      <div className="space-y-2">
                        <label htmlFor="men" className="text-sm font-medium">
                          Hombres 👨
                        </label>
                        <div className="flex items-center overflow-hidden rounded-lg border-2 shadow-inner">
                          <button
                            type="button"
                            onClick={() => setUser({ ...user, men: Math.max(0, user.men - 1) })}
                            disabled={user.men === 0}
                            aria-label="Disminuir número de hombres"
                            className="px-4 py-3 text-lg font-bold outline-none transition-all duration-200 hover:bg-amber-900/20 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            -
                          </button>
                          <div className="flex-1 py-2 text-center font-handwritten text-4xl font-bold">
                            {user.men}
                          </div>
                          <button
                            type="button"
                            onClick={() => setUser({ ...user, men: Math.min(100, user.men + 1) })}
                            disabled={user.men >= 100}
                            aria-label="Aumentar número de hombres"
                            className="px-4 py-3 text-lg font-bold outline-none transition-all duration-200 hover:bg-amber-900/20 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="women" className="text-sm font-medium">
                          Mujeres 👩
                        </label>
                        <div className="flex items-center overflow-hidden rounded-lg border-2">
                          <button
                            type="button"
                            onClick={() => setUser({ ...user, women: Math.max(0, user.women - 1) })}
                            disabled={user.women === 0}
                            aria-label="Disminuir número de mujeres"
                            className="px-4 py-3 text-lg font-bold outline-none transition-all duration-200 hover:bg-amber-900/20 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            -
                          </button>
                          <div className="flex-1 py-2 text-center font-handwritten text-4xl font-bold">
                            {user.women}
                          </div>
                          <button
                            type="button"
                            onClick={() =>
                              setUser({ ...user, women: Math.min(100, user.women + 1) })
                            }
                            disabled={user.women >= 100}
                            aria-label="Aumentar número de mujeres"
                            className="px-4 py-3 text-lg font-bold outline-none transition-all duration-200 hover:bg-amber-900/20 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="children" className="text-sm font-medium">
                          Niños 👶
                        </label>
                        <div className="flex items-center overflow-hidden rounded-lg border-2">
                          <button
                            type="button"
                            onClick={() =>
                              setUser({ ...user, children: Math.max(0, user.children - 1) })
                            }
                            disabled={user.children === 0}
                            aria-label="Disminuir número de niños"
                            className="px-4 py-3 text-lg font-bold outline-none transition-all duration-200 hover:bg-amber-900/20 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            -
                          </button>
                          <div className="flex-1 py-2 text-center font-handwritten text-4xl font-bold">
                            {user.children}
                          </div>
                          <button
                            type="button"
                            onClick={() =>
                              setUser({ ...user, children: Math.min(100, user.children + 1) })
                            }
                            disabled={user.children >= 100}
                            aria-label="Aumentar número de niños"
                            className="px-4 py-3 text-lg font-bold outline-none transition-all duration-200 hover:bg-amber-900/20 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="vegan" className="text-sm font-medium">
                          Veganos 🥬
                        </label>
                        <div className="flex items-center overflow-hidden rounded-lg border-2">
                          <button
                            type="button"
                            onClick={() => setUser({ ...user, vegan: Math.max(0, user.vegan - 1) })}
                            disabled={user.vegan === 0}
                            aria-label="Disminuir número de veganos"
                            className="px-4 py-3 text-lg font-bold outline-none transition-all duration-200 hover:bg-amber-900/20 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            -
                          </button>
                          <div className="flex-1 py-2 text-center font-handwritten text-4xl font-bold">
                            {user.vegan}
                          </div>
                          <button
                            type="button"
                            onClick={() =>
                              setUser({ ...user, vegan: Math.min(100, user.vegan + 1) })
                            }
                            disabled={user.vegan >= 100}
                            aria-label="Aumentar número de veganos"
                            className="px-4 py-3 text-lg font-bold outline-none transition-all duration-200 hover:bg-amber-900/20 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {peopleCount > 0 && (
                    <div className="relative mt-12">
                      <h3 className="mb-6 flex items-center gap-2 font-serif text-xl">
                        <span className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                          2
                        </span>
                        Selecciona tu presupuesto
                      </h3>

                      <div className="space-y-4">
                        <Select
                          value={budgetSelected?.id !== undefined ? String(budgetSelected.id) : ''}
                          onValueChange={(value) =>
                            setBudgetSelected(
                              budgets.find((b) => b.id === Number(value))
                                ? transformBudget(budgets.find((b) => b.id === Number(value))!)
                                : null,
                            )
                          }
                        >
                          <SelectTrigger className="h-12 w-full border-2 text-white">
                            <SelectValue placeholder="Selecciona un presupuesto" />
                          </SelectTrigger>
                          <SelectContent className="border-2 ">
                            {budgets.map((budget) => (
                              <SelectItem
                                key={budget.id}
                                value={String(budget.id)}
                                className="hover:bg-amber-900/20"
                              >
                                {budget.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>

                        {budgetSelected && (
                          <div className="rounded-lg border p-5 text-white shadow-lg">
                            <p className="mb-2 font-serif text-sm font-medium">
                              Cortes recomendados:
                            </p>
                            <ul className="space-y-1 text-sm">
                              {budgetSelected.id === 0 && (
                                <>
                                  {budgetSelected.meats.map((meat) => (
                                    <li key={meat.name}>• {meat.name}</li>
                                  ))}
                                </>
                              )}
                              {budgetSelected.id === 1 && (
                                <>
                                  {budgetSelected.meats.map((meat) => (
                                    <li key={meat.name}>• {meat.name}</li>
                                  ))}
                                </>
                              )}
                              {budgetSelected.id === 2 && (
                                <>
                                  {budgetSelected.meats.map((meat) => (
                                    <li key={meat.name}>• {meat.name}</li>
                                  ))}
                                </>
                              )}
                              {budgetSelected.id === 3 && (
                                <>
                                  {budgetSelected.meats.map((meat) => (
                                    <li key={meat.name}>• {meat.name}</li>
                                  ))}
                                </>
                              )}
                            </ul>
                          </div>
                        )}

                        {budgetSelected && (
                          <div className="flex flex-col gap-2">
                            <div className="flex items-center space-x-2 rounded-lg px-3 py-2">
                              <Checkbox
                                id="sausage"
                                checked={isSausageSelected}
                                onCheckedChange={toggleSausage}
                                className="size-5"
                              />
                              <label htmlFor="sausage" className="text-sm font-medium">
                                Incluir embutidos + pan
                              </label>
                            </div>

                            <div className="flex items-center space-x-2 rounded-lg px-3 py-2">
                              <Checkbox
                                id="carbon"
                                checked={isCarbonSelected}
                                onCheckedChange={toggleCarbon}
                                className="size-5"
                              />
                              <label htmlFor="carbon" className="text-sm font-medium">
                                Incluir carbón
                              </label>
                            </div>

                            <div className="flex items-center space-x-2 rounded-lg px-3 py-2">
                              <Checkbox
                                id="vegetables"
                                checked={isVegetablesSelected}
                                onCheckedChange={toggleVegetables}
                                className="size-5"
                              />
                              <label htmlFor="vegetables" className="text-sm font-medium">
                                Incluir vegetales
                              </label>
                            </div>

                            <div className="mt-4 space-y-2">
                              <h3 className="mb-6 flex items-center gap-2 font-serif text-xl">
                                <span className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                                  3
                                </span>
                                Bebestibles
                              </h3>

                              <div className="space-y-2">
                                <label
                                  htmlFor="drinkConsumption"
                                  className="inline-block text-sm font-medium"
                                >
                                  Nivel de consumo
                                </label>
                                <div className="inline-block w-full md:ml-2 md:w-1/3">
                                  <Select
                                    value={drinkConsumptionLevel}
                                    onValueChange={(value) =>
                                      setDrinkConsumptionLevel(
                                        value as 'light' | 'moderate' | 'high',
                                      )
                                    }
                                  >
                                    <SelectTrigger className="w-full border-2  text-white">
                                      <SelectValue placeholder="Selecciona el nivel de consumo" />
                                    </SelectTrigger>
                                    <SelectContent className="border-2 ">
                                      <SelectItem value="light" className="hover:bg-amber-900/20">
                                        Ligero (70%) 🪙
                                      </SelectItem>
                                      <SelectItem
                                        value="moderate"
                                        className="hover:bg-amber-900/20"
                                      >
                                        Moderado (100%) 💰
                                      </SelectItem>
                                      <SelectItem value="high" className="hover:bg-amber-900/20">
                                        Alto (150%) 💸
                                      </SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>

                              <div className="flex items-center space-x-2 rounded-lg px-3 py-2">
                                <Checkbox
                                  id="beer"
                                  checked={includeBeer}
                                  onCheckedChange={toggleBeer}
                                  className="size-5"
                                />
                                <label htmlFor="beer" className="text-sm font-medium">
                                  Incluir cerveza
                                </label>
                              </div>
                              <div className="flex items-center space-x-2 rounded-lg px-3 py-2">
                                <Checkbox
                                  id="wine"
                                  checked={includeWine}
                                  onCheckedChange={toggleWine}
                                  className="size-5"
                                />
                                <label htmlFor="wine" className="text-sm font-medium">
                                  Incluir vino
                                </label>
                              </div>
                              <div className="flex items-center space-x-2 rounded-lg px-3 py-2">
                                <Checkbox
                                  id="soda"
                                  checked={includeSoda}
                                  onCheckedChange={toggleSoda}
                                  className="size-5"
                                />
                                <label htmlFor="soda" className="text-sm font-medium">
                                  Incluir bebidas/jugos
                                </label>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </Card>

              {peopleCount > 0 && budgetSelected && (
                <Card className="mb-8 p-10">
                  <div className="p-2 md:p-6">
                    <h3 className="mb-6 flex items-center gap-2 font-serif text-xl">
                      <span className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                        4
                      </span>
                      Resultados
                    </h3>

                    <div className="space-y-6">
                      <div className="rounded-lg border p-5 text-white shadow-lg">
                        <p className="mb-2 font-serif text-sm">Carne necesaria</p>
                        <p className="text-2xl font-bold">{calculations.meat}kg 🍖</p>
                      </div>

                      {isSausageSelected && (
                        <div className="grid grid-cols-2 gap-4">
                          <div className="rounded-lg border p-5 text-white shadow-lg">
                            <p className="mb-2 font-serif text-sm">Embutidos</p>
                            <p className="text-xl font-semibold">{calculations.sausage}kg</p>
                          </div>
                          <div className="rounded-lg border p-5 text-white shadow-lg">
                            <p className="mb-2 font-serif text-sm">Pan</p>
                            <p className="text-xl font-semibold">{calculations.bread}kg</p>
                          </div>
                        </div>
                      )}

                      {isVegetablesSelected && (
                        <div className="rounded-lg border p-5 text-white shadow-lg">
                          <p className="mb-2 font-serif text-sm">Vegetales</p>
                          <p className="text-xl font-semibold">{calculations.vegetables}kg</p>
                        </div>
                      )}

                      {user.vegan > 0 && (
                        <div className="space-y-4">
                          <h4 className="text-base font-medium">Opciones veganas 🥬</h4>
                          <div className="grid gap-4 sm:grid-cols-2">
                            <div className="rounded-lg border p-5 text-white shadow-lg">
                              <p className="mb-2 font-serif text-sm">Hamburguesas de lentejas</p>
                              <p className="text-xl font-semibold">{user.vegan * 2} unidades</p>
                            </div>
                            <div className="rounded-lg border p-5 text-white shadow-lg">
                              <p className="mb-2 font-serif text-sm">Verduras asadas</p>
                              <p className="text-xl font-semibold">{user.vegan * 0.3}kg</p>
                            </div>
                          </div>
                          <div className="rounded-lg border p-5 text-white shadow-lg">
                            <p className="mb-2 font-serif text-sm">Tofu marinado</p>
                            <p className="text-xl font-semibold">{user.vegan * 0.2}kg</p>
                          </div>
                        </div>
                      )}

                      {(includeBeer || includeWine || includeSoda) && (
                        <div className="space-y-4">
                          <h4 className="font-serif text-base font-medium">Bebestibles 🥤</h4>
                          <div className="grid gap-4 sm:grid-cols-3">
                            {includeBeer && (
                              <div className="rounded-lg border p-5 text-white shadow-lg">
                                <p className="mb-2 font-serif text-sm">Cerveza</p>
                                <p className="text-xl font-semibold">
                                  {Math.ceil(calculations.beer / 1000)}L
                                </p>
                                <p className="mt-1 text-sm text-gray-400">
                                  ({Math.ceil(calculations.beer / 350)} latas de 350ml)
                                </p>
                              </div>
                            )}
                            {includeWine && (
                              <div className="rounded-lg border p-5 text-white shadow-lg">
                                <p className="mb-2 font-serif text-sm">Vino</p>
                                <p className="text-xl font-semibold">
                                  {Math.ceil(calculations.wine / 1000)}L
                                </p>
                                <p className="mt-1 text-sm text-gray-400">
                                  ({Math.ceil(calculations.wine / 750)} botellas)
                                </p>
                              </div>
                            )}
                            {includeSoda && (
                              <div className="rounded-lg border p-5 text-white shadow-lg">
                                <p className="mb-2 font-serif text-sm">Bebidas/Jugos</p>
                                <p className="text-xl font-semibold">
                                  {Math.ceil(calculations.soda / 1000)}L
                                </p>
                                <p className="mt-1 text-sm text-gray-400">
                                  ({Math.ceil(calculations.soda / 2000)} botellas de 2L)
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      <div className="mt-8 rounded-lg border p-6 text-white shadow-lg">
                        <p className="mb-4 font-serif text-lg font-semibold">Costos</p>
                        <div className="space-y-3">
                          <div className="space-y-2">
                            <p className="flex justify-between font-serif text-sm">
                              <span>Carne</span>
                              <span>
                                $
                                {formatPrice(
                                  calculations.meat *
                                    (budgetSelected?.meats.reduce(
                                      (acc, meat) => acc + (meat.valueLider + meat.valueJumbo) / 2,
                                      0,
                                    ) / (budgetSelected?.meats.length || 1) || 0),
                                )}
                              </span>
                            </p>

                            {isSausageSelected && (
                              <>
                                <p className="flex justify-between font-serif text-sm">
                                  <span>Embutidos</span>
                                  <span>
                                    $
                                    {formatPrice(
                                      calculations.sausage * (budgetSelected?.sausagePrice || 0),
                                    )}
                                  </span>
                                </p>
                                <p className="flex justify-between font-serif text-sm">
                                  <span>Pan</span>
                                  <span>${formatPrice(calculations.bread * 2000)}</span>
                                </p>
                              </>
                            )}

                            {isVegetablesSelected && (
                              <p className="flex justify-between font-serif text-sm">
                                <span>Vegetales</span>
                                <span>
                                  $
                                  {formatPrice(
                                    calculations.vegetables *
                                      (budgetSelected?.vegetablesPrice || 0),
                                  )}
                                </span>
                              </p>
                            )}

                            {isCarbonSelected && (
                              <p className="flex justify-between font-serif text-sm">
                                <span>Carbón</span>
                                <span>
                                  ${formatPrice(calculations.carbon(isSausageSelected) * 3000)}
                                </span>
                              </p>
                            )}

                            {includeBeer && (
                              <p className="flex justify-between font-serif text-sm">
                                <span>Cerveza</span>
                                <span>
                                  $
                                  {formatPrice(
                                    Math.ceil(calculations.beer / 350) *
                                      350 *
                                      (budgetSelected?.beverages.beer.pricePerMl || 0),
                                  )}
                                </span>
                              </p>
                            )}

                            {includeWine && (
                              <p className="flex justify-between font-serif text-sm">
                                <span>Vino</span>
                                <span>
                                  $
                                  {formatPrice(
                                    Math.ceil(calculations.wine / 750) *
                                      750 *
                                      (budgetSelected?.beverages.wine.pricePerMl || 0),
                                  )}
                                </span>
                              </p>
                            )}

                            {includeSoda && (
                              <p className="flex justify-between font-serif text-sm">
                                <span>Bebidas/Jugos</span>
                                <span>
                                  $
                                  {formatPrice(
                                    Math.ceil(calculations.soda / 2000) *
                                      2000 *
                                      (budgetSelected?.beverages.soda.pricePerMl || 0),
                                  )}
                                </span>
                              </p>
                            )}

                            {user.vegan > 0 && (
                              <>
                                <p className="flex justify-between font-serif text-sm">
                                  <span>Hamburguesas de lentejas</span>
                                  <span>${formatPrice(user.vegan * 2 * 2000)}</span>
                                </p>
                                <p className="flex justify-between font-serif text-sm">
                                  <span>Verduras asadas</span>
                                  <span>${formatPrice(user.vegan * 0.3 * 3000)}</span>
                                </p>
                                <p className="flex justify-between font-serif text-sm">
                                  <span>Tofu marinado</span>
                                  <span>${formatPrice(user.vegan * 0.2 * 15000)}</span>
                                </p>
                              </>
                            )}
                          </div>

                          <div className="mt-4 border-t pt-3">
                            <p className="flex justify-between font-serif text-lg">
                              <span>Total</span>
                              <span className="font-bold">${formatPrice(totalPrice)}</span>
                            </p>
                            <p className="flex justify-between font-serif text-lg text-amber-200">
                              <span>Por adulto</span>
                              <span className="font-bold">${formatPrice(pricePerAdult)}</span>
                            </p>
                          </div>
                        </div>
                      </div>

                      <ShoppingList
                        calculations={{
                          meat: calculations.meat,
                          sausage: isSausageSelected ? calculations.sausage : 0,
                          bread: isSausageSelected ? calculations.bread : 0,
                          carbon: isCarbonSelected ? calculations.carbon(isSausageSelected) : 0,
                          vegetables: isVegetablesSelected ? calculations.vegetables : undefined,
                          beer: includeBeer ? calculations.beer : undefined,
                          wine: includeWine ? calculations.wine : undefined,
                          soda: includeSoda ? calculations.soda : undefined,
                          veganOptions:
                            user.vegan > 0
                              ? {
                                  lentilBurgers: calculations.lentilBurgers,
                                  vegetables: calculations.grilledVegetables,
                                  tofu: calculations.marinatedTofu,
                                }
                              : undefined,
                        }}
                      />

                      <div className="mt-4">
                        <ExportButtons
                          data={[
                            {
                              Hombres: user.men,
                              Mujeres: user.women,
                              Niños: user.children,
                              Veganos: user.vegan,
                              'Carne necesaria': `${calculations.meat}kg`,
                              'Costo carne': `$${formatPrice(
                                calculations.meat *
                                  (budgetSelected?.meats.reduce(
                                    (acc, meat) => acc + (meat.valueLider + meat.valueJumbo) / 2,
                                    0,
                                  ) / (budgetSelected?.meats.length || 1) || 0),
                              )}`,
                              Embutidos: isSausageSelected
                                ? `${calculations.sausage}kg`
                                : 'No incluido',
                              'Costo embutidos': isSausageSelected
                                ? `$${formatPrice(calculations.sausage * (budgetSelected?.sausagePrice || 0))}`
                                : 'No incluido',
                              Pan: isSausageSelected ? `${calculations.bread}kg` : 'No incluido',
                              'Costo pan': isSausageSelected
                                ? `$${formatPrice(calculations.bread * 2000)}`
                                : 'No incluido',
                              Vegetales: isVegetablesSelected
                                ? `${calculations.vegetables}kg`
                                : 'No incluido',
                              'Costo vegetales': isVegetablesSelected
                                ? `$${formatPrice(calculations.vegetables * (budgetSelected?.vegetablesPrice || 0))}`
                                : 'No incluido',
                              Carbón: isCarbonSelected
                                ? `${calculations.carbon(isSausageSelected)}kg`
                                : 'No incluido',
                              'Costo carbón': isCarbonSelected
                                ? `$${formatPrice(calculations.carbon(isSausageSelected) * 3000)}`
                                : 'No incluido',
                              Cerveza: includeBeer
                                ? `${Math.ceil(calculations.beer / 1000)}L (${Math.ceil(calculations.beer / 350)} latas)`
                                : 'No incluido',
                              'Costo cerveza': includeBeer
                                ? `$${formatPrice(calculations.beer * 0.002)}`
                                : 'No incluido',
                              Vino: includeWine
                                ? `${Math.ceil(calculations.wine / 1000)}L (${Math.ceil(calculations.wine / 750)} botellas)`
                                : 'No incluido',
                              'Costo vino': includeWine
                                ? `$${formatPrice(calculations.wine * 0.01)}`
                                : 'No incluido',
                              Bebidas: includeSoda
                                ? `${Math.ceil(calculations.soda / 1000)}L (${Math.ceil(calculations.soda / 2000)} botellas)`
                                : 'No incluido',
                              'Costo bebidas/jugos': includeSoda
                                ? `$${formatPrice(calculations.soda * 0.001)}`
                                : 'No incluido',
                              'Hamburguesas de lentejas':
                                user.vegan > 0
                                  ? `${user.vegan * 2} unidades - $${formatPrice(user.vegan * 2 * 2000)}`
                                  : 'No incluido',
                              'Verduras asadas veganas':
                                user.vegan > 0
                                  ? `${user.vegan * 0.3}kg - $${formatPrice(user.vegan * 0.3 * 3000)}`
                                  : 'No incluido',
                              'Tofu marinado':
                                user.vegan > 0
                                  ? `${user.vegan * 0.2}kg - $${formatPrice(user.vegan * 0.2 * 15000)}`
                                  : 'No incluido',
                              Total: `$${formatPrice(totalPrice)}`,
                              'Por adulto': `$${formatPrice(pricePerAdult)}`,
                            },
                          ]}
                          filename="asado-calculo"
                        />
                      </div>
                    </div>
                  </div>
                </Card>
              )}

              {peopleCount > 0 && budgetSelected && (
                <Card className="mb-8 hidden">
                  <div className="p-2 md:p-6">
                    {favorites.length > 0 && (
                      <div className="space-y-2">
                        <p className="font-serif text-sm text-muted-foreground">
                          Configuraciones guardadas:
                        </p>
                        <div className="grid gap-2">
                          {favorites.map((favorite) => (
                            <div
                              key={favorite.id}
                              className="flex items-center justify-between rounded-lg border-2  p-3 text-white"
                            >
                              <span className="font-handwritten text-lg">{favorite.name}</span>
                              <div className="flex gap-2">
                                <button
                                  onClick={() => {
                                    setUser({
                                      men: favorite.config.men,
                                      women: favorite.config.women,
                                      children: favorite.config.children,
                                      vegan: favorite.config.vegan,
                                    })
                                    setBudgetSelected(
                                      budgets.find((b) => b.id === favorite.config.budget)
                                        ? transformBudget(
                                            budgets.find((b) => b.id === favorite.config.budget)!,
                                          )
                                        : null,
                                    )
                                    if (favorite.config.includeSausage) toggleSausage()
                                    if (favorite.config.includeCarbon) toggleCarbon()
                                    if (favorite.config.includeVegetables) toggleVegetables()
                                  }}
                                  className="rounded p-2 hover:bg-amber-900/20"
                                >
                                  Cargar 📂
                                </button>
                                <button
                                  onClick={() => removeFavorite(favorite.id)}
                                  className="rounded p-2 hover:bg-amber-900/20"
                                >
                                  Eliminar 🗑️
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </Card>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </motion.div>
  )
}
