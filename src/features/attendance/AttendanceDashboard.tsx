// components/AttendanceDashboard.tsx
import React, { useState } from 'react'
import { Upload } from 'lucide-react'
import * as XLSX from 'xlsx'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { AttendanceDistributionChart } from './AttendanceDistributionChart'
import { AttendanceTrendChart } from './AttendanceTrendChart'
import { DepartmentBarChart } from './DepartmentBarChart'
import { DepartmentTable } from './DepartmentTable'
import { EmployeeDetailTable } from './EmployeeDetailTable'
import { MonthTab } from './MonthTab'
import { PTFilter } from './Ptfilter'
import { SummaryCards } from './SummaryCards'
import { AttendanceRecord } from './attendance.types'
import { isMultiMonthFormat, parseMultiMonthExcel } from './parseExcel'
import { useAttendanceStats } from './useAttendanceStats'

const AttendanceDashboard: React.FC = () => {
  const [allMonthsData, setAllMonthsData] = useState<AttendanceRecord[][]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string>('')
  const [selectedPT, setSelectedPT] = useState<string>('all')

  // Get unique PT values from data
  const availablePTs = React.useMemo(() => {
    const allData = allMonthsData.flat()
    const ptSet = new Set(allData.map((record) => record.PT))
    return Array.from(ptSet).filter(Boolean).sort()
  }, [allMonthsData])

  // Filter data by selected PT
  const filteredMonthsData = React.useMemo(() => {
    if (selectedPT === 'all') return allMonthsData

    return allMonthsData
      .map((monthData) =>
        monthData.filter((record) => record.PT === selectedPT)
      )
      .filter((monthData) => monthData.length > 0)
  }, [allMonthsData, selectedPT])

  // Overall stats for filtered data
  const stats = useAttendanceStats(filteredMonthsData)

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setLoading(true)
    setError('')

    const reader = new FileReader()
    reader.onload = (evt) => {
      try {
        const bstr = evt.target?.result
        const wb = XLSX.read(bstr, { type: 'binary' })
        const wsname = wb.SheetNames[0]
        const ws = wb.Sheets[wsname]

        const jsonData: any[] = XLSX.utils.sheet_to_json(ws, {
          header: 1,
          defval: 0,
          raw: false,
        })

        // Check if multi-month format
        if (isMultiMonthFormat(jsonData)) {
          const monthsData = parseMultiMonthExcel(jsonData)

          if (monthsData.length > 0) {
            setAllMonthsData(monthsData)
            console.log(`✅ Loaded ${monthsData.length} months of data`)
          } else {
            setError('No valid data found in file.')
          }
        } else {
          setError(
            'File is not in multi-month format. Please use the correct template.'
          )
        }

        setLoading(false)
      } catch (err) {
        console.error('Parse error:', err)
        setError('Error reading file. Please check format.')
        setLoading(false)
      }
    }

    reader.onerror = () => {
      setError('Error reading file.')
      setLoading(false)
    }

    reader.readAsBinaryString(file)
  }

  return (
    <div className='min-h-screen p-6'>
      <div className='mx-auto max-w-7xl space-y-6'>
        {/* Header */}
        <div className='flex items-center justify-between'>
          <div>
            <h1 className='text-3xl font-bold'>Dashboard Kehadiran Karyawan</h1>
            <p className='mt-1 text-gray-500'>
              {allMonthsData.length > 0
                ? `Menampilkan data ${filteredMonthsData.length} bulan - ${filteredMonthsData.map((m) => m[0]?.month).join(', ')}`
                : 'Upload file Excel multi-month untuk melihat dashboard'}
            </p>
          </div>

          <div className='relative'>
            <input
              type='file'
              accept='.xlsx,.xls'
              onChange={handleFileUpload}
              className='hidden'
              id='file-upload'
            />
            <label htmlFor='file-upload'>
              <Button asChild disabled={loading}>
                <span className='cursor-pointer'>
                  <Upload className='mr-2 h-4 w-4' />
                  {loading ? 'Loading...' : 'Upload Excel'}
                </span>
              </Button>
            </label>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <Alert variant='destructive'>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* PT Filter */}
        {allMonthsData.length > 0 && availablePTs.length > 0 && (
          <PTFilter
            availablePTs={availablePTs}
            selectedPT={selectedPT}
            onSelectPT={setSelectedPT}
          />
        )}

        {/* Content */}
        {allMonthsData.length === 0 ? (
          <div className='rounded-lg border-2 border-dashed border-gray-300 p-12'>
            <div className='text-center'>
              <Upload className='mx-auto h-12 w-12 text-gray-400' />
              <h3 className='mt-2 text-sm font-semibold text-gray-900'>
                Upload File Excel
              </h3>
              <p className='mt-1 text-sm text-gray-500'>
                Upload file Excel dengan format multi-month (Dec-25, Jan-26,
                Feb-26, etc)
              </p>
              <p className='mt-1 text-xs text-gray-400'>
                File harus berisi columns: NO, PT, NIK, NAMA, DEPARTEMENT,
                JABATAN, dan data per bulan
              </p>
            </div>
          </div>
        ) : filteredMonthsData.length === 0 ? (
          <div className='rounded-lg border-2 border-dashed border-gray-300 p-12'>
            <div className='text-center'>
              <h3 className='mt-2 text-sm font-semibold text-gray-900'>
                Tidak ada data untuk PT yang dipilih
              </h3>
              <p className='mt-1 text-sm text-gray-500'>
                Silakan pilih PT lain dari filter di atas
              </p>
            </div>
          </div>
        ) : (
          <>
            {/* Summary Cards - Overall */}
            <div>
              <h2 className='mb-3 text-lg font-semibold'>
                Statistik Keseluruhan
                {selectedPT !== 'all' && (
                  <span className='ml-2 text-sm font-normal text-gray-500'>
                    (PT: {selectedPT})
                  </span>
                )}
              </h2>
              <SummaryCards
                overallAttendance={stats.overallAttendance}
                totalEmployees={stats.totalEmployees}
                totalPresentDays={stats.totalPresentDays}
                totalAbsentDays={stats.totalAbsentDays}
              />
            </div>

            {/* Trend Chart */}
            <AttendanceTrendChart data={stats.monthlyTrend} />

            {/* Tabs for Each Month */}
            <Tabs defaultValue='all' className='w-full'>
              <TabsList
                className='grid w-full'
                style={{
                  gridTemplateColumns: `repeat(${filteredMonthsData.length + 1}, 1fr)`,
                }}
              >
                <TabsTrigger value='all'>Semua Data</TabsTrigger>
                {filteredMonthsData.map((monthData, index) => (
                  <TabsTrigger key={index} value={`month-${index}`}>
                    {monthData[0]?.month || `Bulan ${index + 1}`}
                  </TabsTrigger>
                ))}
              </TabsList>

              {/* All Data Tab */}
              <TabsContent value='all' className='space-y-6'>
                <AttendanceDistributionChart
                  data={stats.attendanceDistribution}
                />
                <DepartmentBarChart data={stats.departmentStats} />

                <DepartmentTable data={stats.departmentStats} />
                <EmployeeDetailTable data={stats.allData} />
              </TabsContent>

              {/* Individual Month Tabs */}
              {filteredMonthsData.map((monthData, index) => (
                <TabsContent key={index} value={`month-${index}`}>
                  <MonthTab monthData={monthData} />
                </TabsContent>
              ))}
            </Tabs>
          </>
        )}
      </div>
    </div>
  )
}

export default AttendanceDashboard
