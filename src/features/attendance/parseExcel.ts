// utils/parseExcel.ts
import { AttendanceRecord } from './attendance.types'

/**
 * Parse Excel file with MULTIPLE months in ONE file
 *
 * Structure:
 * - Columns 1-7: Employee info (NO, PT, PENEMPATAN, NIK, NAMA, DEPARTEMENT, JABATAN)
 * - Columns 8-21: Dec-25 data (14 columns)
 * - Columns 22-35: Jan-26 data (14 columns)
 * - Columns 36-49: Feb-26 data (14 columns)
 * - Pattern continues every +14 columns
 *
 * Each month has 14 columns:
 * H, Hari kerja, Rsg/New, I, S, S1, IT, A, CT, L, M1, OFF, TOTAL, ATR
 */

interface MonthConfig {
  startCol: number
  month: string
  monthDate: Date
}

export const parseMultiMonthExcel = (jsonData: any[]): AttendanceRecord[][] => {
  // Detect months from row 3
  const months = detectMonths(jsonData)

  if (months.length === 0) {
    console.warn('No months detected')
    return []
  }

  console.log(
    `✅ Detected ${months.length} months:`,
    months.map((m) => m.month)
  )

  // Parse data for each month
  const allMonthsData: AttendanceRecord[][] = months.map((monthConfig) => {
    return parseMonthData(jsonData, monthConfig)
  })

  return allMonthsData.filter((data) => data.length > 0)
}

const detectMonths = (jsonData: any[]): MonthConfig[] => {
  const months: MonthConfig[] = []

  if (jsonData.length < 3) return months

  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]

  // First month at col 8 (index 7), then every +14 columns
  const firstMonthCol = 7 // 0-indexed (column 8 in Excel)
  const monthSpacing = 14

  // Check up to 12 months
  for (let i = 0; i < 12; i++) {
    const colIndex = firstMonthCol + i * monthSpacing

    // Check if this column exists
    if (!jsonData[2] || !jsonData[2][colIndex]) continue

    const cellValue = jsonData[2][colIndex]

    // Try to parse as date
    try {
      const date = new Date(cellValue)
      if (!isNaN(date.getTime())) {
        const month = monthNames[date.getMonth()]
        const year = date.getFullYear().toString().slice(-2)
        const monthLabel = `${month}-${year}`

        months.push({
          startCol: colIndex,
          month: monthLabel,
          monthDate: date,
        })
      }
    } catch (e) {
      // Not a valid date, skip
      continue
    }
  }

  return months
}

const parseMonthData = (
  jsonData: any[],
  monthConfig: MonthConfig
): AttendanceRecord[] => {
  const parsedData: AttendanceRecord[] = []
  const { startCol, month, monthDate } = monthConfig

  // Data starts from row 8 (index 7)
  for (let i = 7; i < jsonData.length; i++) {
    const row = jsonData[i]

    // Skip empty rows or rows where NO is not a number
    if (!row[0] || isNaN(Number(row[0]))) continue

    const record: AttendanceRecord = {
      // Employee info (columns 0-6 in 0-indexed array)
      NO: Number(row[0]) || 0,
      PT: String(row[1] || ''),
      PENEMPATAN: String(row[2] || ''),
      NIK: row[3] || '',
      NAMA: String(row[4] || ''),
      DEPARTEMENT: String(row[5] || ''),
      JABATAN: String(row[6] || ''),

      // Month data (14 columns starting from startCol)
      H: Number(row[startCol]) || 0,
      'Hari kerja': Number(row[startCol + 1]) || 0,
      'Rsg/New': Number(row[startCol + 2]) || 0,
      I: Number(row[startCol + 3]) || 0,
      S: Number(row[startCol + 4]) || 0,
      S1: Number(row[startCol + 5]) || 0,
      IT: Number(row[startCol + 6]) || 0,
      A: Number(row[startCol + 7]) || 0,
      CT: Number(row[startCol + 8]) || 0,
      L: Number(row[startCol + 9]) || 0,
      M1: Number(row[startCol + 10]) || 0,
      OFF: Number(row[startCol + 11]) || 0,
      TOTAL: Number(row[startCol + 12]) || 0,
      ATR: Number(row[startCol + 13]) || 0,

      // Month metadata
      month: month,
      monthDate: monthDate,
    }

    parsedData.push(record)
  }

  return parsedData
}

/**
 * Helper to check if Excel has multi-month format
 */
export const isMultiMonthFormat = (jsonData: any[]): boolean => {
  if (jsonData.length < 3) return false

  // Check if there are dates in columns 8 and 22 (multi-month pattern)
  const hasCol8Date = jsonData[2] && jsonData[2][7] // Col 8 (0-indexed: 7)
  const hasCol22Date = jsonData[2] && jsonData[2][21] // Col 22 (0-indexed: 21)

  if (hasCol8Date && hasCol22Date) {
    try {
      const date1 = new Date(jsonData[2][7])
      const date2 = new Date(jsonData[2][21])
      return !isNaN(date1.getTime()) && !isNaN(date2.getTime())
    } catch {
      return false
    }
  }

  return false
}
