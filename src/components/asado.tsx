'use client'

import { useState } from 'react'
import { z } from 'zod'

import { useAsadoStore } from '~/hooks/use-asado-store'
import { budgets } from '~/data/budgets'
import { Card } from '~/components/ui/card'
import { Input } from '~/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select'
import { Checkbox } from '~/components/ui/checkbox'
import { calculateAsado } from '~/lib/calculator'

const userSchema = z.object({
  men: z.number().min(0).max(100),
  women: z.number().min(0).max(100),
  children: z.number().min(0).max(100),
})

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

  const [showHelp, setShowHelp] = useState(false)

  const peopleCount = user.men + user.women + user.children

  const calculations = calculateAsado(user)
  const totalPrice = calculations.totalPrice({
    budgetSelected,
    isSausageSelected,
    isCarbonSelected,
  })
  const pricePerAdult = calculations.pricePerAdult(totalPrice, user.men + user.women)

  return (
    <div>
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-3">Calculadora de Asado 🍖</h1>
          <p className="text-muted-foreground">Organiza tu asado fácilmente</p>
        </div>

        <div className="grid gap-8 md:grid-cols-[2fr,1fr]">
          <Card className="mb-8">
            <div className="p-6">
              <div className="relative">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary">
                    1
                  </span>
                  Indica la cantidad de comensales
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="men" className="text-sm font-medium">
                      Hombres 👨
                    </label>
                    <Input
                      id="men"
                      type="number"
                      value={user.men}
                      onChange={(e) => setUser({ ...user, men: Number(e.target.value) })}
                      min={0}
                      max={100}
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="women" className="text-sm font-medium">
                      Mujeres 👩
                    </label>
                    <Input
                      id="women"
                      type="number"
                      value={user.women}
                      onChange={(e) => setUser({ ...user, women: Number(e.target.value) })}
                      min={0}
                      max={100}
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="children" className="text-sm font-medium">
                      Niños 👶
                    </label>
                    <Input
                      id="children"
                      type="number"
                      value={user.children}
                      onChange={(e) => setUser({ ...user, children: Number(e.target.value) })}
                      min={0}
                      max={100}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>

              {peopleCount > 0 && (
                <div className="relative mt-12">
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary">
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
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecciona un presupuesto" />
                      </SelectTrigger>
                      <SelectContent>
                        {budgets.map((budget) => (
                          <SelectItem key={budget.id} value={String(budget.id)}>
                            {budget.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    {budgetSelected && (
                      <div className="p-4 rounded-lg bg-muted">
                        <p className="text-sm font-medium mb-2">Cortes recomendados:</p>
                        <ul className="text-sm text-muted-foreground space-y-1">
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
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="sausage"
                          checked={isSausageSelected}
                          onCheckedChange={toggleSausage}
                        />
                        <label
                          htmlFor="sausage"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                          Incluir embutidos + pan
                        </label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="carbon"
                          checked={isCarbonSelected}
                          onCheckedChange={toggleCarbon}
                        />
                        <label
                          htmlFor="carbon"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
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
            <Card className="h-fit">
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary">
                    3
                  </span>
                  Resultados
                </h3>

                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-muted">
                    <p className="text-sm text-muted-foreground mb-2">Carne necesaria</p>
                    <p className="text-2xl font-bold">{calculations.meat}kg 🍖</p>
                  </div>

                  {isSausageSelected && (
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 rounded-lg bg-muted">
                        <p className="text-sm text-muted-foreground mb-1">Embutidos</p>
                        <p className="text-xl font-semibold">{calculations.sausage}kg</p>
                      </div>
                      <div className="p-4 rounded-lg bg-muted">
                        <p className="text-sm text-muted-foreground mb-1">Pan</p>
                        <p className="text-xl font-semibold">{calculations.bread}kg</p>
                      </div>
                    </div>
                  )}

                  {isCarbonSelected && (
                    <div className="p-4 rounded-lg bg-muted">
                      <p className="text-sm text-muted-foreground mb-1">Carbón</p>
                      <p className="text-xl font-semibold">
                        {calculations.carbon(isSausageSelected)}kg
                      </p>
                    </div>
                  )}

                  <div className="mt-6 p-4 rounded-lg bg-primary/10">
                    <p className="text-lg font-semibold mb-2">Costos</p>
                    <div className="space-y-2">
                      <p className="flex justify-between">
                        <span>Total</span>
                        <span className="font-bold">${totalPrice.toLocaleString('es-CL')}</span>
                      </p>
                      <p className="flex justify-between text-primary">
                        <span>Por adulto</span>
                        <span className="font-bold">${pricePerAdult.toLocaleString('es-CL')}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          )}
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
