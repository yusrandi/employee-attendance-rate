// components/FileUpload.tsx

import React from 'react';
import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';

interface FileUploadProps {
  onFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  loading: boolean;
}

export const FileUpload: React.FC<FileUploadProps> = ({ onFileUpload, loading }) => {
  return (
    <div className="relative">
      <input
        type="file"
        accept=".xlsx,.xls"
        onChange={onFileUpload}
        className="hidden"
        id="file-upload"
      />
      <label htmlFor="file-upload">
        <Button asChild disabled={loading}>
          <span className="cursor-pointer">
            <Upload className="mr-2 h-4 w-4" />
            {loading ? 'Loading...' : 'Upload Excel'}
          </span>
        </Button>
      </label>
    </div>
  );
};
