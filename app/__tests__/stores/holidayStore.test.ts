import { renderHook, act } from '@testing-library/react';
import { useHolidayStore } from '../../stores/holidayStore';

describe('HolidayStore', () => {
  beforeEach(() => {
    // Reset store state before each test
    const { result } = renderHook(() => useHolidayStore());
    act(() => {
      result.current.setRecords([]);
      result.current.setLoading(false);
      result.current.setError(null);
      result.current.setTotalRecords(0);
    });
  });

  it('should initialize with empty state', () => {
    const { result } = renderHook(() => useHolidayStore());
    
    expect(result.current.records).toEqual([]);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(null);
    expect(result.current.totalRecords).toBe(0);
  });

  it('should set records', () => {
    const { result } = renderHook(() => useHolidayStore());
    const mockRecords = [
      { nome: 'Test Holiday', data: '01/01/2025', tipo: 'nacional' as const },
    ];

    act(() => {
      result.current.setRecords(mockRecords);
    });

    expect(result.current.records).toEqual(mockRecords);
  });

  it('should set loading state', () => {
    const { result } = renderHook(() => useHolidayStore());

    act(() => {
      result.current.setLoading(true);
    });

    expect(result.current.loading).toBe(true);
  });

  it('should fetch holidays and update state', async () => {
    const { result } = renderHook(() => useHolidayStore());

    await act(async () => {
      await result.current.fetchHolidays();
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.records.length).toBeGreaterThan(0);
    expect(result.current.totalRecords).toBeGreaterThan(0);
  });

  it('should set search value', () => {
    const { result } = renderHook(() => useHolidayStore());

    act(() => {
      result.current.setSearchValue('test search');
    });

    expect(result.current.searchValue).toBe('test search');
  });

  it('should set filters', () => {
    const { result } = renderHook(() => useHolidayStore());

    act(() => {
      result.current.setTipoFilter('nacional');
      result.current.setDataFilter('2025');
      result.current.setSortBy('nome');
    });

    expect(result.current.tipoFilter).toBe('nacional');
    expect(result.current.dataFilter).toBe('2025');
    expect(result.current.sortBy).toBe('nome');
  });
});
