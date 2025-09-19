'use client'

import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'

export function HelpSection() {
  return (
    <div>
      <CardContent>
        <Tabs defaultValue="calculations">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="calculations">📊 Cálculos</TabsTrigger>
            <TabsTrigger value="prices">💰 Precios</TabsTrigger>
            <TabsTrigger value="portions">🍖 Porciones</TabsTrigger>
            <TabsTrigger value="drinks">🍺 Bebidas</TabsTrigger>
          </TabsList>

          <TabsContent value="calculations" className="mt-6 space-y-6">
            <div className="space-y-4">
              <h3 className="font-serif font-bold">Lógica de Cálculos</h3>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">🥩 Cálculo de Carne por Persona</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                    <div className="rounded-lg bg-muted p-3">
                      <p className="font-semibold">👨 Hombres</p>
                      <p className="text-sm text-muted-foreground">350g por persona</p>
                    </div>
                    <div className="rounded-lg bg-muted p-3">
                      <p className="font-semibold">👩 Mujeres</p>
                      <p className="text-sm text-muted-foreground">250g por persona</p>
                    </div>
                    <div className="rounded-lg bg-muted p-3">
                      <p className="font-semibold">👶 Niños</p>
                      <p className="text-sm text-muted-foreground">200g por persona</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    <strong>Fórmula:</strong> Total = (Hombres × 0.35kg) + (Mujeres × 0.25kg) +
                    (Niños × 0.2kg)
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg text-foreground">🌭 Otros Ingredientes</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2 text-sm">
                    <p>
                      <strong>Chorizos/Salchichas:</strong> H: 150g, M: 100g, N: 100g
                    </p>
                    <p>
                      <strong>Pan:</strong> H: 166g, M: 166g, N: 83g (aproximadamente 1/6 de pan por
                      adulto)
                    </p>
                    <p>
                      <strong>Vegetales:</strong> H: 200g, M: 150g, N: 150g
                    </p>
                    <p>
                      <strong>Carbón:</strong> 1kg por cada kg de carne + chorizo seleccionado
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg text-foreground">🌱 Opciones Veganas</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <p>
                    <strong>Hamburguesas de lentejas:</strong> 2 por persona vegana
                  </p>
                  <p>
                    <strong>Vegetales a la parrilla:</strong> 300g por persona vegana
                  </p>
                  <p>
                    <strong>Tofu marinado:</strong> 200g por persona vegana
                  </p>
                  <p>
                    <strong>Costo estimado:</strong> $8.000 por persona vegana
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="prices" className="mt-6 space-y-6">
            <div className="space-y-4">
              <h3 className="font-serif font-bold text-foreground">Sistema de Precios</h3>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg text-foreground">🏪 Fuente de Precios</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm">
                    Los precios son extraídos directamente de las páginas web de:
                  </p>
                  <div className="flex gap-4">
                    <div className="rounded-lg bg-muted p-3">
                      <p className="font-semibold">🛒 Líder</p>
                    </div>
                    <div className="rounded-lg bg-muted p-3">
                      <p className="font-semibold">🛍️ Jumbo</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    <strong>Cálculo final:</strong> Promedio entre ambos supermercados
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg text-foreground">
                    📊 Categorías de Presupuesto
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="rounded-lg bg-muted p-3">
                      <p className="font-semibold">🪙 Económico</p>
                      <p className="text-xs text-muted-foreground">$7.790 - $11.190/kg</p>
                    </div>
                    <div className="rounded-lg bg-muted p-3">
                      <p className="font-semibold text-foreground">💰 Medio</p>
                      <p className="text-xs text-muted-foreground">$8.990 - $14.990/kg</p>
                    </div>
                    <div className="rounded-lg bg-muted p-3">
                      <p className="font-semibold">💸 Alto</p>
                      <p className="text-xs text-muted-foreground">$11.990 - $18.990/kg</p>
                    </div>
                    <div className="rounded-lg bg-muted p-3">
                      <p className="font-semibold">💎 Premium</p>
                      <p className="text-xs text-muted-foreground">$22.990 - $44.990/kg</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg text-foreground">
                    🧾 Cálculo del Precio Total
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <p>
                    <strong>1.</strong> Se multiplica cada cantidad por su precio promedio
                  </p>
                  <p>
                    <strong>2.</strong> Se suman todos los elementos seleccionados
                  </p>
                  <p>
                    <strong>3.</strong> Se redondea a la decena más cercana
                  </p>
                  <p>
                    <strong>4.</strong> El precio por adulto = Total ÷ (Hombres + Mujeres)
                  </p>
                  <p className="font-semibold text-destructive">
                    ⚠️ Los niños NO se incluyen en la división del costo
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="portions" className="mt-6 space-y-6">
            <div className="space-y-4">
              <h3 className="font-serif font-bold text-foreground">Porciones y Cantidades</h3>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg text-foreground">
                    📏 Criterios de Porciones
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm">Las porciones están basadas en:</p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span>🎯</span>
                      <span>
                        <strong>Experiencia práctica:</strong> Años de asados familiares y eventos
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span>📊</span>
                      <span>
                        <strong>Estándares chilenos:</strong> Adaptado a nuestros hábitos
                        alimentarios
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span>⚖️</span>
                      <span>
                        <strong>Balance nutricional:</strong> Considerando otros acompañamientos
                      </span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg text-foreground">
                    🥩 Tipos de Carne Considerados
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm font-semibold">✅ Solo carnes de vacuno al vacío</p>
                  <p className="text-sm text-muted-foreground">
                    Esto garantiza calidad consistente y precios comparables entre supermercados
                  </p>
                  <div className="mt-3 grid grid-cols-1 gap-2 text-xs sm:grid-cols-2">
                    <div>
                      <p className="font-semibold">Económico:</p>
                      <p>Carnicero, Sobre costilla, Tapapecho, etc.</p>
                    </div>
                    <div>
                      <p className="font-semibold">Premium:</p>
                      <p>Lomo vetado premium, Wagyu, Angus, etc.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="drinks" className="mt-6 space-y-6">
            <div className="space-y-4">
              <h3 className="font-serif font-bold text-foreground">Sistema de Bebidas</h3>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg text-foreground">📊 Niveles de Consumo</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                    <div className="rounded-lg bg-muted p-3">
                      <p className="font-semibold">🟢 Ligero</p>
                      <p className="text-xs text-green-600 dark:text-green-300">
                        70% del consumo base
                      </p>
                    </div>
                    <div className="rounded-lg bg-muted p-3">
                      <p className="font-semibold">🟡 Moderado</p>
                      <p className="text-xs text-muted-foreground">100% del consumo base</p>
                    </div>
                    <div className="rounded-lg bg-muted p-3">
                      <p className="font-semibold">🔴 Alto</p>
                      <p className="text-xs text-red-600 dark:text-red-300">
                        150% del consumo base
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg text-foreground">
                    🍻 Consumo Base por Persona
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-3">
                    <div className="rounded-lg bg-muted p-3">
                      <p className="font-semibold">🍺 Cerveza</p>
                      <p className="text-sm text-muted-foreground">
                        Hombres: 750ml | Mujeres: 500ml | Niños: 0ml
                      </p>
                    </div>
                    <div className="rounded-lg bg-muted p-3">
                      <p className="font-semibold">🍷 Vino</p>
                      <p className="text-sm text-muted-foreground">Adultos: 250ml | Niños: 0ml</p>
                    </div>
                    <div className="rounded-lg bg-muted p-3">
                      <p className="font-semibold">🥤 Bebidas/Jugos</p>
                      <p className="text-sm text-muted-foreground">
                        Hombres: 375ml | Mujeres: 375ml | Niños: 250ml
                      </p>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    <strong>Nota:</strong> Estas cantidades han sido reducidas a la mitad respecto a
                    estándares tradicionales para un consumo más responsable
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg text-foreground">💱 Precios de Bebidas</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <p>
                    <strong>Cerveza:</strong> $2.75 por ml
                  </p>
                  <p>
                    <strong>Vino:</strong> $9.32 por ml
                  </p>
                  <p>
                    <strong>Bebidas/Jugos:</strong> $1.10 por ml
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Precios promedio basados en productos disponibles en Líder y Jumbo
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-8 rounded-lg bg-muted p-4">
          <h4 className="font-bold text-foreground">🎯 Objetivo de la App</h4>
          <p className="mt-2 text-sm text-muted-foreground">
            Proporcionar cálculos precisos y actualizados para que planifiques el asado perfecto,
            sin desperdicios y con presupuesto controlado. Todos los datos se actualizan
            regularmente para mantener la precisión de los precios.
          </p>
        </div>
      </CardContent>
    </div>
  )
}
