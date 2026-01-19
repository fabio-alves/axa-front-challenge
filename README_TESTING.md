# Testing and State Management Guide

## 📦 Installed Tools

### State Manager: **Zustand**
- ✅ Lightweight and simple
- ✅ Works well with TypeScript
- ✅ No providers needed
- ✅ Ideal for global state management

### Testing: **Jest + React Testing Library**
- ✅ Next.js standard
- ✅ Full support for React components
- ✅ Simple to configure and use

## 🗂️ Created Structure

```
app/
├── stores/
│   └── holidayStore.ts          # Zustand store to manage holidays state
├── __tests__/
│   ├── components/
│   │   └── Badge.test.tsx       # Badge component tests
│   ├── stores/
│   │   └── holidayStore.test.ts # Store tests
│   └── api/
│       └── holidays/
│           └── route.test.ts    # API route tests
```

## 🚀 How to Use Zustand Store

### 1. Import the store

```typescript
import { useHolidayStore } from '../stores/holidayStore';
```

### 2. Use in component

```typescript
function MyComponent() {
  const { 
    records,           // Array of holidays
    loading,           // Loading state
    error,             // Error message
    totalRecords,      // Total records
    fetchHolidays,     // Function to fetch holidays
    setSearchValue,    // Update search value
  } = useHolidayStore();

  useEffect(() => {
    fetchHolidays();
  }, []);

  return <div>{/* your component */}</div>;
}
```

### 3. Make request in store

Edit `app/stores/holidayStore.ts` and modify the `fetchHolidays` function:

```typescript
fetchHolidays: async () => {
  set({ loading: true, error: null });
  
  try {
    const response = await fetch('/api/holidays');
    const data = await response.json();
    
    set({ 
      records: data.records, 
      totalRecords: data.total,
      loading: false 
    });
  } catch (error) {
    set({ 
      error: 'Error fetching holidays',
      loading: false 
    });
  }
},
```

## 🧪 How to Run Tests

### Run all tests
```bash
npm test
```

### Run tests in watch mode (development)
```bash
npm run test:watch
```

### Run tests with coverage
```bash
npm run test:coverage
```

## 📝 Test Example

```typescript
import { render, screen } from '@testing-library/react';
import Badge from '../../components/Badge';

describe('Badge Component', () => {
  it('should render badge correctly', () => {
    render(<Badge label="Nacional" type="nacional" />);
    expect(screen.getByText('Nacional')).toBeInTheDocument();
  });
});
```

## 📚 Documentation

- **Zustand**: https://github.com/pmndrs/zustand
- **Jest**: https://jestjs.io/
- **React Testing Library**: https://testing-library.com/react
