// components/MonthTab.tsx
import React from 'react'
import { AttendanceDistributionChart } from './AttendanceDistributionChart'
import { DepartmentBarChart } from './DepartmentBarChart'
import { DepartmentTable } from './DepartmentTable'
import { EmployeeDetailTable } from './EmployeeDetailTable'
import { SummaryCards } from './SummaryCards'
import { AttendanceRecord } from './attendance.types'
import { useAttendanceStats } from './useAttendanceStats'

interface MonthTabProps {
  monthData: AttendanceRecord[]
}

export const MonthTab: React.FC<MonthTabProps> = ({ monthData }) => {
  const monthStats = useAttendanceStats([monthData])

  return (
    <div className='space-y-6'>
      <SummaryCards
        overallAttendance={monthStats.overallAttendance}
        totalEmployees={monthStats.totalEmployees}
        totalPresentDays={monthStats.totalPresentDays}
        totalAbsentDays={monthStats.totalAbsentDays}
      />

      <AttendanceDistributionChart data={monthStats.attendanceDistribution} />
      <DepartmentBarChart data={monthStats.departmentStats} />

      <DepartmentTable data={monthStats.departmentStats} />

      <EmployeeDetailTable
        data={monthData}
        title={`Detail Kehadiran ${monthData[0]?.month}`}
      />
    </div>
  )
}
