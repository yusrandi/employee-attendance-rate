// components/AttendanceTrendChart.tsx
import React from 'react'
import { XAxis, YAxis, ResponsiveContainer, AreaChart, Area } from 'recharts'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { MonthlyTrend } from './attendance.types'

interface AttendanceTrendChartProps {
  data: MonthlyTrend[]
}

export const AttendanceTrendChart: React.FC<AttendanceTrendChartProps> = ({
  data,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tren Tingkat Kehadiran</CardTitle>
        <CardDescription>
          Persentase kehadiran per bulan terakhir
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width='100%' height={300}>
          <AreaChart data={data}>
            <XAxis
              dataKey='month'
              stroke='#10b981'
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke='#10b981'
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <Area
              type='monotone'
              dataKey='attendanceRate'
              stroke='#10b981'
              className='text-primary'
              fill='#10b981'
              fillOpacity={0.05}
            />
          </AreaChart>
          {/* <LineChart data={data}>
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='month' />
            <YAxis domain={[80, 100]} />
            <Tooltip />
            <Legend />
            <Line
              type='monotone'
              dataKey='attendanceRate'
              stroke='#10b981'
              strokeWidth={3}
              name='Tingkat Kehadiran (%)'
              dot={{ r: 5 }}
            />
          </LineChart> */}
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
