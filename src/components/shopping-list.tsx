interface ShoppingListProps {
  calculations: {
    meat: number
    sausage: number
    bread: number
    carbon: number
    vegetables?: number
    beer?: number
    wine?: number
    soda?: number
    veganOptions?: {
      lentilBurgers: number
      tofu: number
    }
  }
}

export function ShoppingList({ calculations }: ShoppingListProps) {
  return (
    <div
      className="relative overflow-hidden rounded-lg p-5"
      style={{
        color: 'rgb(25, 50, 120)', // Classic BIC blue from 90s - same as export-utils.ts
        backgroundImage: `
          url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3cline x1='32' y1='0' x2='32' y2='100%25' stroke='%23fca5a5' stroke-width='2'/%3e%3c/svg%3e"),
          url("data:image/svg+xml,%3csvg width='28' height='28' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M 0 28 L 28 28 M 28 0 L 28 28' stroke='%23e0e7ff' stroke-width='1' fill='none'/%3e%3c/svg%3e")
        `,
        backgroundSize: '100% 100%, 28px 28px',
        backgroundColor: '#ffffff',
      }}
    >
      <div className="ml-10">
        <h4 className="mb-4 font-serif text-base font-semibold">Lista de Compras 📝</h4>
        <div className="space-y-2 font-serif text-lg">
          {calculations.meat > 0 && <p>• Carne: {calculations.meat}kg</p>}

          {calculations?.sausage > 0 && (
            <>
              <p>• Chorizo: {calculations.sausage}kg</p>
              <p>• Pan: {calculations.bread}kg</p>
            </>
          )}

          {typeof calculations.vegetables === 'number' && calculations.vegetables > 0 && (
            <p>• Vegetales: {calculations.vegetables}kg</p>
          )}

          {calculations.veganOptions && (
            <>
              <p>
                • Hamburguesas de lentejas: {Math.round(calculations.veganOptions.lentilBurgers)}{' '}
                unidades
              </p>
              <p>• Tofu: {calculations.veganOptions.tofu}kg</p>
            </>
          )}

          {typeof calculations.beer === 'number' && calculations.beer > 0 && (
            <p>
              • Cerveza: {Math.ceil(calculations.beer / 330)}{' '}
              {Math.ceil(calculations.beer / 330) === 1 ? 'botella' : 'botellas'} de 330ml
            </p>
          )}

          {typeof calculations.wine === 'number' && calculations.wine > 0 && (
            <p>
              • Vino: {Math.ceil(calculations.wine / 750)}{' '}
              {Math.ceil(calculations.wine / 750) === 1 ? 'botella' : 'botellas'}
            </p>
          )}

          {typeof calculations.soda === 'number' && calculations.soda > 0 && (
            <p>
              • Bebidas/Jugos: {Math.ceil(calculations.soda / 2000)}{' '}
              {Math.ceil(calculations.soda / 2000) === 1 ? 'botella' : 'botellas'} de 2L
            </p>
          )}

          {typeof calculations.carbon === 'number' && calculations.carbon > 0 && (
            <p>• Carbón: {calculations.carbon}kg</p>
          )}
        </div>
      </div>
    </div>
  )
}
