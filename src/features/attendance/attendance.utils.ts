// utils/attendance.utils.ts
import { AttendanceRecord } from './attendance.types'

/**
 * Convert ATR to percentage
 * Formula: Hari Kerja / Total * 100
 */
export const toPercent = (atr: number): number => {
  if (atr <= 1) return Math.round(atr * 100)
  return Math.round(atr)
}

/**
 * Calculate ATR from record (for validation)
 * Formula: (Hari Kerja / Total) * 100
 */
export const calculateATR = (hariKerja: number, total: number): number => {
  if (total === 0) return 0
  return Math.round((hariKerja / total) * 100)
}

/**
 * Get color class based on ATR percentage
 */
export const getATRColorClass = (atr: number): string => {
  const percent = toPercent(atr)
  if (percent >= 97) return 'text-green-600'
  //   if (percent >= 85) return 'text-yellow-600'
  return 'text-red-600'
}

/**
 * Parse Excel file and extract attendance data
 */
export const parseExcelData = (jsonData: any[]): AttendanceRecord[] => {
  const parsedData: AttendanceRecord[] = []

  // Start from row 7 (index 7 in 0-based array) which is row 8 in Excel
  for (let i = 7; i < jsonData.length; i++) {
    const row = jsonData[i]

    // Skip empty rows or rows where NO is not a number
    if (!row[0] || isNaN(Number(row[0]))) continue

    const record: AttendanceRecord = {
      NO: Number(row[0]) || 0,
      PT: String(row[1] || ''),
      PENEMPATAN: String(row[2] || ''),
      NIK: row[3] || '',
      NAMA: String(row[4] || ''),
      DEPARTEMENT: String(row[5] || ''),
      JABATAN: String(row[6] || ''),
      H: Number(row[7]) || 0,
      'Hari kerja': Number(row[8]) || 0,
      'Rsg/New': Number(row[9]) || 0,
      I: Number(row[10]) || 0,
      S: Number(row[11]) || 0,
      S1: Number(row[12]) || 0,
      IT: Number(row[13]) || 0,
      A: Number(row[14]) || 0,
      CT: Number(row[15]) || 0,
      L: Number(row[16]) || 0,
      M1: Number(row[17]) || 0,
      OFF: Number(row[18]) || 0,
      TOTAL: Number(row[19]) || 0,
      ATR: Number(row[20]) || 0,
    }

    parsedData.push(record)
  }

  return parsedData
}
