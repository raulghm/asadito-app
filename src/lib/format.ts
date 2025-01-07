export function formatCLP(value: number): string {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  }).format(value)
}

export function formatUF(value: number): string {
  return new Intl.NumberFormat('es-CL', {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  }).format(value)
}
