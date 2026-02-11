// components/AttendanceDistributionChart.tsx
import { useState } from 'react'
import { PieChart, Pie, Cell } from 'recharts'
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { AttendanceDistribution } from './attendance.types'

interface AttendanceDistributionChartProps {
  data: AttendanceDistribution[]
}

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

export const AttendanceDistributionChart = ({
  data,
}: AttendanceDistributionChartProps) => {
  const [selectedCategory, setSelectedCategory] =
    useState<AttendanceDistribution | null>(null)

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Distribusi Kehadiran</CardTitle>
          <CardDescription>
            Breakdown status kehadiran karyawan, Klik pada legeng untuk
            brekadown detail
          </CardDescription>
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
            <div className='grid grid-cols-2 text-sm md:min-w-80 md:grid-cols-1'>
              {data.map((item, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedCategory(item)}
                  className='flex items-center gap-2 rounded-md p-2 text-left transition-colors hover:bg-muted'
                >
                  <span
                    className='h-3 w-3 flex-shrink-0 rounded-sm'
                    style={{ backgroundColor: item.color }}
                  />
                  <span className='flex-1 truncate text-muted-foreground'>
                    {item.category}
                  </span>
                  <span className='ml-auto font-medium text-foreground'>
                    {item.count}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* BREAKDOWN DIALOG */}
      <Dialog
        open={!!selectedCategory}
        onOpenChange={() => setSelectedCategory(null)}
      >
        <DialogContent className='max-h-[80vh] max-w-2xl overflow-y-auto'>
          <DialogHeader>
            <DialogTitle>Detail {selectedCategory?.category}</DialogTitle>
            <DialogDescription>
              Total: {selectedCategory?.count} hari
            </DialogDescription>
          </DialogHeader>

          <div className='space-y-2'>
            {selectedCategory?.employees.length === 0 ? (
              <p className='py-8 text-center text-sm text-muted-foreground'>
                Tidak ada data karyawan
              </p>
            ) : (
              selectedCategory?.employees.map((emp, idx) => (
                <div
                  key={idx}
                  className='flex items-center justify-between rounded-lg border p-3 hover:bg-muted/50'
                >
                  <div className='min-w-0 flex-1'>
                    <p className='truncate font-medium'>{emp.nama}</p>
                    <p className='truncate text-sm text-muted-foreground'>
                      {emp.departemen}
                    </p>
                  </div>
                  <div className='ml-4 text-right'>
                    <p className='font-semibold'>{emp.count} hari</p>
                    <p className='text-xs text-muted-foreground'>
                      NIK: {emp.nik}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
