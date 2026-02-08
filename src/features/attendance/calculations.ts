// utils/calculations.ts

/**
 * Convert ATR to percentage
 * ATR is stored as decimal (0.96 = 96%)
 */
export const toPercent = (atr: number): number => {
  if (atr <= 1) return Math.round(atr * 100)
  return Math.round(atr)
}

/**
 * Calculate ATR from Hari Kerja and Total
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
 * Format month date to label
 */
export const formatMonthLabel = (date: Date): string => {
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
  const month = monthNames[date.getMonth()]
  const year = date.getFullYear().toString().slice(-2)
  return `${month}-${year}`
}
