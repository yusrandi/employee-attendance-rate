// components/SummaryCards.tsx
import React from 'react'
import { Users, Calendar, TrendingUp } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface SummaryCardsProps {
  overallAttendance: number
  totalEmployees: number
  totalPresentDays: number
  totalAbsentDays: number
}

export const SummaryCards: React.FC<SummaryCardsProps> = ({
  overallAttendance,
  totalEmployees,
  totalPresentDays,
  totalAbsentDays,
}) => {
  return (
    <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4'>
      <Card>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium'>
            Tingkat Kehadiran
          </CardTitle>
          <TrendingUp className='h-4 w-4 text-green-600' />
        </CardHeader>
        <CardContent>
          <div className='text-3xl font-bold text-green-600'>
            {overallAttendance}%
          </div>
          <p className='mt-1 text-xs text-gray-500'>
            Rata-rata ATR keseluruhan
          </p>
          <p className='mt-1 text-xs text-gray-400 italic'>
            Formula: Hari Kerja / Total × 100
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium'>Total Karyawan</CardTitle>
          <Users className='h-4 w-4 text-blue-600' />
        </CardHeader>
        <CardContent>
          <div className='text-3xl font-bold'>{totalEmployees}</div>
          <p className='mt-1 text-xs text-gray-500'>Karyawan aktif</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium'>Total Hadir</CardTitle>
          <Calendar className='h-4 w-4 text-green-600' />
        </CardHeader>
        <CardContent>
          <div className='text-3xl font-bold text-green-600'>
            {totalPresentDays}
          </div>
          <p className='mt-1 text-xs text-gray-500'>Hari kehadiran (H)</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium'>Total Alpha</CardTitle>
          <Calendar className='h-4 w-4 text-red-600' />
        </CardHeader>
        <CardContent>
          <div className='text-3xl font-bold text-red-600'>
            {totalAbsentDays}
          </div>
          <p className='mt-1 text-xs text-gray-500'>Hari ketidakhadiran (A)</p>
        </CardContent>
      </Card>
    </div>
  )
}
