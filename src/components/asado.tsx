'use client'

import { useState, useCallback } from 'react'
import { z } from 'zod'
import dynamic from 'next/dynamic'

import { Card } from '~/components/ui/card'
import { Checkbox } from '~/components/ui/checkbox'
import { Input } from '~/components/ui/input'
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
import { generateId, formatPrice } from '~/lib/utils'

import { DrinksCalculator } from './drinks-calculator'
import { ShoppingList } from './shopping-list'

interface FavoriteAsado {
  id: string
  name: string
  config: {
    men: number
    women: number
    children: number
    vegan: number
    budget: number
    includeSausage: boolean
    includeCarbon: boolean
  }
}

const SaveButton = dynamic(
  () =>
    Promise.resolve(({ onClick }: { onClick: () => void }) => (
      <button
        onClick={onClick}
        className="rounded-lg border-2 border-amber-900 px-4 py-2 text-white hover:bg-amber-900/20">
        Guardar ⭐
      </button>
    )),
  { ssr: false },
)

export function Asado() {
  const {
    user,
    setUser,
    budgetSelected,
    setBudgetSelected,
    toggleSausage,
    toggleCarbon,
    isSausageSelected,
    isCarbonSelected,
  } = useAsadoStore()

  const { favorites, addFavorite, removeFavorite } = useFavoritesStore()

  const [showHelp, setShowHelp] = useState(false)

  const peopleCount = user.men + user.women + user.children

  const calculations = calculateAsado(user)
  const totalPrice = calculations.totalPrice({
    budgetSelected,
    isSausageSelected,
    isCarbonSelected,
  })
  const pricePerAdult = calculations.pricePerAdult(totalPrice, user.men + user.women)

  const handleSaveFavorite = useCallback(() => {
    const now = new Date()
    const dateStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`

    const favorite: FavoriteAsado = {
      id: generateId(),
      name: `Asado ${dateStr}`,
      config: {
        men: user.men,
        women: user.women,
        children: user.children,
        vegan: user.vegan,
        budget: budgetSelected.id,
        includeSausage: isSausageSelected,
        includeCarbon: isCarbonSelected,
      },
    }
    addFavorite(favorite)
  }, [user, budgetSelected, isSausageSelected, isCarbonSelected, addFavorite])

  return (
    <div>
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8">
          <div className="mx-auto w-full max-w-3xl">
            <Card className="mb-8">
              <div className="p-6">
                <div className="relative">
                  <h3 className="mb-4 flex items-center gap-2 text-xl font-semibold">
                    <span className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                      1
                    </span>
                    Indica la cantidad de comensales
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
                          className="px-4 py-3 text-lg font-bold transition-colors hover:bg-amber-900/20">
                          -
                        </button>
                        <div className="flex-1 py-2 text-center font-handwritten text-4xl font-bold">
                          {user.men}
                        </div>
                        <button
                          type="button"
                          onClick={() => setUser({ ...user, men: Math.min(100, user.men + 1) })}
                          className="px-4 py-3 text-lg font-bold transition-colors hover:bg-amber-900/20">
                          +
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="women" className="text-sm font-medium">
                        Mujeres 👩
                      </label>
                      <div className="flex items-center overflow-hidden rounded-lg border-2 border-amber-900 shadow-inner">
                        <button
                          type="button"
                          onClick={() => setUser({ ...user, women: Math.max(0, user.women - 1) })}
                          className="px-4 py-3 text-lg font-bold transition-colors hover:bg-amber-900/20">
                          -
                        </button>
                        <div className="flex-1 py-2 text-center font-handwritten text-4xl font-bold">
                          {user.women}
                        </div>
                        <button
                          type="button"
                          onClick={() => setUser({ ...user, women: Math.min(100, user.women + 1) })}
                          className="px-4 py-3 text-lg font-bold transition-colors hover:bg-amber-900/20">
                          +
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="children" className="text-sm font-medium">
                        Niños 👶
                      </label>
                      <div className="flex items-center overflow-hidden rounded-lg border-2 border-amber-900 shadow-inner">
                        <button
                          type="button"
                          onClick={() =>
                            setUser({ ...user, children: Math.max(0, user.children - 1) })
                          }
                          className="px-4 py-3 text-lg font-bold transition-colors hover:bg-amber-900/20">
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
                          className="px-4 py-3 text-lg font-bold transition-colors hover:bg-amber-900/20">
                          +
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="vegan" className="text-sm font-medium">
                        Veganos 🥬
                      </label>
                      <div className="flex items-center overflow-hidden rounded-lg border-2 border-amber-900 shadow-inner">
                        <button
                          type="button"
                          onClick={() => setUser({ ...user, vegan: Math.max(0, user.vegan - 1) })}
                          className="px-4 py-3 text-lg font-bold transition-colors hover:bg-amber-900/20">
                          -
                        </button>
                        <div className="flex-1 py-2 text-center font-handwritten text-4xl font-bold">
                          {user.vegan}
                        </div>
                        <button
                          type="button"
                          onClick={() => setUser({ ...user, vegan: Math.min(100, user.vegan + 1) })}
                          className="px-4 py-3 text-lg font-bold transition-colors hover:bg-amber-900/20">
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {peopleCount > 0 && (
                  <div className="relative mt-12">
                    <h3 className="mb-4 flex items-center gap-2 text-xl font-semibold">
                      <span className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                        2
                      </span>
                      Selecciona tu presupuesto
                    </h3>

                    <div className="space-y-4">
                      <Select
                        value={String(budgetSelected?.id || '')}
                        onValueChange={(value) =>
                          setBudgetSelected(budgets.find((b) => b.id === Number(value)) || null)
                        }>
                        <SelectTrigger className="w-full border-2 border-amber-900 text-white">
                          <SelectValue placeholder="Selecciona un presupuesto" />
                        </SelectTrigger>
                        <SelectContent className="border-2 border-amber-900">
                          {budgets.map((budget) => (
                            <SelectItem
                              key={budget.id}
                              value={String(budget.id)}
                              className="hover:bg-amber-900/20">
                              {budget.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      {budgetSelected && (
                        <div className="rounded-lg border border-amber-900/20 p-5 text-white shadow-lg">
                          <p className="mb-2 text-sm font-medium">Cortes recomendados:</p>
                          <ul className="space-y-1 text-sm">
                            {budgetSelected.id === 1 && (
                              <>
                                <li>• Asado de tira</li>
                                <li>• Tapapecho</li>
                                <li>• Sobrecostilla</li>
                              </>
                            )}
                            {budgetSelected.id === 2 && (
                              <>
                                <li>• Lomo liso</li>
                                <li>• Punta picana</li>
                                <li>• Punta paleta</li>
                                <li>• Asado carnicero</li>
                              </>
                            )}
                            {budgetSelected.id === 3 && (
                              <>
                                <li>• Lomo vetado</li>
                                <li>• Entraña</li>
                                <li>• Wagyu</li>
                                <li>• Tomahawk</li>
                              </>
                            )}
                          </ul>
                        </div>
                      )}

                      <div className="flex flex-col gap-2">
                        <div className="flex items-center space-x-2 rounded-lg border border-amber-900/20 p-3 opacity-90 shadow-lg">
                          <Checkbox
                            id="sausage"
                            checked={isSausageSelected}
                            onCheckedChange={toggleSausage}
                            className="border-amber-900 data-[state=checked]:bg-amber-900"
                          />
                          <label htmlFor="sausage" className="text-sm font-medium">
                            Incluir embutidos + pan
                          </label>
                        </div>

                        <div className="flex items-center space-x-2 rounded-lg border border-amber-900/20 p-3 opacity-90 shadow-lg">
                          <Checkbox
                            id="carbon"
                            checked={isCarbonSelected}
                            onCheckedChange={toggleCarbon}
                            className="border-amber-900 data-[state=checked]:bg-amber-900"
                          />
                          <label htmlFor="carbon" className="text-sm font-medium">
                            Incluir carbón
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </Card>

            {peopleCount > 0 && budgetSelected && (
              <Card className="mb-8">
                <div className="p-8">
                  <h3 className="mb-6 flex items-center gap-2 text-xl font-semibold">
                    <span className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                      3
                    </span>
                    Resultados
                  </h3>

                  <div className="space-y-6">
                    <div className="rounded-lg border border-amber-900/20 p-5 text-white shadow-lg">
                      <p className="mb-2 text-sm">Carne necesaria</p>
                      <p className="text-2xl font-bold">{calculations.meat}kg 🍖</p>
                    </div>

                    {isSausageSelected && (
                      <div className="grid grid-cols-2 gap-4">
                        <div className="rounded-lg border border-amber-900/20 p-5 text-white shadow-lg">
                          <p className="mb-2 text-sm">Embutidos</p>
                          <p className="text-xl font-semibold">{calculations.sausage}kg</p>
                        </div>
                        <div className="rounded-lg border border-amber-900/20 p-5 text-white shadow-lg">
                          <p className="mb-2 text-sm">Pan</p>
                          <p className="text-xl font-semibold">{calculations.bread}kg</p>
                        </div>
                      </div>
                    )}

                    {user.vegan > 0 && (
                      <div className="space-y-4">
                        <h4 className="text-base font-medium">Opciones veganas 🥬</h4>
                        <div className="grid gap-4 sm:grid-cols-2">
                          <div className="rounded-lg border border-amber-900/20 p-5 text-white shadow-lg">
                            <p className="mb-2 text-sm">Hamburguesas de lentejas</p>
                            <p className="text-xl font-semibold">{user.vegan * 2} unidades</p>
                          </div>
                          <div className="rounded-lg border border-amber-900/20 p-5 text-white shadow-lg">
                            <p className="mb-2 text-sm">Verduras asadas</p>
                            <p className="text-xl font-semibold">{user.vegan * 0.3}kg</p>
                          </div>
                        </div>
                        <div className="rounded-lg border border-amber-900/20 p-5 text-white shadow-lg">
                          <p className="mb-2 text-sm">Tofu marinado</p>
                          <p className="text-xl font-semibold">{user.vegan * 0.2}kg</p>
                        </div>
                      </div>
                    )}

                    <div className="mt-8 rounded-lg border border-amber-900/20 p-6 text-white shadow-lg">
                      <p className="mb-4 text-lg font-semibold">Costos</p>
                      <div className="space-y-3">
                        <p className="flex justify-between text-lg">
                          <span>Total</span>
                          <span className="font-bold">${formatPrice(totalPrice)}</span>
                        </p>
                        <p className="flex justify-between text-lg text-amber-200">
                          <span>Por adulto</span>
                          <span className="font-bold">${formatPrice(pricePerAdult)}</span>
                        </p>
                      </div>
                    </div>

                    <DrinksCalculator
                      adults={user.men + user.women}
                      duration={3} // Duración estimada del asado en horas
                    />

                    <ShoppingList
                      calculations={{
                        meat: calculations.meat,
                        sausage: calculations.sausage,
                        bread: calculations.bread,
                        carbon: calculations.carbon(isSausageSelected),
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
                  </div>
                </div>
              </Card>
            )}

            {peopleCount > 0 && budgetSelected && (
              <Card className="mb-8">
                <div className="p-6">
                  <div className="mb-4 flex items-center justify-between">
                    <h4 className="text-base font-medium">Guardar configuración</h4>
                    <SaveButton onClick={handleSaveFavorite} />
                  </div>

                  {favorites.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">Configuraciones guardadas:</p>
                      <div className="grid gap-2">
                        {favorites.map((favorite) => (
                          <div
                            key={favorite.id}
                            className="flex items-center justify-between rounded-lg border-2 border-amber-900 p-3 text-white">
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
                                    budgets.find((b) => b.id === favorite.config.budget) || null,
                                  )
                                  if (favorite.config.includeSausage) toggleSausage()
                                  if (favorite.config.includeCarbon) toggleCarbon()
                                }}
                                className="rounded p-2 hover:bg-amber-900/20">
                                Cargar 📂
                              </button>
                              <button
                                onClick={() => removeFavorite(favorite.id)}
                                className="rounded p-2 hover:bg-amber-900/20">
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

        <div className="mb-2 flex flex-col items-center justify-center text-sm ">
          <div className="rotate-2">
            <svg width="128" height="98" viewBox="0 0 419 416" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M2.04866 368.521C22.7366 392.657 53.1939 408.173 84.2258 413.345C98.5924 415.643 112.959 416.218 127.326 413.632C140.83 411.333 154.335 405.299 166.403 398.691C172.15 395.53 177.609 391.795 182.781 388.059C189.389 383.175 195.998 378.29 202.032 372.831C213.525 362.199 220.996 347.546 225.881 332.892C231.053 317.376 233.351 300.998 234.213 284.907C235.075 267.092 234.501 248.416 231.053 230.889C227.317 212.787 218.41 195.547 202.607 185.203C188.815 176.295 171.575 175.146 157.208 183.479C144.278 190.949 135.084 204.454 131.061 218.533C126.751 234.049 129.337 250.14 137.095 264.219C153.473 293.814 188.815 311.342 220.996 316.801C237.661 319.674 255.476 319.674 271.854 314.502C289.381 308.756 303.46 297.262 313.517 281.746C324.148 265.081 330.757 245.83 337.078 227.441C343.974 207.615 350.008 187.501 354.606 167.101C364.088 126.587 369.547 84.9235 370.984 43.2603C371.271 32.9163 371.271 22.8598 370.984 12.5159C370.696 3.32121 356.33 3.32121 356.617 12.5159C358.341 90.0956 344.836 167.675 317.252 240.083C311.219 255.886 304.61 272.839 292.829 285.194C282.485 296.113 268.406 302.147 253.752 303.871C238.236 305.595 222.433 303.584 207.779 298.986C193.699 294.676 179.62 288.068 168.127 278.586C156.921 269.391 147.726 257.61 144.278 243.244C141.405 231.463 144.853 218.246 151.462 207.902C158.07 198.133 168.127 191.237 179.62 191.811C193.987 192.673 205.193 204.454 211.227 216.809C218.985 232.613 219.272 251.864 219.847 269.104C220.134 283.183 218.985 297.55 216.399 311.629C213.525 325.421 209.215 339.213 201.457 351.281C193.987 362.774 182.206 370.82 171.288 378.865C160.944 386.335 149.45 391.795 137.382 396.105C126.176 400.415 115.545 401.277 103.477 400.989C76.7551 400.127 48.8838 390.358 27.6212 373.405C21.8746 368.808 16.99 363.923 12.1053 358.464C9.51931 355.591 4.63465 355.878 2.04866 358.464C-0.824665 361.337 -0.537333 365.647 2.04866 368.521Z"
                className="fill-foreground"
              />
              <path
                d="M287.083 137.218C302.311 105.037 320.126 74.2923 339.952 44.697C344.836 37.5137 350.008 30.043 355.18 23.1471C357.192 20.5611 359.203 17.1131 362.076 15.1018C364.088 13.6651 364.662 14.2399 366.099 16.2512C368.398 19.1245 370.122 22.2852 371.846 25.4459C374.144 29.1812 376.156 33.2038 378.167 37.2264C382.19 44.6971 385.638 52.455 388.798 60.5003C395.694 78.3149 400.866 96.9916 404.027 115.668C404.602 119.404 409.486 121.702 412.934 120.553C416.957 119.404 418.681 115.668 417.819 111.646C414.658 93.2564 409.774 75.1543 402.878 57.627C399.43 48.7197 395.694 39.8124 391.384 31.4798C387.362 23.7218 383.339 15.3892 378.167 8.49318C372.42 0.735198 363.513 -2.71272 354.893 2.45926C347.135 7.34392 341.963 16.5385 336.791 23.7218C325.585 39.5251 314.954 55.903 305.185 72.5683C294.266 91.2449 283.922 110.209 274.727 129.748C273.003 133.196 273.865 137.505 277.313 139.517C280.474 141.815 285.646 140.666 287.083 137.218Z"
                className="fill-foreground"
              />
            </svg>
          </div>
          <div className="mt-4">Comienza ingresando la cantidad de comensales</div>
        </div>

        {/* <div className="mt-8">
          <button
            onClick={() => setShowHelp(!showHelp)}
            className="flex items-center gap-2 text-primary hover:underline">
            <span>¿Cómo funciona?</span>
            <span className="text-lg">{showHelp ? '👆' : '👀'}</span>
          </button>

          {showHelp && (
            <div className="mt-4 text-muted-foreground space-y-4">
              <h4 className="font-semibold">Referencias y cálculos:</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li>Los precios son referencias de supermercados Lider y Jumbo.</li>
                <li>Solo se consideran carnes de vacuno al vacío.</li>
                <li>
                  Cantidades por persona:
                  <ul className="list-disc pl-5 mt-2">
                    <li>Hombre: 350g</li>
                    <li>Mujer: 250g</li>
                    <li>Niño: 200g</li>
                  </ul>
                </li>
                <li>Los niños no se consideran en la división del costo total.</li>
              </ul>
            </div>
          )}
        </div> */}
      </div>
    </div>
  )
}
