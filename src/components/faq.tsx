'use client'

import { Section } from '~/components/ui/section'

interface FAQItem {
  question: string
  answer: string
  details?: {
    title?: string
    items?: Array<{
      label: string
      description: string
    }>
  }
}

const faqItems: FAQItem[] = [
  {
    question: '¿Qué es el Cap Rate?',
    answer:
      'El Cap Rate (Tasa de Capitalización) es una métrica que mide el rendimiento potencial de una inversión inmobiliaria. Se calcula dividiendo el ingreso neto operativo anual entre el valor de la propiedad.',
  },
  {
    question: '¿Qué es el Cap Rate Neto y cómo se clasifica?',
    answer:
      'El Cap Rate Neto es una métrica más precisa que el Cap Rate bruto, ya que considera los gastos operativos. Se calcula: ((Arriendo Anual × Ocupación × (1-Administración)) - Contribuciones - Mantenimiento) / Inversión Total × 100.',
    details: {
      title: 'Cómo se clasifica:',
      items: [
        {
          label: '🥳 Excelente (más de 8%):',
          description:
            'Indica una inversión altamente rentable con excelentes retornos. La propiedad genera ingresos netos muy superiores a la inversión inicial.',
        },
        {
          label: '😁 Bueno (6-8%):',
          description:
            'Representa una inversión sólida con buenos retornos. Está por encima del promedio del mercado y genera ingresos consistentes.',
        },
        {
          label: '🧐 Regular (3-6%):',
          description:
            'Rendimiento moderado, cercano al promedio del mercado. Puede ser aceptable dependiendo de la ubicación y el potencial de plusvalía.',
        },
        {
          label: '🙁 Bajo (menos de 3%):',
          description:
            'Rendimiento inferior al mercado. Sugiere reevaluar la inversión o buscar oportunidades de optimización de ingresos y reducción de gastos.',
        },
      ],
    },
  },
  {
    question: '¿Qué es el ROI?',
    answer:
      'El ROI (Return on Investment o Retorno sobre la Inversión) es una métrica que mide la rentabilidad de una inversión en relación con su costo. Se calcula dividiendo el beneficio neto entre la inversión total y multiplicando por 100 para obtener el porcentaje.',
  },
  {
    question: '¿Qué son las contribuciones?',
    answer:
      'Las contribuciones son impuestos que se pagan al municipio por la propiedad del inmueble. El monto varía según la ubicación y el valor fiscal de la propiedad.',
  },
  {
    question: '¿Qué es la plusvalía?',
    answer:
      'La plusvalía es el incremento en el valor de una propiedad a lo largo del tiempo. Este aumento puede deberse a mejoras en la zona, desarrollo urbano, inflación o cambios en el mercado inmobiliario.',
  },
  {
    question: '¿Qué es la UF?',
    answer:
      'La UF (Unidad de Fomento) es una unidad de cuenta reajustable de acuerdo con la inflación. Se utiliza en Chile para valorizar bienes, servicios e inversiones, protegiendo su valor real en el tiempo.',
  },
  {
    question: '¿Qué es el CAE?',
    answer:
      'El CAE (Carga Anual Equivalente) representa el costo total del crédito expresado como porcentaje anual. Incluye la tasa de interés, comisiones y otros gastos asociados al préstamo.',
  },
  {
    question: '¿Qué gastos debo considerar al invertir en una propiedad?',
    answer:
      'Los principales gastos incluyen: contribuciones, gastos comunes, mantenimiento, reparaciones, seguros, y en caso de financiamiento, el dividendo mensual. También hay que considerar períodos sin arriendo y posibles morosos.',
  },
  {
    question: '¿Qué es la amortización del crédito?',
    answer:
      'La amortización del crédito es el proceso de pago gradual de una deuda hipotecaria. Cada dividendo mensual incluye dos partes: una porción que reduce el capital (amortización) y otra que paga los intereses. Al inicio del crédito, la mayor parte del dividendo va a intereses, pero esta proporción se invierte gradualmente a lo largo del tiempo.',
  },
  {
    question: '¿Qué es el dividendo a renta?',
    answer:
      'Es la relación entre el dividendo mensual y el arriendo mensual esperado. Una relación menor a 1 indica que el arriendo cubre el dividendo, mientras que una relación mayor a 1 significa que necesitarás aportar dinero adicional para cubrir el dividendo.',
  },
  {
    question: '¿Qué son los gastos comunes?',
    answer:
      'Son los gastos mensuales que se pagan a la administración del edificio o condominio para cubrir servicios como limpieza, seguridad, mantención de áreas comunes, ascensores, etc.',
  },
  {
    question: '¿Qué es el pie mínimo recomendado?',
    answer:
      'Para propiedades de inversión, se recomienda un pie mínimo del 20%. Un pie mayor reduce el dividendo mensual y mejora el flujo de caja, pero también reduce el apalancamiento financiero.',
  },
]

const glossaryItems: FAQItem[] = [
  {
    question: 'Pie o Pie inicial',
    answer:
      'Es el monto inicial que se paga al comprar una propiedad. Generalmente representa entre un 20% y 30% del valor total del inmueble.',
  },
  {
    question: 'Gastos operativos',
    answer:
      'Son los gastos necesarios para mantener y operar la propiedad, incluyendo mantenimiento, contribuciones, seguros y gastos de administración.',
  },
  {
    question: 'Tasa de ocupación',
    answer:
      'Porcentaje del tiempo que la propiedad está arrendada durante un período. Por ejemplo, una ocupación del 90% significa que la propiedad está arrendada 11 meses del año.',
  },
  {
    question: 'Gastos de administración',
    answer:
      'Comisión que se paga a una empresa o persona por administrar la propiedad, incluyendo el cobro de arriendos y la gestión de mantenimiento.',
  },
  {
    question: 'Mantenimiento',
    answer:
      'Gastos relacionados con la conservación y reparación de la propiedad para mantenerla en buen estado y conservar su valor.',
  },
  {
    question: 'Ingreso Neto Operativo',
    answer:
      'Es el ingreso total por arriendos menos todos los gastos operativos (mantención, contribuciones, seguros, etc.). No incluye el pago del crédito hipotecario.',
  },
  {
    question: 'Dividendo',
    answer:
      'Es el pago mensual del crédito hipotecario. Incluye amortización (pago del capital) e intereses. Se calcula según el monto del crédito, plazo y tasa de interés (CAE).',
  },
  {
    question: 'Corretaje',
    answer:
      'Comisión que se paga al corredor de propiedades por sus servicios. Generalmente es un porcentaje del valor de la propiedad en caso de venta, o un porcentaje del arriendo en caso de gestionar el arriendo.',
  },
  {
    question: 'Apalancamiento financiero',
    answer:
      'Es el uso de deuda (crédito hipotecario) para financiar una inversión. Permite comprar una propiedad de mayor valor con menos capital propio, potenciando los retornos pero también aumentando el riesgo.',
  },
  {
    question: 'Plusvalía esperada',
    answer:
      'Es la estimación del incremento en el valor de la propiedad en el tiempo. Se puede calcular estudiando el comportamiento histórico de los precios en el sector y las proyecciones de desarrollo de la zona.',
  },
  {
    question: 'Rentabilidad total',
    answer:
      'Es la suma de la rentabilidad por arriendo (Cap Rate) más la plusvalía anual esperada. Representa el retorno total de la inversión considerando tanto el flujo de caja como la apreciación del activo.',
  },
  {
    question: 'Seguro de desgravamen',
    answer:
      'Es un seguro obligatorio al contratar un crédito hipotecario que cubre el saldo de la deuda en caso de fallecimiento del deudor. Su costo se incluye en el dividendo mensual.',
  },
  {
    question: 'Seguro de incendio',
    answer:
      'Es un seguro obligatorio para propiedades con crédito hipotecario que cubre daños por incendio y otros siniestros. Es recomendable mantenerlo incluso sin crédito vigente.',
  },
  {
    question: 'Gastos operacionales',
    answer:
      'Son los costos asociados al proceso del crédito hipotecario necesarios para su aprobación. Incluyen: tasación hipotecaria, estudio de títulos, borrador de escritura, gastos notariales, impuesto al crédito y la inscripción en el Conservador de Bienes Raíces. Generalmente representan entre 0.7% y 0.8% del precio total de la propiedad.',
  },
]

export function FAQ() {
  return (
    <div className="space-y-12">
      <Section variant="blue-dark">
        <h2 className="font-playfair mb-8 text-2xl font-semibold text-slate-900 dark:text-slate-100">
          Preguntas Frecuentes
        </h2>

        <div className="space-y-8">
          {faqItems.map((item, index) => (
            <div
              key={index}
              className="rounded-xl border border-slate-200/50 bg-white/50 p-6 shadow-sm backdrop-blur-sm transition-all hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900/50 dark:hover:border-slate-700">
              <h3 className="font-playfair mb-3 text-lg font-medium text-slate-900 dark:text-slate-100">
                {item.question}
              </h3>
              <p className="leading-relaxed text-slate-600 dark:text-slate-400">{item.answer}</p>
              {item.details && (
                <div className="mt-6">
                  <h4 className="mb-3 font-medium text-slate-900 dark:text-slate-100">
                    {item.details.title}
                  </h4>
                  <ul className="space-y-4 rounded-lg p-4 dark:bg-slate-800/50">
                    {item.details.items?.map((detail, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="text-lg">{detail.label.split(' ')[0]}</span>
                        <div>
                          <span className="font-medium text-slate-700 dark:text-slate-300">
                            {detail.label.split(' ').slice(1).join(' ')}
                          </span>{' '}
                          <span className="text-slate-600 dark:text-slate-400">
                            {detail.description}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </Section>

      <Section variant="gray">
        <h2 className="font-playfair mb-8 text-2xl font-semibold text-slate-900 dark:text-slate-100">
          Glosario de Términos
        </h2>

        <div className="grid gap-6 sm:grid-cols-2">
          {glossaryItems.map((item, index) => (
            <div
              key={index}
              className="rounded-xl border border-slate-200 bg-white/50 p-5 shadow-sm transition-all hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700">
              <h3 className="font-playfair mb-2 text-lg font-medium text-slate-900 dark:text-slate-100">
                {item.question}
              </h3>
              <p className="leading-relaxed text-slate-600 dark:text-slate-400">{item.answer}</p>
            </div>
          ))}
        </div>
      </Section>
    </div>
  )
}
