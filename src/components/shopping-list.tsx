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
      vegetables: number
      tofu: number
    }
  }
}

export function ShoppingList({ calculations }: ShoppingListProps) {
  return (
    <div
      className="relative overflow-hidden rounded-lg p-5 text-gray-800"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3cdefs%3e%3cpattern id='notebook-lines' x='0' y='0' width='100%25' height='28' patternUnits='userSpaceOnUse'%3e%3cline x1='0' y1='28' x2='100%25' y2='28' stroke='%23e0e7ff' stroke-width='1'/%3e%3c/pattern%3e%3c/defs%3e%3crect width='100%25' height='100%25' fill='%23ffffff'/%3e%3crect width='100%25' height='100%25' fill='url(%23notebook-lines)'/%3e%3cline x1='40' y1='0' x2='40' y2='100%25' stroke='%23fca5a5' stroke-width='2'/%3e%3c/svg%3e")`,
        backgroundSize: '100% 28px',
      }}
    >
      <div className="ml-10">
        <h4 className="mb-4 font-serif text-base font-semibold">Lista de Compras 📝</h4>
        <div className="space-y-2 font-serif text-lg">
          <p>• Carne: {calculations.meat}kg</p>
          {calculations?.sausage > 0 && (
            <>
              <p>• Chorizo: {calculations.sausage}kg</p>
              <p>• Pan: {calculations.bread}kg</p>
            </>
          )}
          {calculations.vegetables && calculations.vegetables > 0 && (
            <p>• Vegetales: {calculations.vegetables}kg</p>
          )}
          {calculations.veganOptions && (
            <>
              <p>• Hamburguesas de lentejas: {calculations.veganOptions.lentilBurgers} unidades</p>
              <p>• Verduras para asar: {calculations.veganOptions.vegetables}kg</p>
              <p>• Tofu: {calculations.veganOptions.tofu}kg</p>
            </>
          )}
          {calculations.beer && calculations.beer > 0 && (
            <p>• Cerveza: {Math.ceil(calculations.beer / 350)} latas de 350ml</p>
          )}
          {calculations.wine && calculations.wine > 0 && (
            <p>• Vino: {Math.ceil(calculations.wine / 750)} botellas</p>
          )}
          {calculations.soda && calculations.soda > 0 && (
            <p>• Bebidas/Jugos: {Math.ceil(calculations.soda / 2000)} botellas de 2L</p>
          )}
          {calculations.carbon > 0 && <p>• Carbón: {calculations.carbon}kg</p>}
        </div>
      </div>
    </div>
  )
}
