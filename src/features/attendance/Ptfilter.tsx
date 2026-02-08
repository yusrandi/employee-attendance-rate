// components/PTFilter.tsx
import React from 'react'
import { Filter } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

interface PTFilterProps {
  availablePTs: string[]
  selectedPT: string
  onSelectPT: (pt: string) => void
}

export const PTFilter: React.FC<PTFilterProps> = ({
  availablePTs,
  selectedPT,
  onSelectPT,
}) => {
  return (
    <Card>
      <CardContent className='py-4'>
        <div className='flex items-center gap-4'>
          <div className='flex items-center gap-2'>
            <Filter className='h-5 w-5 text-gray-500' />
            <label className='text-sm font-semibold text-gray-700'>
              Filter PT:
            </label>
          </div>

          <select
            value={selectedPT}
            onChange={(e) => onSelectPT(e.target.value)}
            className='max-w-xs flex-1 rounded-lg border border-gray-300 px-4 py-2 text-sm transition-colors hover:border-gray-400 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none'
          >
            <option value='all'>✨ Semua PT ({availablePTs.length} PT)</option>
            {availablePTs.map((pt) => (
              <option key={pt} value={pt}>
                {pt}
              </option>
            ))}
          </select>

          {selectedPT !== 'all' && (
            <div className='flex items-center gap-2'>
              <span className='rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700'>
                PT: {selectedPT}
              </span>
              <button
                onClick={() => onSelectPT('all')}
                className='text-xs text-gray-500 underline hover:text-gray-700'
              >
                Reset
              </button>
            </div>
          )}
        </div>

        <div className='mt-2 flex items-center gap-2'>
          <span className='text-xs text-gray-500'>
            {selectedPT === 'all'
              ? `Menampilkan semua data dari ${availablePTs.length} PT`
              : `Filter aktif untuk PT: ${selectedPT}`}
          </span>
        </div>
      </CardContent>
    </Card>
  )
}
