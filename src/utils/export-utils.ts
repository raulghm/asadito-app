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

// Function to draw notebook lines directly on PDF (no canvas image)
function drawNotebookLines(doc: jsPDF, pageWidth: number, pageHeight: number) {
  // Set white background
  doc.setFillColor(255, 255, 255)
  doc.rect(0, 0, pageWidth, pageHeight, 'F')

  // Draw grid lines like notebook paper (horizontal and vertical)
  doc.setDrawColor(224, 231, 255) // Light blue-gray #e0e7ff
  doc.setLineWidth(0.1)

  // Draw horizontal lines every 7px
  for (let y = 7; y < pageHeight; y += 7) {
    doc.line(0, y, pageWidth, y)
  }

  // Draw vertical lines every 7px to create grid
  for (let x = 7; x < pageWidth; x += 7) {
    doc.line(x, 0, x, pageHeight)
  }

  // Draw red vertical margin line at 15px (scaled for PDF)
  doc.setDrawColor(252, 165, 165) // Light red #fca5a5
  doc.setLineWidth(0.4)
  doc.line(15, 0, 15, pageHeight)
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
    veganOptions?: {
      lentilBurgers: number
      tofu: number
    }
  },
) {
  const doc = new jsPDF()
  const pageWidth = doc.internal.pageSize.getWidth()
  const pageHeight = doc.internal.pageSize.getHeight()

  // Draw notebook lines directly on PDF (much smaller file size)
  drawNotebookLines(doc, pageWidth, pageHeight)

  // Set up positioning to match shopping-list.tsx (ml-10 = 40px margin)
  const leftMargin = 24 // Equivalent to ml-10 in PDF scale
  const topMargin = 20

  // ===== HEADER/LEGEND SECTION =====
  const headerYPos = 10

  // Generation date on the right side of header
  doc.setTextColor(25, 50, 150) // Classic BIC blue from 90s
  doc.setFontSize(10)
  doc.setFont('times', 'normal')
  const currentDate = new Date().toLocaleDateString('es-CL', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
  const dateText = currentDate
  const dateWidth = doc.getTextWidth(dateText)
  doc.text(dateText, pageWidth - dateWidth - 10, headerYPos + 8)

  // Start main content after header
  let yPos = topMargin + 15

  const item = data[0]
  const budgetId = item.budgetId
  const selectedBudget = budgets.find((b) => b.id === budgetId)

  // Add engaging title
  doc.setTextColor(25, 50, 150) // Classic BIC blue from 90s
  doc.setFontSize(18)
  doc.setFont('times', 'bold') // Serif font
  doc.text('Tu asadito está listo', leftMargin, yPos)
  yPos += 12

  if (selectedBudget) {
    doc.setTextColor(25, 50, 150) // Classic BIC blue from 90s
    doc.setFontSize(12)
    doc.setFont('times', 'normal')
    doc.text(`Presupuesto: ${cleanTextForPDF(selectedBudget.name)}`, leftMargin, yPos)
    yPos += 10
  }

  yPos += 5

  // ===== SHOPPING LIST SECTION =====
  doc.setTextColor(25, 50, 150) // Classic BIC blue from 90s
  doc.setFontSize(16) // text-base equivalent
  doc.setFont('times', 'bold') // font-serif font-semibold
  doc.text('Lista de Compras', leftMargin, yPos)
  yPos += 12 // mb-4 equivalent

  // Set text styling to match shopping-list.tsx (font-serif text-lg)
  doc.setTextColor(25, 50, 150) // Classic BIC blue from 90s
  doc.setFontSize(14) // text-lg equivalent
  doc.setFont('times', 'normal') // font-serif

  const lineSpacing = 8 // space-y-2 equivalent

  if (calculations) {
    // Exactly match the order and logic from shopping-list.tsx

    // • Carne: {calculations.meat}kg (only if meat > 0, not vegan only)
    if (calculations.meat > 0) {
      doc.text(`• Carne: ${calculations.meat}kg`, leftMargin, yPos)
      yPos += lineSpacing
    }

    // Chorizo and Pan (only if sausage > 0)
    if (calculations.sausage > 0) {
      doc.text(`• Chorizo: ${calculations.sausage}kg`, leftMargin, yPos)
      yPos += lineSpacing
      doc.text(`• Pan: ${calculations.bread}kg`, leftMargin, yPos)
      yPos += lineSpacing
    }

    // Vegetables (only if > 0)
    if (calculations.vegetables && calculations.vegetables > 0) {
      doc.text(`• Vegetales: ${calculations.vegetables}kg`, leftMargin, yPos)
      yPos += lineSpacing
    }

    // Vegan options (only if they exist)
    if (calculations.veganOptions) {
      if (calculations.veganOptions.lentilBurgers > 0) {
        doc.text(
          `• Hamburguesas de lentejas: ${Math.round(calculations.veganOptions.lentilBurgers)} unidades`,
          leftMargin,
          yPos,
        )
        yPos += lineSpacing
      }
      if (calculations.veganOptions.tofu > 0) {
        doc.text(`• Tofu: ${calculations.veganOptions.tofu}kg`, leftMargin, yPos)
        yPos += lineSpacing
      }
    }

    // Beer (only if > 0)
    if (calculations.beer && calculations.beer > 0) {
      const beerBottles = Math.ceil(calculations.beer / 330)
      const beerText = `• Cerveza: ${beerBottles} ${beerBottles === 1 ? 'botella' : 'botellas'} de 330ml`
      doc.text(beerText, leftMargin, yPos)
      yPos += lineSpacing
    }

    // Wine (only if > 0)
    if (calculations.wine && calculations.wine > 0) {
      const wineBottles = Math.ceil(calculations.wine / 750)
      const wineText = `• Vino: ${wineBottles} ${wineBottles === 1 ? 'botella' : 'botellas'} de 750ml`
      doc.text(wineText, leftMargin, yPos)
      yPos += lineSpacing
    }

    // Soda/Drinks (only if > 0) - matching the "Bebidas/Jugos" text exactly
    if (calculations.soda && calculations.soda > 0) {
      const sodaBottles = Math.ceil(calculations.soda / 2000)
      const sodaText = `• Bebidas/Jugos: ${sodaBottles} ${sodaBottles === 1 ? 'botella' : 'botellas'} de 2L`
      doc.text(sodaText, leftMargin, yPos)
      yPos += lineSpacing
    }

    // Carbon at the end (only if > 0)
    if (calculations.carbon > 0) {
      doc.text(`• Carbón: ${calculations.carbon}kg`, leftMargin, yPos)
      yPos += lineSpacing
    }
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
        doc.text(`${shopItem.icon} ${cleanKey}: ${cleanValue}`, leftMargin, yPos)
        yPos += lineSpacing
      }
    })
  }

  yPos += 5

  // ===== TOTAL SECTION =====
  doc.setTextColor(25, 50, 150) // Classic BIC blue from 90s
  doc.setFontSize(16)
  doc.setFont('times', 'bold') // Serif font
  doc.text(`Total: ${item.Total}`, leftMargin, yPos)

  yPos += 10
  doc.setTextColor(25, 50, 150) // Classic BIC blue from 90s
  doc.setFontSize(12)
  doc.setFont('times', 'normal') // Serif font
  doc.text(`Por adulto: ${item['Por adulto']}`, leftMargin, yPos)

  yPos += 20

  // ===== ANEXO: CORTES RECOMENDADOS =====
  if (selectedBudget) {
    // Check if we need a new page
    if (yPos > pageHeight - 80) {
      doc.addPage()
      // Draw notebook lines on new page
      drawNotebookLines(doc, pageWidth, pageHeight)
      yPos = topMargin
    }

    doc.setTextColor(25, 50, 150) // Classic BIC blue from 90s
    doc.setFontSize(14)
    doc.setFont('times', 'bold') // Serif font
    doc.text(`Cortes Recomendados`, leftMargin, yPos)
    yPos += 10

    doc.setTextColor(25, 50, 150) // Classic BIC blue from 90s
    doc.setFontSize(12)
    doc.setFont('times', 'normal') // Serif font

    selectedBudget.meats.forEach((meat, index) => {
      doc.text(`• ${cleanTextForPDF(meat.name)}`, leftMargin, yPos + index * 6)
    })
  }

  // Add URL at bottom of page
  doc.setTextColor(25, 50, 150) // Classic BIC blue from 90s
  doc.setFontSize(10)
  doc.setFont('times', 'normal')
  const urlText = 'https://asaditoapp.com'
  const urlWidth = doc.getTextWidth(urlText)
  doc.text(urlText, (pageWidth - urlWidth) / 2, pageHeight - 10) // Centered at bottom

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
