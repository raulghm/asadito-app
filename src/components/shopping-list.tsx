interface ShoppingListProps {
  calculations: {
    meat: number
    sausage: number
    bread: number
    carbon: number
    veganOptions?: {
      lentilBurgers: number
      vegetables: number
      tofu: number
    }
  }
}

export function ShoppingList({ calculations }: ShoppingListProps) {
  return (
    <div className="rounded-lg border-2 border-amber-900 p-5 text-white">
      <h4 className="mb-4 text-base font-medium">Lista de Compras 📝</h4>
      <div className="space-y-2 font-handwritten text-lg">
        <p>• Carne: {calculations.meat}kg</p>
        {calculations.sausage > 0 && (
          <>
            <p>• Chorizo: {calculations.sausage}kg</p>
            <p>• Pan: {calculations.bread}kg</p>
          </>
        )}
        {calculations.veganOptions && (
          <>
            <p>• Hamburguesas de lentejas: {calculations.veganOptions.lentilBurgers} unidades</p>
            <p>• Verduras para asar: {calculations.veganOptions.vegetables}kg</p>
            <p>• Tofu: {calculations.veganOptions.tofu}kg</p>
          </>
        )}
        <p>• Carbón: {calculations.carbon}kg</p>
        <p>• Sal gruesa: {Math.ceil(calculations.meat * 0.02)}kg</p>
        <p>• Chimichurri: {Math.ceil(calculations.meat * 0.05)}kg</p>
      </div>
    </div>
  )
}
