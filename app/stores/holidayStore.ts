import { create } from 'zustand';
import { HolidayRecord } from '../components/HolidayTable';

interface HolidayStore {
  records: HolidayRecord[];
  loading: boolean;
  error: string | null;
  totalRecords: number;
  searchValue: string;
  tipoFilter: string;
  dataFilter: string;
  sortBy: string;
  
  // Actions
  setRecords: (records: HolidayRecord[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setTotalRecords: (total: number) => void;
  setSearchValue: (value: string) => void;
  setTipoFilter: (value: string) => void;
  setDataFilter: (value: string) => void;
  setSortBy: (value: string) => void;
  
  // Async action para buscar feriados
  fetchHolidays: () => Promise<void>;
}

export const useHolidayStore = create<HolidayStore>((set, get) => ({
  records: [],
  loading: false,
  error: null,
  totalRecords: 0,
  searchValue: '',
  tipoFilter: '',
  dataFilter: '',
  sortBy: '',

  setRecords: (records) => set({ records }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  setTotalRecords: (total) => set({ totalRecords: total }),
  setSearchValue: (value) => set({ searchValue: value }),
  setTipoFilter: (value) => set({ tipoFilter: value }),
  setDataFilter: (value) => set({ dataFilter: value }),
  setSortBy: (value) => set({ sortBy: value }),

  fetchHolidays: async () => {
    set({ loading: true, error: null });
    
    try {
      // Aqui você fará a requisição para a API
      // Exemplo: const response = await fetch('/api/holidays');
      // const data = await response.json();
      
      // Por enquanto, vamos simular uma requisição
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Dados mockados - substitua pela sua chamada de API
      const mockData: HolidayRecord[] = [
        {
          nome: 'Confraternização Mundial',
          data: '12/10/2025',
          tipo: 'nacional',
        },
        {
          nome: 'Confraternização Mundial',
          data: '12/10/2025',
          tipo: 'municipal',
        },
        {
          nome: 'Confraternização Mundial',
          data: '12/10/2025',
          tipo: 'nacional',
        },
      ];

      set({ 
        records: mockData, 
        totalRecords: mockData.length,
        loading: false 
      });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Erro ao buscar feriados',
        loading: false 
      });
    }
  },
}));
