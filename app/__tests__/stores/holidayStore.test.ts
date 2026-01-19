import { renderHook, act } from '@testing-library/react';
import { useHolidayStore } from '../../stores/holidayStore';

describe('HolidayStore', () => {
  beforeEach(() => {
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
      { name: 'Test Holiday', date: '01/01/2025', type: 'nacional' as const },
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
      result.current.setTypeFilter('nacional');
      result.current.setDateFilter('2025');
      result.current.setSortBy('name');
    });

    expect(result.current.typeFilter).toBe('nacional');
    expect(result.current.dateFilter).toBe('2025');
    expect(result.current.sortBy).toBe('name');
  });
});
