// hooks/useAttendanceStats.ts
import { useMemo } from 'react'
import {
  AttendanceDistribution,
  AttendanceRecord,
  DepartmentStats,
  MonthlyTrend,
} from './attendance.types'
import { toPercent } from './calculations'

export const useAttendanceStats = (allMonthsData: AttendanceRecord[][]) => {
  // Flatten all months data
  const allData = useMemo(() => allMonthsData.flat(), [allMonthsData])

  // Calculate overall attendance rate
  const overallAttendance = useMemo(() => {
    if (allData.length === 0) return 0
    const totalATR = allData.reduce(
      (sum, record) =>
        sum + toPercent(record['Hari kerja'] / record.TOTAL || 0),
      0
    )
    return Math.round(totalATR / allData.length)
  }, [allData])

  // Calculate total unique employees
  const totalEmployees = useMemo(() => {
    const uniqueNIKs = new Set(allData.map((r) => r.NIK))
    return uniqueNIKs.size
  }, [allData])

  // Calculate total present days
  const totalPresentDays = useMemo(() => {
    return allData.reduce((sum, record) => sum + (record.H || 0), 0)
  }, [allData])

  // Calculate total absent days
  const totalAbsentDays = useMemo(() => {
    return allData.reduce((sum, record) => sum + (record.A || 0), 0)
  }, [allData])

  // Get attendance distribution
  const attendanceDistribution = useMemo((): AttendanceDistribution[] => {
    if (allData.length === 0) return []

    const categories = [
      { key: 'H', label: 'Hadir', color: 'var(--chart-2)' },
      { key: 'A', label: 'Alpha', color: 'var(--chart-1)' },
      { key: 'I', label: 'Izin Resmi', color: 'var(--chart-3)' },
      { key: 'IT', label: 'Izin Tidak Resmi', color: 'var(--chart-3)' },
      { key: 'S', label: 'Sakit dgn surat dokter', color: 'var(--chart-4)' },
      { key: 'S1', label: 'Sakit tanpa surat dokter', color: 'var(--chart-4)' },
      { key: 'CT', label: 'Cuti', color: 'var(--chart-5)' },
      { key: 'L', label: 'Libur', color: '#6b7280' },
      { key: 'OFF', label: 'OFF', color: '#14b8a6' },
      { key: 'M1', label: 'Masuk 1/2 Hari', color: '#14b8a6' },
    ]

    const total = allData.reduce((sum, record) => sum + (record.TOTAL || 0), 0)

    return categories
      .map((cat) => {
        const count = allData.reduce((sum, record) => {
          const value = record[cat.key as keyof AttendanceRecord]
          return sum + (typeof value === 'number' ? value : 0)
        }, 0)

        return {
          category: cat.label,
          count,
          percentage: total > 0 ? Math.round((count / total) * 100) : 0,
          color: cat.color,
        }
      })
      .filter((item) => item.count > 0)
  }, [allData])

  // Get department statistics
  const departmentStats = useMemo((): DepartmentStats[] => {
    if (allData.length === 0) return []

    const deptMap = new Map<string, AttendanceRecord[]>()
    allData.forEach((record) => {
      const dept = record.DEPARTEMENT || 'Unknown'
      if (!deptMap.has(dept)) {
        deptMap.set(dept, [])
      }
      deptMap.get(dept)?.push(record)
    })

    return Array.from(deptMap.entries())
      .map(([department, records]) => {
        // console.log({ department, records })

        const totalEmployees = records.length
        const avgAttendance = Math.round(
          records.reduce(
            (sum, r) => sum + toPercent(r['Hari kerja'] / r.TOTAL || 0),
            0
          ) / totalEmployees
        )
        const presentDays = records.reduce((sum, r) => sum + (r.H || 0), 0)
        const absentDays = records.reduce((sum, r) => sum + (r.A || 0), 0)
        const totalI = records.reduce((sum, r) => sum + (r.I || 0), 0)
        const totalIT = records.reduce((sum, r) => sum + (r.IT || 0), 0)
        const totalS = records.reduce((sum, r) => sum + (r.S || 0), 0)
        const totalS1 = records.reduce((sum, r) => sum + (r.S1 || 0), 0)
        const totalL = records.reduce((sum, r) => sum + (r.L || 0), 0)
        const totalCT = records.reduce((sum, r) => sum + (r.CT || 0), 0)
        const totalM1 = records.reduce((sum, r) => sum + (r.M1 || 0), 0)
        const totalOFF = records.reduce((sum, r) => sum + (r.OFF || 0), 0)
        const totalHari = records.reduce((sum, r) => sum + (r.TOTAL || 0), 0)
        const totalRsg = records.reduce(
          (sum, r) => sum + (r['Rsg/New'] || 0),
          0
        )
        const totalWorkDays = records.reduce(
          (sum, r) => sum + (r['Hari kerja'] || 0),
          0
        )

        return {
          department,
          totalEmployees,
          avgAttendance,
          presentDays,
          absentDays,
          totalWorkDays,
          totalI,
          totalIT,
          totalS,
          totalS1,
          totalL,
          totalCT,
          totalM1,
          totalOFF,
          totalHari,
          totalRsg,
        }
      })
      .sort((a, b) => b.avgAttendance - a.avgAttendance)
  }, [allData])

  // Get monthly trend from actual data
  const monthlyTrend = useMemo((): MonthlyTrend[] => {
    if (allMonthsData.length === 0) return []

    return allMonthsData
      .map((monthData) => {
        if (monthData.length === 0) return null

        const month = monthData[0].month
        const totalATR = monthData.reduce(
          (sum, r) => sum + toPercent(r['Hari kerja'] / r.TOTAL || 0),
          0
        )
        const avgAttendance = Math.round(totalATR / monthData.length)
        const totalPresent = monthData.reduce((sum, r) => sum + (r.H || 0), 0)
        const totalAbsent = monthData.reduce((sum, r) => sum + (r.A || 0), 0)

        return {
          month,
          attendanceRate: avgAttendance,
          present: totalPresent,
          absent: totalAbsent,
        }
      })
      .filter(Boolean) as MonthlyTrend[]
  }, [allMonthsData])

  return {
    overallAttendance,
    totalEmployees,
    totalPresentDays,
    totalAbsentDays,
    attendanceDistribution,
    departmentStats,
    monthlyTrend,
    allData,
  }
}
