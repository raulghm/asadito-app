'use client'

import { useState } from 'react'

export function HelpSection() {
  const [showHelp, setShowHelp] = useState(false)

  return (
    <div className="mt-8">
      <button
        onClick={() => setShowHelp(!showHelp)}
        className="flex items-center gap-2 text-primary hover:underline"
      >
        <span>¿Cómo funciona?</span>
        <span className="text-lg">{showHelp ? '👆' : '👀'}</span>
      </button>

      {showHelp && (
        <div className="mt-4 space-y-4 text-muted-foreground">
          <h4 className="font-semibold">Referencias y cálculos:</h4>
          <ul className="list-disc space-y-2 pl-5">
            <li>Los precios son referencias de supermercados Lider y Jumbo.</li>
            <li>Solo se consideran carnes de vacuno al vacío.</li>
            <li>
              Cantidades por persona:
              <ul className="mt-2 list-disc pl-5">
                <li>Hombre: 350g</li>
                <li>Mujer: 250g</li>
                <li>Niño: 200g</li>
              </ul>
            </li>
            <li>Los niños no se consideran en la división del costo total.</li>
          </ul>
        </div>
      )}
    </div>
  )
}
