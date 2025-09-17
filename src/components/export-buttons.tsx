import { Button } from '~/components/ui/button'
import { exportToPDF } from '~/utils/export-utils'

interface ExportButtonsProps {
  data: Record<string, any>[]
  filename: string
}

export function ExportButtons({ data, filename }: ExportButtonsProps) {
  const handleExportPDF = () => {
    exportToPDF(data, filename)
  }

  return (
    <div className="flex flex-wrap gap-2">
      <Button onClick={handleExportPDF} variant="outline">
        Exportar a PDF 📄
      </Button>
    </div>
  )
}
