import { jsPDF } from 'jspdf'

import { budgets } from '~/data/budgets'

interface ExportableData {
  [key: string]: string | number | boolean | null | undefined
  budgetId?: number
}

// Function to remove emojis and special characters for PDF compatibility
function cleanTextForPDF(text: string): string {
  return text
    .replace(
      /[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu,
      '',
    )
    .trim()
}

// Function to convert image to base64 with high quality
function getImageAsBase64(src: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = 'anonymous'

    img.onload = function () {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')

      // Use higher resolution for better quality
      const scale = 4 // 4x resolution for crisp quality
      canvas.width = 100 * scale
      canvas.height = 100 * scale

      // Enable high-quality image rendering
      if (ctx) {
        ctx.imageSmoothingEnabled = true
        ctx.imageSmoothingQuality = 'high'
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
      }

      resolve(canvas.toDataURL('image/png', 1.0)) // Maximum quality
    }

    img.onerror = reject
    img.src = src
  })
}

export async function exportToPDF(
  data: ExportableData[],
  filename: string,
  calculations?: {
    meat: number
    sausage: number
    bread: number
    vegetables: number
    carbon: number
    beer: number
    wine: number
    soda: number
    totalPrice: number
    pricePerAdult: number
  },
) {
  const doc = new jsPDF()
  const pageWidth = doc.internal.pageSize.getWidth()
  const pageHeight = doc.internal.pageSize.getHeight()
  const margin = 5
  const lineHeight = 8
  let yPos = margin + 10

  // Add horizontal lines with 20% opacity (like notebook paper)
  doc.setDrawColor(224, 231, 255) // Light blue-gray
  doc.setLineWidth(0.2) // Increased thickness for better visibility at 20% opacity
  for (let y = margin; y < pageHeight - margin; y += lineHeight) {
    doc.line(margin, y, pageWidth - margin, y)
  }

  // Add vertical red margin line (like notebook) - 20% opacity
  doc.setDrawColor(252, 165, 165) // Light red color
  doc.setLineWidth(1)
  doc.line(margin + 5, 0, margin + 5, pageHeight)

  // ===== LOGO IMAGE =====
  try {
    const imgData = await getImageAsBase64('/images/img-asadito.png')
    doc.addImage(imgData, 'PNG', margin + 10, yPos - 5, 25, 25) // Bigger 25x25 size
    yPos += 30 // Add space after image
  } catch (error) {
    console.warn('Could not load asadito image for PDF:', error)
  }

  // ===== APP TITLE & SUBTITLE =====
  doc.setTextColor(0, 0, 0) // Black
  doc.setFontSize(24)
  doc.setFont('times', 'bold') // Georgia equivalent in jsPDF
  doc.text('Asadito App', margin + 10, yPos)

  yPos += lineHeight * 1.5

  const item = data[0]

  // ===== BUDGET TYPE =====
  const budgetId = item.budgetId
  const selectedBudget = budgets.find((b) => b.id === budgetId)

  if (selectedBudget) {
    doc.setTextColor(0, 0, 0) // Black
    doc.setFontSize(14)
    doc.setFont('helvetica', 'normal') // Sans font
    doc.text(`Tipo de presupuesto: ${cleanTextForPDF(selectedBudget.name)}`, margin + 10, yPos)
  }

  yPos += lineHeight * 2

  // ===== PEOPLE SECTION =====
  doc.setTextColor(0, 0, 0) // Black
  doc.setFontSize(16)
  doc.setFont('times', 'bold') // Georgia equivalent for titles
  doc.text('Comensales', margin + 10, yPos)
  yPos += lineHeight

  doc.setTextColor(0, 0, 0) // Black
  doc.setFontSize(12)
  doc.setFont('helvetica', 'normal') // Sans font

  const peopleItems = [
    { key: 'Hombres', value: item.Hombres },
    { key: 'Mujeres', value: item.Mujeres },
    { key: 'Niños', value: item.Niños },
    { key: 'Veganos', value: item.Veganos },
  ]

  let peopleIndex = 0
  peopleItems.forEach((person) => {
    if (person.value && person.value !== 0) {
      doc.text(`${person.key}: ${person.value}`, margin + 15, yPos + peopleIndex * 5 + 3)
      peopleIndex++
    }
  })

  yPos += 30

  // ===== SHOPPING LIST SECTION =====
  doc.setTextColor(0, 0, 0) // Black
  doc.setFontSize(16)
  doc.setFont('times', 'bold') // Georgia equivalent for titles
  doc.text('Lista de Compras', margin + 10, yPos)
  yPos += lineHeight

  doc.setTextColor(0, 0, 0) // Black
  doc.setFontSize(11)
  doc.setFont('helvetica', 'normal') // Sans font

  let shoppingYPos = yPos + 3

  // Use calculations if available for better formatting, otherwise fall back to data items
  if (calculations) {
    // Format items with proper bottle calculations
    const calculatedItems = [
      { key: 'Carne', value: `${calculations.meat}kg`, show: calculations.meat > 0 },
      { key: 'Embutidos', value: `${calculations.sausage}kg`, show: calculations.sausage > 0 },
      { key: 'Pan', value: `${calculations.bread}kg`, show: calculations.bread > 0 },
      {
        key: 'Vegetales',
        value: `${calculations.vegetables}kg`,
        show: calculations.vegetables > 0,
      },
      { key: 'Carbon', value: `${calculations.carbon}kg`, show: calculations.carbon > 0 },
      {
        key: 'Cerveza',
        value: (() => {
          const bottles = Math.ceil(calculations.beer / 330)
          return `${bottles} ${bottles === 1 ? 'botella' : 'botellas'} de 330ml`
        })(),
        show: calculations.beer > 0,
      },
      {
        key: 'Vino',
        value: (() => {
          const bottles = Math.ceil(calculations.wine / 750)
          return `${bottles} ${bottles === 1 ? 'botella' : 'botellas'} de 750ml`
        })(),
        show: calculations.wine > 0,
      },
      {
        key: 'Bebidas',
        value: (() => {
          const bottles = Math.ceil(calculations.soda / 2000)
          return `${bottles} ${bottles === 1 ? 'botella' : 'botellas'} de 2L`
        })(),
        show: calculations.soda > 0,
      },
    ]

    calculatedItems.forEach((calcItem) => {
      if (calcItem.show) {
        doc.text(`• ${calcItem.key}: ${calcItem.value}`, margin + 15, shoppingYPos)
        shoppingYPos += 6
      }
    })
  } else {
    // Fallback to original logic for backwards compatibility
    const shoppingItems = [
      { key: 'Carne necesaria', icon: '•' },
      { key: 'Embutidos', icon: '•' },
      { key: 'Pan', icon: '•' },
      { key: 'Vegetales', icon: '•' },
      { key: 'Carbón', icon: '•' },
      { key: 'Cerveza', icon: '•' },
      { key: 'Vino', icon: '•' },
      { key: 'Bebidas', icon: '•' },
      { key: 'Hamburguesas de lentejas', icon: '•' },
      { key: 'Verduras asadas veganas', icon: '•' },
      { key: 'Tofu marinado', icon: '•' },
    ]

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
        const cleanKey = cleanTextForPDF(shopItem.key)
        const cleanValue = typeof value === 'string' ? cleanTextForPDF(value) : value
        doc.text(`${shopItem.icon} ${cleanKey}: ${cleanValue}`, margin + 15, shoppingYPos)
        shoppingYPos += 6
      }
    })
  }

  yPos += 65

  // ===== TOTAL SECTION =====
  doc.setTextColor(0, 0, 0) // Black
  doc.setFontSize(18)
  doc.setFont('times', 'bold') // Georgia equivalent for titles
  doc.text(`TOTAL: ${item.Total}`, margin + 10, yPos + 5)

  doc.setFontSize(12)
  doc.setFont('helvetica', 'normal') // Sans font
  doc.text(`Por adulto: ${item['Por adulto']}`, margin + 10, yPos + 12)

  yPos += 30

  // ===== ANEXO: CORTES RECOMENDADOS =====
  if (selectedBudget) {
    // Check if we need a new page
    if (yPos > pageHeight - 80) {
      doc.addPage()
      yPos = margin
    }

    doc.setTextColor(0, 0, 0) // Black
    doc.setFontSize(16)
    doc.setFont('times', 'bold') // Georgia equivalent for titles
    doc.text(`Cortes Recomendados`, margin + 10, yPos)
    yPos += lineHeight

    doc.setTextColor(0, 0, 0) // Black
    doc.setFontSize(11)
    doc.setFont('helvetica', 'normal') // Sans font

    selectedBudget.meats.forEach((meat, index) => {
      doc.text(`• ${cleanTextForPDF(meat.name)}`, margin + 15, yPos + index * 6)
    })
  }

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
