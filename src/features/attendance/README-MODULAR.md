# Dashboard Kehadiran Karyawan - Modular Structure

Dashboard interaktif dengan struktur modular yang mudah di-maintain dan dikembangkan.

## 📁 Struktur Folder

```
project/
├── src/
│   ├── components/              # UI Components
│   │   ├── AttendanceDashboard.tsx       # Main dashboard component
│   │   ├── SummaryCards.tsx              # Summary metrics cards
│   │   ├── AttendanceTrendChart.tsx      # Line chart untuk tren
│   │   ├── AttendanceDistributionChart.tsx  # Pie chart distribusi
│   │   ├── DepartmentBarChart.tsx        # Bar chart per departemen
│   │   ├── DepartmentTable.tsx           # Tabel detail departemen
│   │   ├── EmployeeDetailTable.tsx       # Tabel detail karyawan
│   │   ├── FileUpload.tsx                # Upload file component
│   │   ├── EmptyState.tsx                # Empty state component
│   │   └── index.ts                      # Export barrel file
│   │
│   ├── types/                   # TypeScript Types
│   │   └── attendance.types.ts           # Interface & types
│   │
│   ├── utils/                   # Utility Functions
│   │   └── attendance.utils.ts           # Helper functions
│   │
│   ├── hooks/                   # Custom React Hooks
│   │   └── useAttendanceStats.ts         # Stats calculation hook
│   │
│   ├── lib/                     # External libraries
│   │   └── utils.ts                      # Shadcn utils
│   │
│   ├── App.tsx                  # Main App component
│   └── globals.css              # Global styles
│
├── package.json
├── tsconfig.json
└── README.md
```

## 🧩 Components Overview

### 1. **AttendanceDashboard** (Main Component)
File: `components/AttendanceDashboard.tsx`

Component utama yang mengorkestrasikan semua sub-components.

**Responsibilities:**
- Handle file upload
- Manage state (data, loading, error)
- Compose all child components

**Usage:**
```tsx
import { AttendanceDashboard } from './components';

function App() {
  return <AttendanceDashboard />;
}
```

---

### 2. **SummaryCards**
File: `components/SummaryCards.tsx`

Menampilkan 4 kartu metrik utama.

**Props:**
```tsx
interface SummaryCardsProps {
  overallAttendance: number;
  totalEmployees: number;
  totalPresentDays: number;
  totalAbsentDays: number;
}
```

**Features:**
- Tingkat Kehadiran (ATR rata-rata)
- Total Karyawan
- Total Hari Hadir
- Total Hari Absent
- Icons dari Lucide React

---

### 3. **AttendanceTrendChart**
File: `components/AttendanceTrendChart.tsx`

Line chart menampilkan tren kehadiran 6 bulan.

**Props:**
```tsx
interface AttendanceTrendChartProps {
  data: MonthlyTrend[];
}
```

**Features:**
- Line chart dengan Recharts
- Domain Y-axis: 80-100%
- Responsive container

---

### 4. **AttendanceDistributionChart**
File: `components/AttendanceDistributionChart.tsx`

Pie chart distribusi status kehadiran.

**Props:**
```tsx
interface AttendanceDistributionChartProps {
  data: AttendanceDistribution[];
}
```

**Features:**
- Pie chart dengan warna custom
- Label dengan percentage
- Tooltip interactive

---

### 5. **DepartmentBarChart**
File: `components/DepartmentBarChart.tsx`

Bar chart perbandingan departemen.

**Props:**
```tsx
interface DepartmentBarChartProps {
  data: DepartmentStats[];
}
```

**Features:**
- Dual bar chart (ATR & Total Karyawan)
- Rotated X-axis labels
- Color coded bars

---

### 6. **DepartmentTable**
File: `components/DepartmentTable.tsx`

Tabel detail statistik per departemen.

**Props:**
```tsx
interface DepartmentTableProps {
  data: DepartmentStats[];
}
```

**Features:**
- Sortable data (sorted by avgAttendance)
- Color coded attendance
- Building icon per row

---

### 7. **EmployeeDetailTable**
File: `components/EmployeeDetailTable.tsx`

Tabel detail lengkap setiap karyawan.

**Props:**
```tsx
interface EmployeeDetailTableProps {
  data: AttendanceRecord[];
}
```

**Features:**
- Scrollable table (max-height: 600px)
- Sticky header
- Color coded ATR
- Semua kolom kehadiran

---

### 8. **FileUpload**
File: `components/FileUpload.tsx`

Component untuk upload Excel file.

**Props:**
```tsx
interface FileUploadProps {
  onFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  loading: boolean;
}
```

**Features:**
- Hidden file input
- Button dengan loading state
- Accept only .xlsx, .xls

---

### 9. **EmptyState**
File: `components/EmptyState.tsx`

Tampilan ketika belum ada data.

**Features:**
- Centered layout
- Upload icon
- Call to action message

---

## 🔧 Utils & Hooks

### Utils (`utils/attendance.utils.ts`)

**Functions:**
```tsx
// Convert ATR decimal to percentage
toPercent(atr: number): number

// Calculate ATR from data
calculateATR(hariKerja: number, total: number): number

// Get color class based on ATR
getATRColorClass(atr: number): string

// Parse Excel data
parseExcelData(jsonData: any[]): AttendanceRecord[]
```

### Custom Hook (`hooks/useAttendanceStats.ts`)

**Hook:** `useAttendanceStats(data: AttendanceRecord[])`

**Returns:**
```tsx
{
  overallAttendance: number;
  totalEmployees: number;
  totalPresentDays: number;
  totalAbsentDays: number;
  attendanceDistribution: AttendanceDistribution[];
  departmentStats: DepartmentStats[];
  attendanceTrend: MonthlyTrend[];
}
```

**Benefits:**
- Memoized calculations dengan `useMemo`
- Single source of truth
- Reusable di multiple components

---

## 📝 Types

File: `types/attendance.types.ts`

**Interfaces:**
```tsx
AttendanceRecord          // Data karyawan dari Excel
DepartmentStats          // Statistik per departemen
MonthlyTrend            // Data tren bulanan
AttendanceDistribution  // Data distribusi status
```

---

## 🚀 Usage Examples

### Import Individual Components

```tsx
import { 
  SummaryCards,
  AttendanceTrendChart,
  DepartmentTable 
} from './components';

function CustomDashboard() {
  const [data, setData] = useState([]);
  const stats = useAttendanceStats(data);
  
  return (
    <>
      <SummaryCards {...stats} />
      <AttendanceTrendChart data={stats.attendanceTrend} />
      <DepartmentTable data={stats.departmentStats} />
    </>
  );
}
```

### Use Only Specific Sections

```tsx
// Hanya tampilkan summary dan trend
import { SummaryCards, AttendanceTrendChart } from './components';

function SimpleDashboard({ data }) {
  const stats = useAttendanceStats(data);
  
  return (
    <>
      <SummaryCards {...stats} />
      <AttendanceTrendChart data={stats.attendanceTrend} />
    </>
  );
}
```

### Custom Component with Utils

```tsx
import { toPercent, getATRColorClass } from './utils/attendance.utils';

function CustomATRBadge({ atr }: { atr: number }) {
  return (
    <span className={getATRColorClass(atr)}>
      {toPercent(atr)}%
    </span>
  );
}
```

---

## 🎨 Customization

### Menambah Component Baru

1. Buat file di `components/`
2. Define props interface
3. Implement component
4. Export di `components/index.ts`

Contoh:
```tsx
// components/CustomChart.tsx
interface CustomChartProps {
  data: any[];
}

export const CustomChart: React.FC<CustomChartProps> = ({ data }) => {
  return <div>Custom Chart</div>;
};

// components/index.ts
export { CustomChart } from './CustomChart';
```

### Menambah Utility Function

```tsx
// utils/attendance.utils.ts
export const calculateAverage = (numbers: number[]): number => {
  return numbers.reduce((a, b) => a + b, 0) / numbers.length;
};
```

### Menambah Type

```tsx
// types/attendance.types.ts
export interface NewType {
  field1: string;
  field2: number;
}
```

---

## 🧪 Testing Strategy

### Component Testing
```tsx
// __tests__/SummaryCards.test.tsx
import { render, screen } from '@testing-library/react';
import { SummaryCards } from '../components/SummaryCards';

test('renders attendance rate', () => {
  render(<SummaryCards 
    overallAttendance={95}
    totalEmployees={100}
    totalPresentDays={2850}
    totalAbsentDays={150}
  />);
  
  expect(screen.getByText('95%')).toBeInTheDocument();
});
```

### Hook Testing
```tsx
// __tests__/useAttendanceStats.test.tsx
import { renderHook } from '@testing-library/react';
import { useAttendanceStats } from '../hooks/useAttendanceStats';

test('calculates stats correctly', () => {
  const mockData = [/* mock data */];
  const { result } = renderHook(() => useAttendanceStats(mockData));
  
  expect(result.current.overallAttendance).toBeGreaterThan(0);
});
```

---

## 📊 Performance Optimization

### 1. Memoization
- `useMemo` di hook untuk heavy calculations
- `React.memo` untuk components yang sering re-render

### 2. Code Splitting
```tsx
// Lazy load heavy components
const DepartmentBarChart = lazy(() => import('./components/DepartmentBarChart'));
```

### 3. Virtual Scrolling (untuk tabel besar)
```tsx
import { useVirtualizer } from '@tanstack/react-virtual';
```

---

## 🔄 Migration Guide

### Dari Monolithic ke Modular

**Before:**
```tsx
// Single file dengan 500+ lines
const AttendanceDashboard = () => {
  // All logic here
}
```

**After:**
```tsx
// Main component: ~100 lines
// 9 separate components
// Reusable hooks & utils
```

**Steps:**
1. Copy semua file dari struktur modular
2. Update imports di App.tsx
3. Verify all paths correct
4. Test functionality
5. Remove old monolithic file

---

## 🎯 Best Practices

### 1. Component Composition
- Satu component = satu responsibility
- Props interface yang jelas
- Reusable components

### 2. State Management
- State di level tertinggi yang butuh
- Pass props down explicitly
- Consider Context API untuk global state

### 3. Type Safety
- Semua props harus typed
- No `any` types
- Use interface untuk complex types

### 4. File Organization
- Group by feature/domain
- Consistent naming convention
- Index files untuk easy imports

---

## 🐛 Troubleshooting

### Import Error
```
Module not found: Can't resolve './components'
```
**Fix:** Pastikan path alias di `tsconfig.json`:
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

### Type Error
```
Property 'ATR' does not exist on type 'AttendanceRecord'
```
**Fix:** Check import dari `types/attendance.types.ts`

### Component Not Rendering
**Fix:** Check export/import di `components/index.ts`

---

## 📚 Further Reading

- [React Component Patterns](https://reactpatterns.com/)
- [TypeScript Best Practices](https://www.typescriptlang.org/docs/handbook/declaration-files/do-s-and-don-ts.html)
- [Recharts Documentation](https://recharts.org/)
- [Shadcn/ui Components](https://ui.shadcn.com/)

---

## 📄 License

MIT

---

## 🤝 Contributing

Contributions welcome! Untuk menambah fitur baru:

1. Buat component baru di `components/`
2. Tambah types di `types/`
3. Tambah utils jika perlu di `utils/`
4. Update dokumentasi
5. Test thoroughly

Happy coding! 🎉
