import { File, MessageCircle } from 'lucide-react'

import { Button } from '~/components/ui/button'
import { exportToPDF } from '~/utils/export-utils'

interface ExportButtonsProps {
  data: Record<string, string | number | boolean | null>[]
  filename: string
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
  }
  budgetName?: string
  peopleCount?: number
  recommendedCuts?: Array<{ id: string; name: string }>
  peopleBreakdown?: {
    men: number
    women: number
    children: number
    vegan: number
  }
}

export function ExportButtons({
  data,
  filename,
  calculations,
  budgetName,
  peopleCount,
  recommendedCuts,
  peopleBreakdown,
}: ExportButtonsProps) {
  const handleExportPDF = async () => {
    try {
      await exportToPDF(data, filename, calculations)
    } catch (error) {
      console.error('Error exporting PDF:', error)
    }
  }

  const generateWhatsAppMessage = () => {
    if (!calculations || !budgetName || !peopleCount) return ''

    const formatPrice = (price: number) => `$${price.toLocaleString('es-CL')}`

    let message = `🔥 *PLANIFICACIÓN DE ASADO* 🔥\n\n`

    if (peopleBreakdown) {
      message += `👥 *PERSONAS:*\n`
      if (peopleBreakdown.men > 0) message += `👨 Hombres: ${peopleBreakdown.men}\n`
      if (peopleBreakdown.women > 0) message += `👩 Mujeres: ${peopleBreakdown.women}\n`
      if (peopleBreakdown.children > 0) message += `👶 Niños: ${peopleBreakdown.children}\n`
      if (peopleBreakdown.vegan > 0) message += `🥬 Veganos: ${peopleBreakdown.vegan}\n`
      message += `📊 Total: ${peopleCount} personas\n\n`
    } else {
      message += `👥 *Personas:* ${peopleCount}\n`
    }

    message += `💰 *Presupuesto:* ${budgetName}\n\n`
    message += `📝 *LISTA DE COMPRAS:*\n`

    // Only show carne if not vegan only
    const isVeganOnly = peopleBreakdown
      ? peopleBreakdown.vegan > 0 &&
        peopleBreakdown.men + peopleBreakdown.women + peopleBreakdown.children === 0
      : false

    if (calculations.meat > 0 && !isVeganOnly) {
      message += `🥩 Carne: ${calculations.meat}kg\n`
    }

    if (calculations.sausage > 0) {
      message += `🌭 Chorizo: ${calculations.sausage}kg\n`
      message += `🍞 Pan: ${calculations.bread}kg\n`
    }

    if (calculations.vegetables > 0) {
      message += `🥗 Vegetales: ${calculations.vegetables}kg\n`
    }

    if (calculations.carbon > 0) {
      message += `🔥 Carbón: ${calculations.carbon}kg\n`
    }

    if (calculations.veganOptions) {
      if (calculations.veganOptions.lentilBurgers > 0) {
        message += `🥬 Hamburguesas de lentejas: ${Math.round(calculations.veganOptions.lentilBurgers)} unidades\n`
      }
      if (calculations.veganOptions.tofu > 0) {
        message += `🥘 Tofu: ${calculations.veganOptions.tofu}kg\n`
      }
    }

    if (calculations.beer > 0) {
      const beerBottles = Math.ceil(calculations.beer / 330)
      message += `🍺 Cerveza: ${beerBottles} ${beerBottles === 1 ? 'botella' : 'botellas'} de 330ml\n`
    }

    if (calculations.wine > 0) {
      const wineBottles = Math.ceil(calculations.wine / 750)
      message += `🍷 Vino: ${wineBottles} ${wineBottles === 1 ? 'botella' : 'botellas'} de 750ml\n`
    }

    if (calculations.soda > 0) {
      const sodaBottles = Math.ceil(calculations.soda / 2000)
      message += `🥤 Bebidas: ${sodaBottles} ${sodaBottles === 1 ? 'botella' : 'botellas'} de 2L\n`
    }

    message += `\n💵 *TOTAL ESTIMADO:* ${formatPrice(calculations.totalPrice)}\n`
    message += `👤 *Por adulto:* ${formatPrice(calculations.pricePerAdult)}\n\n`

    if (recommendedCuts && recommendedCuts.length > 0) {
      message += `🥩 *CORTES RECOMENDADOS:*\n`
      recommendedCuts.forEach((cut, index) => {
        message += `${index + 1}. ${cut.name}\n`
      })
      message += `\n`
    }

    message += `📱 Calculado con Asadito App\n`
    message += `https://asaditoapp.com`

    return message
  }

  const handleWhatsAppShare = () => {
    const message = generateWhatsAppMessage()
    // Usar escape para preservar emojis correctamente
    const encodedMessage = encodeURIComponent(message).replace(/'/g, '%27').replace(/"/g, '%22')
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodedMessage}`
    window.open(whatsappUrl, '_blank')
  }

  return (
    <div className="flex flex-wrap gap-2">
      <Button onClick={handleExportPDF} variant="outline">
        <File className="mr-2 size-4" />
        Exportar a PDF
      </Button>
      {calculations && budgetName && peopleCount && (
        <Button
          onClick={handleWhatsAppShare}
          variant="outline"
          className="bg-green-600 text-white hover:bg-green-700"
        >
          <MessageCircle className="mr-2 size-4" />
          Compartir por WhatsApp
        </Button>
      )}
    </div>
  )
}
