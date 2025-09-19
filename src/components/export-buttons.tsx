import { Button } from '~/components/ui/button'
import { exportToPDF } from '~/utils/export-utils'

interface ExportButtonsProps {
  data: Record<string, string | number | boolean | null>[]
  filename: string
}

export function ExportButtons({ data, filename }: ExportButtonsProps) {
  const handleExportPDF = async () => {
    try {
      await exportToPDF(data, filename)
    } catch (error) {
      console.error('Error exporting PDF:', error)
    }
  }

  return (
    <div className="flex flex-wrap gap-2">
      <Button onClick={handleExportPDF} variant="outline">
        Exportar a PDF 📄
      </Button>
    </div>
  )
}
