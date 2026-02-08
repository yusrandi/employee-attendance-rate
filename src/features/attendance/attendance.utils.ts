// utils/attendance.utils.ts

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
