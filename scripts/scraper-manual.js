#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-require-imports */

/**
 * 🎯 SCRAPER MANUAL PARA ASADITO APP
 *
 * Script para actualizar precios de carnes manualmente desde Lider.cl
 *
 * Uso:
 * node scripts/scraper-manual.js
 * node scripts/scraper-manual.js --product carnicero
 * node scripts/scraper-manual.js --url "https://super.lider.cl/ip/vacuno/00209514000000"
 */

const fs = require('fs')
const path = require('path')

const axios = require('axios')
const cheerio = require('cheerio')

// URLs de productos conocidos - IDs sincronizados con budgets.js

const PRODUCT_URLS = [
  {
    id: 'carnicero',
    name: 'Carnicero',
    lider: {
      url: 'https://super.lider.cl/ip/vacuno/00209514000000',
    },
    jumbo: {
      url: 'https://www.jumbo.cl/asado-del-carnicero-cat-v/p',
    },
  },
  {
    id: 'sobre-costilla',
    name: 'Sobre costilla',
    lider: {
      url: 'https://super.lider.cl/ip/vacuno/00213583000000',
    },
    jumbo: {
      url: 'https://www.jumbo.cl/sobrecostilla-cat-v/p',
    },
  },
  {
    id: 'tapapecho',
    name: 'Tapapecho',
    lider: {
      url: 'https://super.lider.cl/ip/vacuno/00213922000000',
    },
    jumbo: {
      url: 'https://www.jumbo.cl/tapapecho-cat-v/p',
    },
  },
  {
    id: 'abastero',
    name: 'Abastero',
    lider: {
      url: 'https://super.lider.cl/ip/vacuno/00218103000000',
    },
    jumbo: {
      url: 'https://www.jumbo.cl/abastero-cat-v/p',
    },
  },
  {
    id: 'huachalomo',
    name: 'Huachalomo',
    lider: {
      url: 'https://super.lider.cl/ip/vacuno/00210647000000',
    },
    jumbo: {
      url: 'https://www.jumbo.cl/huachalomo-cat-v/p',
    },
  },
  {
    id: 'tapabarriga',
    name: 'Tapabarriga',
    lider: {
      url: 'https://super.lider.cl/ip/vacuno/00213780000000',
    },
    jumbo: {
      url: 'https://www.jumbo.cl/tapabarriga-cat-v/p',
    },
  },
  {
    id: 'punta-paleta',
    name: 'Punta paleta',
    lider: {
      url: 'https://super.lider.cl/ip/vacuno/00213197000000',
    },
    jumbo: {
      url: 'https://www.jumbo.cl/punta-paleta-cat-v/p',
    },
  },
  {
    id: 'plateada',
    name: 'Plateada',
    lider: {
      url: 'https://super.lider.cl/ip/todas-las-carnes/00211820000000',
    },
    jumbo: {
      url: 'https://www.jumbo.cl/plateada-cat-v/p',
    },
  },
  {
    id: 'punta-picana',
    name: 'Punta picana',
    lider: {
      url: 'https://super.lider.cl/ip/vacuno/00213383000000',
    },
    jumbo: {
      url: 'https://www.jumbo.cl/punta-picana-cat-v/p',
    },
  },
  {
    id: 'asiento',
    name: 'Asiento',
    lider: {
      url: null, // TODO: Buscar URL de Lider
    },
    jumbo: {
      url: 'https://www.jumbo.cl/asiento-cat-v/p',
    },
  },
  {
    id: 'asado-de-tira',
    name: 'Asado de tira',
    lider: {
      url: 'https://super.lider.cl/ip/00209256000000',
    },
    jumbo: {
      url: null,
    },
  },
  {
    id: 'Asiento',
    name: 'Asiento',
    lider: {
      url: 'https://super.lider.cl/ip/vacuno/00209319000000',
    },
    jumbo: {
      url: 'https://www.jumbo.cl/asiento-cat-v/p',
    },
  },
  {
    id: 'punta-de-ganso',
    name: 'Punta de ganso',
    lider: {
      url: 'https://super.lider.cl/ip/vacuno/00213037000000',
    },
    jumbo: {
      url: 'https://www.jumbo.cl/punta-de-ganso-cat-v/p',
    },
  },
  {
    id: 'lomo-liso',
    name: 'Lomo liso',
    lider: {
      url: 'https://super.lider.cl/ip/todas-las-carnes/00210916000000',
    },
    jumbo: {
      url: 'https://www.jumbo.cl/lomoliso-envasado-12kgaprox/p',
    },
  },
  {
    id: 'palanca',
    name: 'Palanca',
    lider: {
      url: 'https://super.lider.cl/ip/todas-las-carnes/palanca/00209126000000',
    },
    jumbo: {
      url: 'https://www.jumbo.cl/palanca-cat-v/p',
    },
  },
  {
    id: 'lomo-vetado',
    name: 'Lomo vetado',
    lider: {
      url: 'https://super.lider.cl/ip/vacuno/00211201000000',
    },
    jumbo: {
      url: 'https://www.jumbo.cl/lomo-vetado-cat-v-40/p',
    },
  },
  {
    id: 'filete',
    name: 'Filete',
    lider: {
      url: 'https://super.lider.cl/ip/vacuno/00210169000000',
    },
    jumbo: {
      url: 'https://www.jumbo.cl/filete-cat-v/p',
    },
  },
  {
    id: 'entrana',
    name: 'Entraña',
    lider: {
      url: 'https://super.lider.cl/ip/vacuno/00210061000000',
    },
    jumbo: {
      url: 'https://www.jumbo.cl/entrana-eeuu-v-va/p',
    },
  },
  {
    id: 'lomo-vetado-premium',
    name: 'Lomo vetado premium',
    lider: {
      url: 'https://super.lider.cl/ip/00218267000000',
    },
    jumbo: {
      url: 'https://www.jumbo.cl/lomo-vetado-angus-a-punto-11-kg-aprox/p',
    },
  },
  {
    id: 'filete-premium',
    name: 'Filete premium',
    lider: {
      url: null,
    },
    jumbo: {
      url: 'https://www.jumbo.cl/filete-premium-kg/p',
    },
  },
]

class SupermarketScraper {
  constructor() {
    // Scraper unificado para Lider y Jumbo con Axios + Cheerio
  }

  // Detectar el tipo de supermercado por URL
  detectSupermarket(url) {
    if (url.includes('lider.cl')) {
      return 'lider'
    } else if (url.includes('jumbo.cl')) {
      return 'jumbo'
    }
    return 'unknown'
  }

  // Método específico para Jumbo.cl
  async scrapeJumboPrice(url) {
    try {
      console.log(`🟠 Scraping Jumbo: ${url}`)

      const response = await axios.get(url, {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
          'Accept-Language': 'es-ES,es;q=0.8,en-US;q=0.5,en;q=0.3',
          'Accept-Encoding': 'gzip, deflate',
        },
      })

      console.log(`📄 Respuesta Jumbo obtenida (${response.data.length} caracteres)`)

      const $ = cheerio.load(response.data)

      // Verificar si el producto está disponible (no agotado)
      const outOfStockIndicators = [
        'agotado',
        'sin stock',
        'no disponible',
        'producto no encontrado',
        'temporalmente no disponible',
        'fuera de stock',
      ]

      const pageText = $.text().toLowerCase()
      const isOutOfStock = outOfStockIndicators.some((indicator) => pageText.includes(indicator))

      if (isOutOfStock) {
        console.log('⚠️  Producto Jumbo parece estar agotado o no disponible')
        return {
          success: false,
          error: 'Producto agotado o no disponible en Jumbo - no se actualizará budgets.js',
        }
      }

      console.log('🔍 Buscando precios específicos en Jumbo usando XPath...')

      let normalPrice = null
      let promoPrice = null

      // Convertir XPath a selector CSS: /html/body/div[1]/div/main/div[1]/div/div[3]/div[1]
      const jumboXPathSelector =
        'body > div:nth-child(1) > div > main > div:nth-child(1) > div > div:nth-child(3) > div:nth-child(1)'

      console.log(`🎯 Buscando en contenedor específico: ${jumboXPathSelector}`)

      const priceContainer = $(jumboXPathSelector)

      if (priceContainer.length > 0) {
        const containerText = priceContainer.text().trim()
        console.log(`📦 Contenido del contenedor de precios: "${containerText}"`)

        // Extraer todos los precios del contenedor
        const allPrices = []
        const priceRegex = /\$(\d{1,2}[\.,]?\d{3})/g
        let match

        while ((match = priceRegex.exec(containerText)) !== null) {
          const cleanPrice = match[1].replace(/[^\d]/g, '')
          const price = parseInt(cleanPrice, 10)
          if (!isNaN(price) && price > 100) {
            // Permitir precios más bajos para trozos
            allPrices.push(price)
          }
        }

        console.log(
          `💰 Precios encontrados en Jumbo: ${allPrices.map((p) => '$' + p.toLocaleString()).join(', ')}`,
        )

        if (allPrices.length >= 3) {
          console.log(`📊 Análisis de precios Jumbo (${allPrices.length} precios encontrados):`)
          allPrices.forEach((price, index) => {
            console.log(`   [${index}] $${price.toLocaleString()}`)
          })

          // Identificar automáticamente qué precio es cuál
          const uniquePrices = [...new Set(allPrices.slice(0, 4))] // Tomar hasta 4 valores únicos
          uniquePrices.sort((a, b) => b - a) // Ordenar de mayor a menor

          console.log(
            `🔍 Precios únicos ordenados: ${uniquePrices.map((p) => '$' + p.toLocaleString()).join(', ')}`,
          )

          if (uniquePrices.length >= 3) {
            // NUEVA LÓGICA CORREGIDA: El precio más bajo es el PROMO por kg
            const promoPricePerKgFromWeb = uniquePrices[uniquePrices.length - 1] // El más bajo
            const totalPrices = uniquePrices.slice(0, -1) // Los otros precios son totales

            console.log(`🎯 Análisis Jumbo - Precio más bajo es PROMO por kg:`)
            console.log(`   Precio PROMO por kg (web): $${promoPricePerKgFromWeb.toLocaleString()}`)
            console.log(
              `   Totales de trozos: ${totalPrices.map((p) => '$' + p.toLocaleString()).join(', ')}`,
            )

            if (totalPrices.length >= 2) {
              totalPrices.sort((a, b) => b - a)
              const normalTotal = totalPrices[0] // $14,027
              const promoTotal = totalPrices[1] // $10,387

              // Calcular peso usando el precio promo por kg como referencia
              const estimatedWeight = promoTotal / promoPricePerKgFromWeb

              console.log(`🧮 Cálculos usando precio promo como referencia:`)
              console.log(`   Total normal: $${normalTotal.toLocaleString()}`)
              console.log(`   Total promo: $${promoTotal.toLocaleString()}`)
              console.log(`   Promo por kg (web): $${promoPricePerKgFromWeb.toLocaleString()}`)
              console.log(`   Peso estimado: ${estimatedWeight.toFixed(3)} kg`)

              if (estimatedWeight > 0.8 && estimatedWeight < 2.0) {
                // Calcular precio normal por kg usando el peso estimado
                const normalPricePerKgCalculated = Math.round(normalTotal / estimatedWeight)

                console.log(`✅ Interpretación correcta encontrada:`)
                console.log(`   Peso del trozo: ${estimatedWeight.toFixed(3)} kg`)
                console.log(`   Normal por kg: $${normalPricePerKgCalculated.toLocaleString()}`)
                console.log(`   Promo por kg: $${promoPricePerKgFromWeb.toLocaleString()}`)

                normalPrice = normalPricePerKgCalculated
                promoPrice = promoPricePerKgFromWeb
              } else {
                console.log(`⚠️  Peso estimado inválido (${estimatedWeight.toFixed(3)} kg)`)
                normalPrice = promoPricePerKgFromWeb
              }
            } else {
              console.log(`⚠️  No hay suficientes precios totales`)
              normalPrice = promoPricePerKgFromWeb
            }
          } else if (uniquePrices.length === 2) {
            // Caso especial: solo 2 precios únicos (sin promoción)
            console.log(`🔍 Solo 2 precios únicos - producto sin promoción:`)

            // Asumir: precio más alto = total, precio más bajo = por kg
            const totalPrice = uniquePrices[0] // El más alto
            const pricePerKg = uniquePrices[1] // El más bajo

            console.log(`   Total del trozo: $${totalPrice.toLocaleString()}`)
            console.log(`   Precio por kg: $${pricePerKg.toLocaleString()}`)

            // Calcular peso del trozo
            const estimatedWeight = totalPrice / pricePerKg
            console.log(`   Peso estimado: ${estimatedWeight.toFixed(3)} kg`)

            if (estimatedWeight > 0.8 && estimatedWeight < 3.0) {
              console.log(`✅ Producto sin promoción - usando precio normal:`)
              console.log(`   Normal por kg: $${pricePerKg.toLocaleString()}`)
              console.log(`   Sin precio promo`)

              normalPrice = pricePerKg
              promoPrice = null // Sin promoción
            } else {
              console.log(`⚠️  Peso inválido, usando precio directo`)
              normalPrice = pricePerKg
            }
          } else {
            console.log(`⚠️  No se encontraron suficientes precios únicos (${uniquePrices.length})`)
            normalPrice = uniquePrices[0] // Usar el precio más alto
          }
        } else if (allPrices.length >= 1) {
          // Fallback: usar el primer precio encontrado
          normalPrice = allPrices[allPrices.length - 1] // El último suele ser por kg
          console.log(`⚠️  Solo se encontró un precio, usando como normal: $${normalPrice}`)
        }
      } else {
        console.log('⚠️  No se encontró el contenedor de precios específico')

        // Debug: investigar la estructura real
        console.log('🔍 Investigando estructura de la página...')
        console.log(`📊 Estructura de main:`)

        // Analizar la estructura de main para entender el layout
        const mainElement = $('main')
        if (mainElement.length > 0) {
          console.log(`   main encontrado con ${mainElement.children().length} hijos`)
          mainElement.children().each((i, child) => {
            const tagName = $(child).prop('tagName')
            const className = $(child).attr('class') || 'sin-clase'
            const text = $(child).text().trim().substring(0, 50)
            console.log(`   [${i}] ${tagName}.${className}: "${text}..."`)
          })
        }

        // Probar selectores alternativos más flexibles
        const alternativeSelectors = [
          'main div:nth-child(1) div div:nth-child(3) div:nth-child(1)',
          'main div div div:nth-child(3) div:nth-child(1)',
          'main div div div:nth-child(3)',
          'main div div:nth-child(3)',
          'div[class*="price"]',
          'div[class*="Product"]',
          '[class*="vtex"]',
        ]

        let foundContainer = false

        for (const altSelector of alternativeSelectors) {
          const container = $(altSelector)
          if (container.length > 0) {
            const text = container.text().trim()
            if (text.includes('$') && text.length > 10) {
              console.log(`✅ Contenedor alternativo encontrado: "${altSelector}"`)
              console.log(`📦 Contenido: "${text.substring(0, 200)}..."`)

              // Extraer precios del contenedor alternativo
              const allPrices = []
              const priceRegex = /\$(\d{1,2}[\.,]?\d{3})/g
              let match

              console.log(`🔍 Aplicando regex a: "${text}"`)

              while ((match = priceRegex.exec(text)) !== null) {
                const cleanPrice = match[1].replace(/[^\d]/g, '')
                const price = parseInt(cleanPrice, 10)
                console.log(
                  `   Precio encontrado: "${match[0]}" → limpio: "${cleanPrice}" → parseado: ${price}`,
                )
                if (!isNaN(price) && price > 100) {
                  allPrices.push(price)
                  console.log(`   ✅ Precio válido agregado: ${price}`)
                } else {
                  console.log(`   ❌ Precio inválido: ${price}`)
                }
              }

              console.log(
                `💰 Precios en contenedor alternativo: ${allPrices.map((p) => '$' + p.toLocaleString()).join(', ')}`,
              )

              if (allPrices.length >= 3) {
                console.log(
                  `📊 Análisis de precios Jumbo (alternativo - ${allPrices.length} precios):`,
                )
                allPrices.forEach((price, index) => {
                  console.log(`   [${index}] $${price.toLocaleString()}`)
                })

                // Identificar automáticamente qué precio es cuál usando combinaciones
                const uniquePrices = [...new Set(allPrices.slice(0, 4))]
                uniquePrices.sort((a, b) => b - a)

                console.log(
                  `🔍 Precios únicos ordenados: ${uniquePrices.map((p) => '$' + p.toLocaleString()).join(', ')}`,
                )

                if (uniquePrices.length >= 3) {
                  // NUEVA LÓGICA: El precio más bajo es el PROMO por kg, no el normal
                  const promoPricePerKgFromWeb = uniquePrices[uniquePrices.length - 1] // El más bajo
                  const totalPrices = uniquePrices.slice(0, -1) // Los otros precios son totales

                  console.log(`🎯 Análisis Jumbo (alternativo) - Precio más bajo es PROMO por kg:`)
                  console.log(
                    `   Precio PROMO por kg (web): $${promoPricePerKgFromWeb.toLocaleString()}`,
                  )
                  console.log(
                    `   Totales de trozos: ${totalPrices.map((p) => '$' + p.toLocaleString()).join(', ')}`,
                  )

                  if (totalPrices.length >= 2) {
                    totalPrices.sort((a, b) => b - a)
                    const normalTotal = totalPrices[0] // $14,027
                    const promoTotal = totalPrices[1] // $10,387

                    // Calcular peso usando el precio promo por kg
                    const estimatedWeight = promoTotal / promoPricePerKgFromWeb

                    console.log(`🧮 Cálculos (alternativo) - usando precio promo como referencia:`)
                    console.log(`   Total normal: $${normalTotal.toLocaleString()}`)
                    console.log(`   Total promo: $${promoTotal.toLocaleString()}`)
                    console.log(
                      `   Promo por kg (web): $${promoPricePerKgFromWeb.toLocaleString()}`,
                    )
                    console.log(`   Peso estimado: ${estimatedWeight.toFixed(3)} kg`)

                    if (estimatedWeight > 0.8 && estimatedWeight < 2.0) {
                      // Calcular precio normal por kg usando el peso estimado
                      const normalPricePerKgCalculated = Math.round(normalTotal / estimatedWeight)

                      console.log(`✅ Interpretación correcta (alternativo):`)
                      console.log(`   Peso del trozo: ${estimatedWeight.toFixed(3)} kg`)
                      console.log(
                        `   Normal por kg: $${normalPricePerKgCalculated.toLocaleString()}`,
                      )
                      console.log(`   Promo por kg: $${promoPricePerKgFromWeb.toLocaleString()}`)

                      normalPrice = normalPricePerKgCalculated
                      promoPrice = promoPricePerKgFromWeb
                      foundContainer = true
                      break
                    } else {
                      console.log(
                        `⚠️  Peso estimado inválido (alternativo): ${estimatedWeight.toFixed(3)} kg`,
                      )
                      normalPrice = promoPricePerKgFromWeb
                      foundContainer = true
                      break
                    }
                  }
                } else if (uniquePrices.length === 2) {
                  // Caso especial: solo 2 precios únicos (sin promoción)
                  console.log(`🔍 Solo 2 precios únicos (alternativo) - producto sin promoción:`)

                  const totalPrice = uniquePrices[0] // El más alto
                  const pricePerKg = uniquePrices[1] // El más bajo

                  console.log(`   Total del trozo: $${totalPrice.toLocaleString()}`)
                  console.log(`   Precio por kg: $${pricePerKg.toLocaleString()}`)

                  const estimatedWeight = totalPrice / pricePerKg
                  console.log(`   Peso estimado: ${estimatedWeight.toFixed(3)} kg`)

                  if (estimatedWeight > 0.8 && estimatedWeight < 3.0) {
                    console.log(`✅ Producto sin promoción (alternativo):`)
                    console.log(`   Normal por kg: $${pricePerKg.toLocaleString()}`)
                    console.log(`   Sin precio promo`)

                    normalPrice = pricePerKg
                    promoPrice = null
                    foundContainer = true
                    break
                  } else {
                    console.log(`⚠️  Peso inválido (alternativo)`)
                    normalPrice = pricePerKg
                    foundContainer = true
                    break
                  }
                }
              } else if (allPrices.length >= 1) {
                // Buscar el precio por kg (el más alto suele ser por kg)
                const sortedPrices = [...allPrices].sort((a, b) => b - a)
                normalPrice = sortedPrices[0]
                console.log(`⚠️  Usando precio más alto como por kg: $${normalPrice}`)
                foundContainer = true
                break
              }
            }
          }
        }

        if (!foundContainer) {
          // Fallback final
          const fallbackPrices = []
          $('[class*="price"]').each((i, element) => {
            const text = $(element).text().trim()
            const matches = text.match(/\$(\d{1,2}[\.,]?\d{3})/g)
            if (matches) {
              matches.forEach((match) => {
                const price = parseInt(match.replace(/[^\d]/g, ''), 10)
                if (!isNaN(price) && price > 1000 && price < 50000) {
                  fallbackPrices.push(price)
                }
              })
            }
          })

          if (fallbackPrices.length > 0) {
            // El precio más alto suele ser por kg
            const sortedPrices = [...fallbackPrices].sort((a, b) => b - a)
            normalPrice = sortedPrices[0]
            console.log(`🔄 Fallback final: usando precio más alto $${normalPrice}`)
          }
        }
      }

      // Validación final
      if (!normalPrice || normalPrice < 1000 || normalPrice > 50000) {
        console.log('⚠️  No se encontraron precios válidos en Jumbo')
        return {
          success: false,
          error: 'No se encontraron precios válidos en Jumbo',
        }
      }

      return {
        success: true,
        data: {
          name: 'Producto Jumbo',
          price: normalPrice, // Precio principal para mostrar
          normalPrice,
          promoPrice,
          url,
          lastUpdated: new Date(),
        },
      }
    } catch (error) {
      console.error('❌ Error en scraping de Jumbo:', error.message)
      return {
        success: false,
        error: error.message,
      }
    }
  }

  // Método unificado que detecta automáticamente el supermercado
  async scrapePrice(url) {
    const supermarket = this.detectSupermarket(url)

    console.log(`🏪 Supermercado detectado: ${supermarket.toUpperCase()}`)

    switch (supermarket) {
      case 'lider':
        return await this.scrapeLiderPrice(url)
      case 'jumbo':
        return await this.scrapeJumboPrice(url)
      default:
        return {
          success: false,
          error: `Supermercado no soportado: ${supermarket}`,
        }
    }
  }

  // Método para Lider.cl (renombrado del anterior)
  async scrapeLiderPrice(url) {
    try {
      console.log(`🏃‍♂️ Scraping rápido: ${url}`)

      const response = await axios.get(url, {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
          'Accept-Language': 'es-ES,es;q=0.8,en-US;q=0.5,en;q=0.3',
          'Accept-Encoding': 'gzip, deflate',
          Connection: 'keep-alive',
          'Upgrade-Insecure-Requests': '1',
        },
        timeout: 15000,
      })

      console.log(`📄 Respuesta obtenida (${response.data.length} caracteres)`)

      const $ = cheerio.load(response.data)

      // Buscar precios usando los mismos selectores XPath que Puppeteer
      let priceText = ''
      let normalPrice = null
      let promoPrice = null

      console.log('🔍 Buscando precios específicos con XPath convertidos (método rápido)...')

      // Buscar SOLO dentro de la clase buy-box-column para mayor precisión
      const buyBoxColumn = $('.buy-box-column').first()

      if (buyBoxColumn.length === 0) {
        console.log(
          '⚠️  No se encontró la clase buy-box-column, usando selectores globales como fallback',
        )
      } else {
        console.log('✅ Encontrada clase buy-box-column, buscando precios dentro de ella')
      }

      const searchContext = buyBoxColumn.length > 0 ? buyBoxColumn : $

      // Precio en oferta (promo) - Selectores DENTRO de buy-box-column
      const promoSelectors = [
        'span span:nth-child(2) span', // Selector específico del XPath
        'span[class*="price"] span:nth-child(2) span',
        'span:contains("$"):first',
        '[class*="price"]:first',
        '.price:first',
      ]

      // Precio normal - Selectores DENTRO de buy-box-column (precio tachado)
      const normalSelectors = [
        'span[data-seo-id="strike-through-price"]', // Selector específico del HTML proporcionado
        'span.strike[data-seo-id="strike-through-price"]', // Más específico con clase strike
        'span[class*="strike"][data-seo-id="strike-through-price"]', // Con clase strike
        'span[class*="strike"]', // Cualquier elemento con clase strike
        'span[class*="old"], span[class*="original"], span[class*="before"]', // Precios tachados genéricos
        '.strike', // Clase strike directa
        '[data-seo-id="strike-through-price"]', // Solo por data attribute
        'div:nth-child(2) span:nth-child(2)', // Fallback del XPath anterior
      ]

      console.log('🔍 INICIANDO búsqueda de precio promocional...')
      // Buscar precio promocional DENTRO de buy-box-column
      for (const selector of promoSelectors) {
        try {
          const element = searchContext.find(selector).first()
          if (element.length > 0) {
            const text = element.text().trim()
            console.log(`   Promo selector "${selector}" (buy-box-column): "${text}"`)
            if (text && text.includes('$') && text.includes('/kg')) {
              // Es un precio válido con formato $X.XXX/kg
              const cleanText = text.replace(/[^\d]/g, '') // Solo números, eliminar puntos y comas
              console.log(`   🔍 Texto limpio promo: "${cleanText}"`)
              const price = parseInt(cleanText, 10)
              console.log(`   🔍 Precio promo parseado: ${price}`)
              if (!isNaN(price) && price > 1000 && price < 50000) {
                promoPrice = price
                console.log(`💰 Precio promocional encontrado en buy-box-column: $${promoPrice}`)
                break
              }
            }
          }
        } catch (e) {
          console.log(`   Error con selector promo "${selector}": ${e.message}`)
        }
      }

      // Buscar precio normal DENTRO de buy-box-column (precio tachado)
      for (const selector of normalSelectors) {
        try {
          const element = searchContext.find(selector).first()
          if (element.length > 0) {
            const text = element.text().trim()
            console.log(`   Normal selector "${selector}" (buy-box-column): "${text}"`)
            if (text && text.includes('$') && text.includes('/kg')) {
              // Es un precio válido con formato $X.XXX/kg
              const cleanText = text.replace(/[^\d]/g, '') // Solo números, eliminar puntos y comas
              console.log(`   🔍 Texto limpio: "${cleanText}"`)
              const price = parseInt(cleanText, 10)
              console.log(`   🔍 Precio parseado: ${price}`)
              console.log(
                `   🔍 Validación: !isNaN(${price}) && ${price} > 1000 && ${price} < 50000 = ${!isNaN(price) && price > 1000 && price < 50000}`,
              )
              if (!isNaN(price) && price > 1000 && price < 50000) {
                normalPrice = price
                console.log(
                  `💰 Precio normal tachado encontrado en buy-box-column: $${normalPrice}`,
                )
                break
              }
            }
          }
        } catch (e) {
          console.log(`   Error con selector normal "${selector}": ${e.message}`)
        }
      }

      // Verificar si el producto está disponible (no agotado)
      const outOfStockIndicators = [
        'agotado',
        'sin stock',
        'no disponible',
        'producto no encontrado',
        'temporalmente no disponible',
        'fuera de stock',
      ]

      const pageText = $.text().toLowerCase()
      const isOutOfStock = outOfStockIndicators.some((indicator) => pageText.includes(indicator))

      if (isOutOfStock) {
        console.log('⚠️  Producto parece estar agotado o no disponible')
        return {
          success: false,
          error: 'Producto agotado o no disponible - no se actualizará budgets.js',
        }
      }

      // Configurar texto de precio según lo encontrado (PRIORIDAD A SELECTORES ESPECÍFICOS)
      if (promoPrice && normalPrice) {
        priceText = `Oferta: $${promoPrice} | Normal: $${normalPrice}`
        console.log(
          `✅ Ambos precios extraídos con selectores específicos - RETORNANDO INMEDIATAMENTE`,
        )

        // Validar que los precios sean razonables
        if (normalPrice < 1000 || normalPrice > 50000 || promoPrice < 1000 || promoPrice > 50000) {
          console.log('⚠️  Precios fuera del rango esperado - no se actualizará budgets.js')
          return {
            success: false,
            error: 'Precios fuera del rango válido (1000-50000)',
          }
        }

        // RETORNAR INMEDIATAMENTE para evitar sobrescritura por lógica genérica
        return {
          success: true,
          data: {
            name: 'Producto', // Nombre fijo por ahora
            price: normalPrice, // Precio principal para mostrar
            normalPrice,
            promoPrice,
            url,
            lastUpdated: new Date(),
          },
        }
      } else if (promoPrice) {
        priceText = `$${promoPrice}`
        normalPrice = promoPrice // Si solo hay promo, usar como normal también
        console.log(`✅ Solo precio promocional encontrado (método rápido)`)
      } else if (normalPrice) {
        priceText = `$${normalPrice}`
        console.log(`✅ Solo precio normal encontrado (método rápido)`)
      }

      // Buscar con regex - SIEMPRE ejecutar para debug
      const priceRegex = /\$[\d,\.]+/g
      const matches = response.data.match(priceRegex)

      // También buscar precios sin símbolo $ - patrón más específico para precios chilenos
      const numberRegex = /(\d{1,2}\.?\d{3})/g
      const numberMatches = response.data.match(numberRegex)

      // Buscar precios específicos conocidos de Lider
      const specificRegex = /(6\.990|7\.990|8\.990|9\.990)/g
      const specificMatches = response.data.match(specificRegex)

      // Aplicar la misma lógica de detección de ambos precios
      if (specificMatches && specificMatches.length >= 2) {
        const allSpecificPrices = specificMatches
          .map((match) => parseInt(match.replace('.', ''), 10))
          .filter((price) => price > 5000 && price < 15000)
          .sort((a, b) => a - b)

        const uniquePrices = [...new Set(allSpecificPrices)]
        if (uniquePrices.length >= 2) {
          promoPrice = uniquePrices[0] // El menor (oferta)
          normalPrice = uniquePrices[1] // El mayor (normal)
          priceText = `Oferta: $${promoPrice} | Normal: $${normalPrice}`
          console.log(
            `💰 Ambos precios encontrados - Oferta: $${promoPrice}, Normal: $${normalPrice}`,
          )
        } else {
          normalPrice = uniquePrices[0]
          priceText = `$${normalPrice}`
          console.log(`💰 Un precio único encontrado: $${normalPrice}`)
        }
      }

      // Combinar todos los posibles precios, priorizando los específicos
      const allMatches = [...(specificMatches || []), ...(matches || []), ...(numberMatches || [])]

      if (allMatches && allMatches.length > 0) {
        // Filtrar precios válidos
        const validPrices = allMatches
          .map((match) => {
            // Limpiar el match y convertir a número
            const cleaned = match.replace(/[^\d,\.]/g, '').replace(/[,\.]/g, '')
            return parseInt(cleaned, 10)
          })
          .filter((price) => price > 1000 && price < 100000) // Rango realista para carnes
          .sort((a, b) => b - a) // Ordenar de mayor a menor

        console.log(`🔍 Todos los matches encontrados: ${allMatches.slice(0, 15).join(', ')}`)
        console.log(`🔍 Matches específicos: ${(specificMatches || []).slice(0, 5).join(', ')}`)
        console.log(`🔍 Precios válidos filtrados: ${validPrices.slice(0, 8).join(', ')}`)

        // Extraer AMBOS precios (oferta y normal)
        let normalPrice = null
        let promoPrice = null

        if (specificMatches && specificMatches.length >= 2) {
          // Convertir todos los precios específicos
          const allSpecificPrices = specificMatches
            .map((match) => parseInt(match.replace('.', ''), 10))
            .filter((price) => price > 5000 && price < 15000) // Rango realista para carnes
            .sort((a, b) => a - b) // Ordenar de menor a mayor

          console.log(`🔍 Precios específicos ordenados: ${allSpecificPrices.join(', ')}`)

          if (allSpecificPrices.length >= 2) {
            // Buscar dos precios diferentes para oferta y normal
            const uniquePrices = [...new Set(allSpecificPrices)]
            if (uniquePrices.length >= 2) {
              promoPrice = uniquePrices[0] // El menor (oferta)
              normalPrice = uniquePrices[1] // El mayor (normal)
            } else {
              // Solo hay un precio único repetido
              normalPrice = uniquePrices[0]
              promoPrice = null
            }

            if (promoPrice && normalPrice) {
              priceText = `Oferta: $${promoPrice} | Normal: $${normalPrice}`
              console.log(
                `💰 Ambos precios encontrados - Oferta: $${promoPrice}, Normal: $${normalPrice}`,
              )
            } else {
              priceText = `$${normalPrice}`
              console.log(`💰 Un precio único encontrado: $${normalPrice}`)
            }
          } else if (allSpecificPrices.length === 1) {
            normalPrice = allSpecificPrices[0]
            priceText = `$${normalPrice}`
            console.log(`💰 Un precio encontrado: $${normalPrice}`)
          }
        } else if (specificMatches && specificMatches.length > 0) {
          const specificPrice = parseInt(specificMatches[0].replace('.', ''), 10)
          normalPrice = specificPrice
          priceText = `$${specificPrice}`
          console.log(`💰 Precio específico encontrado: ${priceText}`)
        } else if (validPrices.length > 0 && !priceText.includes('$')) {
          // Buscar el precio más probable
          let targetPrice = validPrices[0] // Por defecto el mayor

          // Si hay precios en el rango 6000-10000, preferir esos
          const meatPrices = validPrices.filter((p) => p >= 6000 && p <= 10000)
          if (meatPrices.length > 0) {
            targetPrice = meatPrices[0]
          }

          normalPrice = targetPrice
          priceText = `$${targetPrice}`
          console.log(`💰 Precio seleccionado: ${priceText}`)
        }
      } else {
        console.log('🔍 No se encontraron precios con regex')
      }

      // Buscar nombre
      let productName = ''
      const nameSelectors = ['h1', '.product-name', '[class*="title"]']

      for (const selector of nameSelectors) {
        const element = $(selector).first()
        if (element.length > 0) {
          productName = element.text().trim()
          if (productName.length > 0) {
            break
          }
        }
      }

      // Determinar el precio principal
      let price = normalPrice || promoPrice
      if (!price) {
        if (!priceText.includes('$')) {
          throw new Error('No se pudo extraer el precio')
        }
        const cleanPrice = priceText.replace(/[^\d,]/g, '').replace(',', '')
        price = parseInt(cleanPrice, 10)
        if (isNaN(price)) {
          throw new Error('No se pudo convertir el precio')
        }
      }

      // Validación final - asegurar que tenemos precios válidos
      if (!price || price < 1000 || price > 50000) {
        console.log('⚠️  No se encontraron precios válidos - no se actualizará budgets.js')
        return {
          success: false,
          error: 'No se encontraron precios válidos en el rango esperado',
        }
      }

      return {
        success: true,
        data: {
          name: productName || 'Producto',
          price,
          normalPrice,
          promoPrice,
          url,
          lastUpdated: new Date(),
        },
      }
    } catch (error) {
      console.error('❌ Error en scraping rápido:', error.message)
      return {
        success: false,
        error: error.message,
      }
    }
  }
}

// Función para actualizar budgets.js con ambos precios y supermercados
async function updateBudgetsFile(productId, priceData, supermarket = 'lider') {
  try {
    const budgetsPath = path.join(process.cwd(), 'src/data/budgets.js')
    const budgetsContent = fs.readFileSync(budgetsPath, 'utf8')

    // Extraer el array de budgets usando regex más flexible
    const budgetsMatch = budgetsContent.match(/export const budgets = (\[[\s\S]*\])/)
    if (!budgetsMatch) {
      throw new Error('No se pudo encontrar el array de budgets')
    }

    // Evaluar el array (¡cuidado! Solo para datos conocidos)
    const budgetsArray = eval(budgetsMatch[1])
    let updated = false

    console.log(
      `🔍 Buscando producto con ID: "${productId}" para supermercado: ${supermarket.toUpperCase()}`,
    )

    // Buscar y actualizar el producto por ID en todos los presupuestos
    for (const budget of budgetsArray) {
      const meat = budget.meats.find((m) => m.id === productId)

      if (meat) {
        // Verificar si el producto ya tiene la nueva estructura
        if (meat.values && meat.values[supermarket] && meat.values[supermarket].price) {
          // Nueva estructura con precios normal y promo para el supermercado específico
          const oldNormal = meat.values[supermarket].price.normal
          const oldPromo = meat.values[supermarket].price.promo

          console.log(`🔍 DEBUG ${meat.name} (${supermarket.toUpperCase()}):`)
          console.log(
            `   Precio normal: budgets=${oldNormal} vs detectado=${priceData.normalPrice}`,
          )
          console.log(`   Precio promo: budgets=${oldPromo} vs detectado=${priceData.promoPrice}`)
          console.log(
            `   Comparación normal: ${oldNormal} !== ${priceData.normalPrice} = ${oldNormal !== priceData.normalPrice}`,
          )
          console.log(
            `   Comparación promo: ${oldPromo} !== ${priceData.promoPrice} = ${oldPromo !== priceData.promoPrice}`,
          )

          let changes = []

          if (priceData.normalPrice && oldNormal !== priceData.normalPrice) {
            meat.values[supermarket].price.normal = priceData.normalPrice
            changes.push(
              `Normal: $${oldNormal?.toLocaleString() || 'N/A'} → $${priceData.normalPrice.toLocaleString()}`,
            )
            updated = true
            console.log(
              `🔄 ACTUALIZANDO precio normal ${supermarket}: ${oldNormal} → ${priceData.normalPrice}`,
            )
          }

          if (priceData.promoPrice && oldPromo !== priceData.promoPrice) {
            meat.values[supermarket].price.promo = priceData.promoPrice
            changes.push(
              `Oferta: $${oldPromo?.toLocaleString() || 'N/A'} → $${priceData.promoPrice.toLocaleString()}`,
            )
            updated = true
            console.log(
              `🔄 ACTUALIZANDO precio promo ${supermarket}: ${oldPromo} → ${priceData.promoPrice}`,
            )
          }

          if (changes.length > 0) {
            console.log(`✅ ${meat.name} (${supermarket.toUpperCase()}): ${changes.join(' | ')}`)
          } else {
            console.log(`⚪ ${meat.name} (${supermarket.toUpperCase()}): Sin cambios necesarios`)
          }
        } else {
          // Estructura antigua - convertir a nueva estructura si tenemos ambos precios
          if (priceData.normalPrice && priceData.promoPrice) {
            const oldPrice = meat.valueLider

            // Convertir a nueva estructura
            meat.values = {
              lider: {
                price: {
                  normal: priceData.normalPrice,
                  promo: priceData.promoPrice,
                },
              },
              jumbo: {
                price: {
                  normal: meat.valueJumbo || oldPrice,
                  promo: meat.valueJumbo
                    ? Math.round(meat.valueJumbo * 0.9)
                    : Math.round(oldPrice * 0.9), // Estimar oferta
                },
              },
            }

            // Eliminar propiedades antiguas
            delete meat.valueLider
            delete meat.valueJumbo

            console.log(`🔄 ${meat.name}: Convertido a nueva estructura`)
            console.log(
              `   Lider - Normal: $${priceData.normalPrice.toLocaleString()}, Oferta: $${priceData.promoPrice.toLocaleString()}`,
            )
            updated = true
          } else {
            // Solo un precio - actualizar estructura antigua
            const oldPrice = meat.valueLider
            const newPrice = priceData.normalPrice || priceData.price

            if (oldPrice !== newPrice) {
              meat.valueLider = newPrice
              console.log(
                `✅ ${meat.name}: $${oldPrice?.toLocaleString() || 'N/A'} → $${newPrice.toLocaleString()}`,
              )
              updated = true
            } else {
              console.log(`⚪ ${meat.name}: Sin cambios ($${oldPrice?.toLocaleString() || 'N/A'})`)
            }
          }
        }
      }
    }

    if (updated) {
      // Escribir el archivo actualizado
      const updatedContent = `/**
 * Valores extraidos desde la web de supermercados Jumbo y Lider
 * promediando ambos valores.
 * Solo carnes al vacio y con precios normales.
 * Se segmentan presupuestos en base a sus valores.
 * Última actualización: ${new Date().toISOString()}
 */
export const budgets = ${JSON.stringify(budgetsArray, null, 2)}

export const lastUpdated = '${new Date().toISOString()}'
`

      fs.writeFileSync(budgetsPath, updatedContent, 'utf8')
      console.log(`💾 Archivo budgets.js actualizado correctamente`)
    } else {
      console.log(`ℹ️  No se realizaron cambios en budgets.js`)
    }

    return updated
  } catch (error) {
    console.error('❌ Error actualizando budgets.js:', error.message)
    return false
  }
}

// Función principal
async function main() {
  console.log('🚀 SCRAPER MANUAL PARA ASADITO APP')
  console.log('⚠️  TU TRABAJO DEPENDE DE QUE ESTO FUNCIONE!\n')

  const args = process.argv.slice(2)
  const productArg = args.find((arg) => arg.startsWith('--product='))?.split('=')[1]
  const urlArg = args.find((arg) => arg.startsWith('--url='))?.split('=')[1]

  const scraper = new SupermarketScraper()

  try {
    let urlsToScrape = []

    if (urlArg) {
      // URL específica
      urlsToScrape.push({
        id: 'custom',
        name: 'Producto personalizado',
        url: urlArg,
      })
    } else if (productArg && PRODUCT_URLS[productArg]) {
      // Producto específico - incluir ambos supermercados si están disponibles
      const product = PRODUCT_URLS[productArg]

      if (product.lider.url) {
        urlsToScrape.push({
          id: product.id,
          name: `${product.name} (Lider)`,
          url: product.lider.url,
          supermarket: 'lider',
        })
      }

      if (product.jumbo.url) {
        urlsToScrape.push({
          id: product.id,
          name: `${product.name} (Jumbo)`,
          url: product.jumbo.url,
          supermarket: 'jumbo',
        })
      }
    } else {
      // Todos los productos - incluir ambos supermercados
      urlsToScrape = []
      Object.entries(PRODUCT_URLS).forEach(([key, product]) => {
        if (product.lider.url) {
          urlsToScrape.push({
            id: product.id,
            name: `${product.name} (Lider)`,
            url: product.lider.url,
            supermarket: 'lider',
          })
        }

        if (product.jumbo.url) {
          urlsToScrape.push({
            id: product.id,
            name: `${product.name} (Jumbo)`,
            url: product.jumbo.url,
            supermarket: 'jumbo',
          })
        }
      })
    }

    console.log(`🎯 Productos a procesar: ${urlsToScrape.length}\n`)

    for (const { id, name, url, supermarket } of urlsToScrape) {
      console.log(`\n🔄 Procesando: ${name}`)
      console.log(`📡 URL: ${url}`)
      console.log(`🆔 ID: ${id}`)

      // Usar método unificado que detecta automáticamente el supermercado
      let result = await scraper.scrapePrice(url)

      if (result.success) {
        console.log(`✅ ¡Éxito!`)
        console.log(`📦 Producto: ${result.data.name}`)
        console.log(`💰 Precio: $${result.data.price.toLocaleString()}`)
        console.log(`📅 Fecha: ${result.data.lastUpdated.toLocaleString()}`)

        // Actualizar budgets.js usando ID específico y supermercado
        const updated = await updateBudgetsFile(
          id,
          {
            price: result.data.price,
            normalPrice: result.data.normalPrice,
            promoPrice: result.data.promoPrice,
          },
          supermarket || scraper.detectSupermarket(url),
        )
        if (updated) {
          console.log(`💾 budgets.js actualizado`)
        }
      } else {
        // Distinguir entre diferentes tipos de errores
        if (result.error.includes('agotado') || result.error.includes('no disponible')) {
          console.log(`⚠️  Producto no disponible: ${result.error}`)
          console.log(`🛡️  budgets.js protegido - no se realizaron cambios`)
        } else if (result.error.includes('precios válidos') || result.error.includes('rango')) {
          console.log(`⚠️  Precios inválidos: ${result.error}`)
          console.log(`🛡️  budgets.js protegido - no se realizaron cambios`)
        } else {
          console.log(`❌ Error de scraping: ${result.error}`)
        }
      }

      // Esperar entre requests
      if (urlsToScrape.length > 1) {
        console.log('⏳ Esperando 3 segundos...')
        await new Promise((resolve) => setTimeout(resolve, 3000))
      }
    }

    console.log('\n🎉 ¡SCRAPING COMPLETADO!')
    console.log('💼 Tu trabajo está a salvo.')
  } catch (error) {
    console.error('\n💥 ERROR CRÍTICO:', error.message)
    console.error('🚨 ¡TU TRABAJO ESTÁ EN PELIGRO!')
    process.exit(1)
  }
}

// Mostrar ayuda
function showHelp() {
  console.log(`
🎯 SCRAPER MANUAL PARA ASADITO APP

Uso:
  node scripts/scraper-manual.js                           # Todos los productos
  node scripts/scraper-manual.js --product=carnicero       # Producto específico
  node scripts/scraper-manual.js --url="https://..."       # URL personalizada

Productos disponibles:
  - carnicero
  - sobre-costilla
  - tapapecho
  - abastero
  - huachalomo
  - tapabarriga
  - punta-paleta
  - punta-picana
  - asiento
  - palanca
  - lomo-vetado
  - entrana
  - filete
  - lomo-liso
  - asado-de-tira

Ejemplos:
  node scripts/scraper-manual.js --product=carnicero
  node scripts/scraper-manual.js --url="https://super.lider.cl/ip/vacuno/00209514000000"
`)
}

// Ejecutar
if (require.main === module) {
  if (process.argv.includes('--help') || process.argv.includes('-h')) {
    showHelp()
  } else {
    main().catch(console.error)
  }
}

module.exports = { SupermarketScraper, PRODUCT_URLS, updateBudgetsFile }
