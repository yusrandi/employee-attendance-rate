// components/EmployeeDetailTable.tsx
import React from 'react'
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
import { AttendanceRecord } from './attendance.types'
import { getATRColorClass, toPercent } from './attendance.utils'

interface EmployeeDetailTableProps {
  data: AttendanceRecord[]
}

export const EmployeeDetailTable: React.FC<EmployeeDetailTableProps> = ({
  data,
}) => {
  //   console.log({ data })

  return (
    <Card>
      <CardHeader>
        <CardTitle>Detail Kehadiran Karyawan</CardTitle>
        <CardDescription>
          Data lengkap kehadiran setiap karyawan ({data.length} karyawan)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className='max-h-200 overflow-x-auto overflow-y-auto'>
          <Table>
            <TableHeader className='sticky top-0 shadow-sm'>
              <TableRow>
                <TableHead className='w-12'>No</TableHead>
                <TableHead>NIK</TableHead>
                <TableHead>Nama</TableHead>
                <TableHead>Departemen</TableHead>
                <TableHead>Jabatan</TableHead>
                <TableHead className='text-right'>Hari Kerja</TableHead>
                <TableHead className='text-right'>Total</TableHead>
                <TableHead className='text-right'>ATR</TableHead>
                <TableHead className='text-right'>H</TableHead>
                <TableHead className='text-right'>A</TableHead>
                <TableHead className='text-right'>I</TableHead>
                <TableHead className='text-right'>IT</TableHead>
                <TableHead className='text-right'>S</TableHead>
                <TableHead className='text-right'>S1</TableHead>
                <TableHead className='text-right'>CT</TableHead>
                <TableHead className='text-right'>L</TableHead>
                <TableHead className='text-right'>M1</TableHead>
                <TableHead className='text-right'>OFF</TableHead>
                <TableHead className='text-right'>RSG/NH</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((record, index) => (
                <TableRow key={index}>
                  <TableCell className='font-mono text-xs'>
                    {record.NO}
                  </TableCell>
                  <TableCell className='font-mono text-xs'>
                    {record.NIK}
                  </TableCell>
                  <TableCell className='font-medium'>{record.NAMA}</TableCell>
                  <TableCell className='text-sm'>
                    {record.DEPARTEMENT}
                  </TableCell>
                  <TableCell className='text-sm text-gray-600'>
                    {record.JABATAN}
                  </TableCell>
                  <TableCell className='text-right font-semibold text-blue-600'>
                    {record['Hari kerja']}
                  </TableCell>
                  <TableCell className='text-right font-semibold'>
                    {record.TOTAL}
                  </TableCell>
                  <TableCell className='text-right'>
                    <span
                      className={`font-bold ${getATRColorClass(record['Hari kerja'] / record.TOTAL)}`}
                    >
                      {toPercent(record['Hari kerja'] / record.TOTAL)}%
                    </span>
                  </TableCell>
                  <TableCell className='text-right font-semibold text-green-600'>
                    {record.H}
                  </TableCell>

                  <TableCell className='text-right font-semibold text-red-600'>
                    {record.A || 0}
                  </TableCell>
                  <TableCell className='text-right'>{record.I || 0}</TableCell>
                  <TableCell className='text-right'>{record.IT || 0}</TableCell>
                  <TableCell className='text-right'>{record.S || 0}</TableCell>
                  <TableCell className='text-right'>{record.S1 || 0}</TableCell>
                  <TableCell className='text-right'>{record.CT || 0}</TableCell>
                  <TableCell className='text-right'>{record.L || 0}</TableCell>
                  <TableCell className='text-right'>{record.M1 || 0}</TableCell>
                  <TableCell className='text-right'>
                    {record.OFF || 0}
                  </TableCell>
                  <TableCell className='text-right'>
                    {record['Rsg/New'] || 0}
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
