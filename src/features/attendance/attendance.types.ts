// types/attendance.types.ts

export interface AttendanceRecord {
  NO: number
  PT: string
  PENEMPATAN: string
  NIK: string | number
  NAMA: string
  DEPARTEMENT: string
  JABATAN: string
  H: number
  'Hari kerja': number
  'Rsg/New': number
  I: number
  S: number
  S1: number
  IT: number
  A: number
  CT: number
  L: number
  M1: number
  OFF: number
  TOTAL: number
  ATR: number // Stored as decimal (0.96 = 96%)
  month: string // "Dec-25", "Jan-26", etc
  monthDate: Date
}

export interface DepartmentStats {
  department: string
  totalEmployees: number
  avgAttendance: number
  presentDays: number
  absentDays: number
  totalWorkDays: number
  totalI: number
  totalIT: number
  totalS: number
  totalS1: number
  totalL: number
  totalCT: number
  totalM1: number
  totalOFF: number
  totalHari: number
  totalRsg: number
}

export interface MonthlyTrend {
  month: string
  attendanceRate: number
  present: number
  absent: number
}

export interface AttendanceDistribution {
  category: string
  count: number
  percentage: number
  color: string
}

export interface MonthlyData {
  month: string
  data: AttendanceRecord[]
  avgAttendance: number
}
