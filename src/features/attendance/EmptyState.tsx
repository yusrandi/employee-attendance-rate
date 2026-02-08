// components/EmptyState.tsx

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Upload } from 'lucide-react';

export const EmptyState: React.FC = () => {
  return (
    <Card className="border-dashed border-2">
      <CardContent className="flex flex-col items-center justify-center py-16">
        <Upload className="h-16 w-16 text-gray-400 mb-4" />
        <h3 className="text-xl font-semibold text-gray-700 mb-2">Upload File Excel</h3>
        <p className="text-gray-500 text-center max-w-md">
          Upload file Excel kehadiran karyawan untuk melihat analisis dan statistik lengkap
        </p>
      </CardContent>
    </Card>
  );
};
