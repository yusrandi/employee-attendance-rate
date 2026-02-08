// components/AttendanceDistributionChart.tsx
import React from 'react'
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  PieSectorDataItem,
  Sector,
} from 'recharts'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { AttendanceDistribution } from './attendance.types'

interface AttendanceDistributionChartProps {
  data: AttendanceDistribution[]
}

const categories = [
  { key: 'H', label: 'Hadir', color: 'var(--chart-1)' },
  { key: 'A', label: 'Absent', color: 'var(--chart-2)' },
  { key: 'I', label: 'Izin', color: 'var(--chart-3)' },
  { key: 'S', label: 'Sakit', color: 'var(--chart-4)' },
  { key: 'CT', label: 'Cuti', color: 'var(--chart-5)' },
  //   { key: 'IT', label: 'IT', color: '#ec4899' },
  //   { key: 'L', label: 'Lainnya (L)', color: '#6b7280' },
  { key: 'OFF', label: 'OFF', color: '#14b8a6' },
]
const chartConfig = {
  Hadir: {
    label: 'Hadir',
    color: 'var(--chart-2)',
  },
  Absent: {
    label: 'Absent',
    color: 'var(--chart-1)',
  },
  Izin: {
    label: 'Izin',
    color: 'var(--chart-3)',
  },
  Sakit: {
    label: 'Sakit',
    color: 'var(--chart-4)',
  },
  Cuti: {
    label: 'Cuti',
    color: 'var(--chart-5)',
  },
  OFF: {
    label: 'OFF',
    color: '#14b8a6',
  },
} satisfies ChartConfig

export const AttendanceDistributionChart: React.FC<
  AttendanceDistributionChartProps
> = ({ data }) => {
  //   console.log({ data })

  return (
    <Card>
      <CardHeader>
        <CardTitle>Distribusi Kehadiran</CardTitle>
        <CardDescription>Breakdown status kehadiran karyawan</CardDescription>
      </CardHeader>

      <CardContent>
        <div className='flex flex-col gap-6 md:flex-row md:items-center'>
          {/* CHART */}
          <ChartContainer
            config={chartConfig}
            className='mx-auto aspect-square max-h-80 w-full md:w-[240px]'
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                dataKey='count'
                nameKey='category'
                cx='50%'
                cy='50%'
                innerRadius={60}
                outerRadius={110}
                paddingAngle={2}
                stroke='0'
                data={data}
              >
                {data.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ChartContainer>

          {/* LEGEND */}
          <div className='grid grid-cols-2 gap-3 text-sm md:min-w-80 md:grid-cols-1 md:gap-4'>
            {data.map((item, index) => (
              <div key={index} className='flex items-center gap-2'>
                <span
                  className='h-3 w-3 rounded-sm'
                  style={{ backgroundColor: item.color }}
                />
                <span className='text-muted-foreground'>{item.category}</span>
                <span className='ml-auto font-medium text-foreground'>
                  {item.count}
                </span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
