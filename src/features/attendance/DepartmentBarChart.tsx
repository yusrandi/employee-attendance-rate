'use client'

import { BarChart, Bar, CartesianGrid, XAxis, LabelList } from 'recharts'
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
import { DepartmentStats } from './attendance.types'

interface DepartmentBarChartProps {
  data: DepartmentStats[]
}

const chartConfig = {
  avgAttendance: {
    label: 'Avg Attendance (%)',
    color: 'primary', // soft green
  },
  totalEmployees: {
    label: 'Total Karyawan',
    color: 'var(--chart-2)', // soft blue
  },
} satisfies ChartConfig

export function DepartmentBarChart({ data }: DepartmentBarChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Kehadiran per Departemen</CardTitle>
        <CardDescription>
          Statistik kehadiran berdasarkan departemen
        </CardDescription>
      </CardHeader>

      <CardContent>
        <ChartContainer config={chartConfig} className='h-80 w-full'>
          <BarChart
            data={data}
            accessibilityLayer
            margin={{ top: 40, right: 16, left: 16, bottom: 10 }}
          >
            <CartesianGrid vertical={false} />

            {/* <YAxis
              tickLine={true}
              axisLine={false}
              tickMargin={10}
              tickFormatter={(value) => `${value}%`}
              domain={[0, 110]}
              interval={0}
              ticks={[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]}
            /> */}

            <XAxis
              dataKey='department'
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              fontSize={10}
              //   angle={-45}
            />

            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator='dashed' />}
            />

            {/* <Bar
              dataKey='totalEmployees'
              fill={chartConfig.totalEmployees.color}
              radius={4}
            /> */}

            <Bar
              dataKey='avgAttendance'
              //   fill={chartConfig.avgAttendance.color}
              fill='currentColor'
              radius={4}
            >
              <LabelList
                dataKey='avgAttendance'
                position='top'
                // fontSize={16}
                formatter={(value) => `${value}%`}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
