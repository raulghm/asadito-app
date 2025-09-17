import { jsPDF } from 'jspdf'

interface ExportableData {
  [key: string]: string | number | boolean | null
}

export function exportToPDF(data: ExportableData[], filename: string) {
  const doc = new jsPDF()
  const pageWidth = doc.internal.pageSize.getWidth()
  const pageHeight = doc.internal.pageSize.getHeight()
  const margin = 20
  const lineHeight = 8
  let yPos = margin + 5

  // Add horizontal lines with 20% opacity (like notebook paper)
  doc.setDrawColor(224, 231, 255) // Light blue-gray
  doc.setLineWidth(0.2) // Increased thickness for better visibility at 20% opacity
  for (let y = margin; y < pageHeight - margin; y += lineHeight) {
    doc.line(margin, y, pageWidth - margin, y)
  }

  // Add vertical red margin line (like notebook) - 20% opacity
  doc.setDrawColor(252, 165, 165) // Light red color
  doc.setLineWidth(1)
  doc.line(margin + 10, 0, margin + 10, pageHeight)

  // ===== APP TITLE & SUBTITLE =====
  doc.setTextColor(220, 38, 38) // Red-600
  doc.setFontSize(24)
  doc.setFont('helvetica', 'bold')
  doc.text('Asadito App', margin + 20, yPos)

  yPos += lineHeight * 2.5

  const item = data[0]

  // ===== PEOPLE SECTION =====
  doc.setTextColor(59, 130, 246) // Blue-500
  doc.setFontSize(16)
  doc.setFont('helvetica', 'bold')
  doc.text('Personas', margin + 20, yPos)
  yPos += lineHeight

  doc.setTextColor(30, 64, 175) // Blue-800
  doc.setFontSize(12)
  doc.setFont('helvetica', 'normal')

  const peopleItems = [
    { key: 'Hombres', value: item.Hombres },
    { key: 'Mujeres', value: item.Mujeres },
    { key: 'Niños', value: item.Niños },
    { key: 'Veganos', value: item.Veganos },
  ]

  let peopleIndex = 0
  peopleItems.forEach((person) => {
    if (person.value && person.value !== 0) {
      doc.text(`${person.key}: ${person.value}`, margin + 25, yPos + peopleIndex * 5 + 3)
      peopleIndex++
    }
  })

  yPos += 30

  // ===== SHOPPING LIST SECTION =====
  doc.setTextColor(34, 197, 94) // Green-500
  doc.setFontSize(16)
  doc.setFont('helvetica', 'bold')
  doc.text('Lista de Compras', margin + 20, yPos)
  yPos += lineHeight

  doc.setTextColor(22, 101, 52) // Green-800
  doc.setFontSize(11)
  doc.setFont('helvetica', 'normal')

  const shoppingItems = [
    { key: 'Carne necesaria', icon: '•' },
    { key: 'Embutidos', icon: '•' },
    { key: 'Pan', icon: '•' },
    { key: 'Vegetales', icon: '•' },
    { key: 'Carbón', icon: '•' },
    { key: 'Cerveza', icon: '•' },
    { key: 'Vino', icon: '•' },
    { key: 'Bebidas', icon: '•' },
  ]

  let shoppingYPos = yPos + 3
  shoppingItems.forEach((shopItem) => {
    const value = item[shopItem.key]
    // More robust filtering for valid values
    if (
      value &&
      value !== 'No incluido' &&
      value !== 0 &&
      value !== '0kg' &&
      value !== '0.0kg' &&
      !value.toString().startsWith('0kg') &&
      !value.toString().startsWith('0.0')
    ) {
      doc.text(`${shopItem.icon} ${shopItem.key}: ${value}`, margin + 25, shoppingYPos)
      shoppingYPos += 6
    }
  })

  yPos += 65

  // ===== TOTAL SECTION =====

  doc.setTextColor(185, 28, 28) // Red-700
  doc.setFontSize(18)
  doc.setFont('helvetica', 'bold')
  doc.text(`TOTAL: ${item.Total}`, margin + 20, yPos + 5)

  doc.setFontSize(12)
  doc.text(`Por adulto: ${item['Por adulto']}`, margin + 20, yPos + 12)

  // Save the PDF
  doc.save(`${filename}.pdf`)
}

export function exportToCSV(data: ExportableData[], filename: string) {
  // Convert data to CSV format
  const headers = Object.keys(data[0])
  const csvContent = [
    headers.join(','), // Header row
    ...data.map((row) =>
      headers
        .map((header) => {
          const value = row[header]
          // Handle values that might contain commas
          return typeof value === 'string' && value.includes(',') ? `"${value}"` : value
        })
        .join(','),
    ),
  ].join('\n')

  // Create and trigger download
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  const url = URL.createObjectURL(blob)

  link.setAttribute('href', url)
  link.setAttribute('download', `${filename}.csv`)
  link.style.visibility = 'hidden'

  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
