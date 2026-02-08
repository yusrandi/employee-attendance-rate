// components/DepartmentTable.tsx
import React from 'react'
import { Building2 } from 'lucide-react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { DepartmentStats } from './attendance.types'

interface DepartmentTableProps {
  data: DepartmentStats[]
}

export const DepartmentTable: React.FC<DepartmentTableProps> = ({ data }) => {
  const getColorClass = (attendance: number): string => {
    if (attendance >= 97) return 'text-green-600'
    // if (attendance >= 85) return 'text-yellow-600'
    return 'text-red-600'
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Detail Kehadiran per Departemen</CardTitle>
        <CardDescription>Rincian lengkap statistik departemen</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='overflow-x-auto'>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Departemen</TableHead>
                <TableHead className='text-right'>Total Karyawan</TableHead>
                <TableHead className='text-right'>Avg Attendance</TableHead>
                <TableHead className='text-right'>Total Hari Kerja</TableHead>
                <TableHead className='text-right'>Total Hadir</TableHead>
                <TableHead className='text-right'>Total Absent</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((dept, index) => (
                <TableRow key={index}>
                  <TableCell className='font-medium'>
                    <div className='flex items-center'>
                      <Building2 className='mr-2 h-4 w-4 text-gray-500' />
                      {dept.department}
                    </div>
                  </TableCell>
                  <TableCell className='text-right'>
                    {dept.totalEmployees}
                  </TableCell>
                  <TableCell className='text-right'>
                    <span
                      className={`font-semibold ${getColorClass(dept.avgAttendance)}`}
                    >
                      {dept.avgAttendance}%
                    </span>
                  </TableCell>
                  <TableCell className='text-right text-green-600'>
                    {dept.totalWorkDays}
                  </TableCell>
                  <TableCell className='text-right text-green-600'>
                    {dept.presentDays}
                  </TableCell>
                  <TableCell className='text-right text-red-600'>
                    {dept.absentDays}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
