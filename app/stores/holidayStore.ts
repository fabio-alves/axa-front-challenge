import { create } from 'zustand';
import { HolidayRecord } from '../components/HolidayTable';

interface HolidayStore {
  records: HolidayRecord[];
  allRecords: HolidayRecord[];
  loading: boolean;
  error: string | null;
  totalRecords: number;
  searchValue: string;
  typeFilter: string;
  dateFilter: string;
  sortBy: string;
  
  setRecords: (records: HolidayRecord[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setTotalRecords: (total: number) => void;
  setSearchValue: (value: string) => void;
  setTypeFilter: (value: string) => void;
  setDateFilter: (value: string) => void;
  setSortBy: (value: string) => void;
  
  fetchHolidays: () => Promise<void>;
  
  filterRecordsByName: (searchTerm: string) => void;
  
  sortRecords: () => void;
  
  
  applyFilters: () => void;
 
  getUniqueDates: () => string[];
}

export const useHolidayStore = create<HolidayStore>((set, get) => ({
  records: [],
  allRecords: [], 
  loading: false,
  error: null,
  totalRecords: 0,
  searchValue: '',
  typeFilter: '',
  dateFilter: '',
  sortBy: '',

  setRecords: (records) => set({ records, allRecords: records }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  setTotalRecords: (total) => set({ totalRecords: total }),
  setSearchValue: (value) => set({ searchValue: value }),
  setTypeFilter: (value) => {
    set({ typeFilter: value });

    const store = get();
    store.applyFilters();
  },
  setDateFilter: (value) => {
    set({ dateFilter: value });
    
    const store = get();
    store.applyFilters();
  },
  setSortBy: (value) => {
    set({ sortBy: value });
    const store = get();
    store.sortRecords();
  },

  sortRecords: () => {
    const { records, sortBy } = get();
    
    if (!sortBy || records.length === 0) {
      return;
    }

    const sorted = [...records].sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name, 'pt-BR');        
        case 'date':
          const monthA = parseInt(a.date.split('/')[1], 10);
          const monthB = parseInt(b.date.split('/')[1], 10);
          return monthA - monthB;        
        case 'type':
          const typeOrder: Record<'nacional' | 'estadual' | 'municipal', number> = {
            'nacional': 1,
            'estadual': 2,
            'municipal': 3,
          };
          return typeOrder[a.type] - typeOrder[b.type];
        
        default:
          return 0;
      }
    });

    set({ records: sorted });
  },

  
  applyFilters: () => {
    const { allRecords, searchValue, typeFilter, dateFilter, sortBy } = get();
    
    let filtered: HolidayRecord[] = [...allRecords];
    
    if (searchValue && searchValue.trim() !== '') {
      const searchLower = searchValue.toLowerCase().trim();
      filtered = filtered.filter((record) =>
        record.name.toLowerCase().startsWith(searchLower)
      );
    }
    
    if (typeFilter && typeFilter.trim() !== '') {
      filtered = filtered.filter((record) =>
        record.type === typeFilter
      );
    }
    
   
    if (dateFilter && dateFilter.trim() !== '') {
      filtered = filtered.filter((record) =>
        record.date === dateFilter
      );
    }

    set({ 
      records: filtered, 
      totalRecords: filtered.length 
    });

    if (sortBy) {
      const store = get();
      store.sortRecords();
    }
  },

  filterRecordsByName: (searchTerm: string) => {
    set({ searchValue: searchTerm });
    const store = get();
    store.applyFilters();
  },

  fetchHolidays: async () => {
    set({ loading: true, error: null });
    
    try {
      const response = await fetch('/api/holidays');
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Request failed: ${response.status}`);
      }
      
      const apiData = await response.json();
      
  
      const mappedData: HolidayRecord[] = apiData.map((item: any) => {
        const dateParts = item.date.split('-');
        const formattedDate = `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;
        
        const typeMap: Record<string, 'nacional' | 'municipal' | 'estadual'> = {
          'national': 'nacional',
          'municipal': 'municipal',
          'state': 'estadual',
        };
        
        const type = typeMap[item.type] || 'nacional';
        
        return {
          name: item.name,
          date: formattedDate,
          type: type,
        };
      });

      set({ 
        records: mappedData,
        allRecords: mappedData, 
        totalRecords: mappedData.length,
        loading: false 
      });

      const store = get();
      store.applyFilters();
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Error fetching holidays',
        loading: false 
      });
    }
  },

  getUniqueDates: () => {
    const { allRecords } = get();
    const uniqueDates = Array.from(new Set(allRecords.map(record => record.date)));
    
    return uniqueDates.sort((a, b) => {
      const [dayA, monthA, yearA] = a.split('/').map(Number);
      const [dayB, monthB, yearB] = b.split('/').map(Number);
      const dateA = new Date(yearA, monthA - 1, dayA);
      const dateB = new Date(yearB, monthB - 1, dayB);
      return dateA.getTime() - dateB.getTime();
    });
  },
}));
