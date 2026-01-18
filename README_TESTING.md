# Guia de Testes e Gerenciamento de Estado

## 📦 Ferramentas Instaladas

### Gerenciador de Estado: **Zustand**
- ✅ Leve e simples
- ✅ Funciona bem com TypeScript
- ✅ Não precisa de providers
- ✅ Ideal para gerenciamento de estado global

### Testes: **Jest + React Testing Library**
- ✅ Padrão do Next.js
- ✅ Suporte completo a componentes React
- ✅ Simples de configurar e usar

## 🗂️ Estrutura Criada

```
app/
├── stores/
│   └── holidayStore.ts          # Store Zustand para gerenciar estado dos feriados
├── __tests__/
│   ├── components/
│   │   └── Badge.test.tsx       # Testes do componente Badge
│   └── stores/
│       └── holidayStore.test.ts # Testes do store
```

## 🚀 Como Usar o Zustand Store

### 1. Importar o store

```typescript
import { useHolidayStore } from '../stores/holidayStore';
```

### 2. Usar no componente

```typescript
function MyComponent() {
  const { 
    records,           // Array de feriados
    loading,           // Estado de carregamento
    error,             // Mensagem de erro
    totalRecords,      // Total de registros
    fetchHolidays,     // Função para buscar feriados
    setSearchValue,    // Atualizar valor de busca
    // ... outros métodos
  } = useHolidayStore();

  // Buscar ao montar componente
  useEffect(() => {
    fetchHolidays();
  }, []);

  return <div>{/* seu componente */}</div>;
}
```

### 3. Fazer requisição no store

Edite `app/stores/holidayStore.ts` e modifique a função `fetchHolidays`:

```typescript
fetchHolidays: async () => {
  set({ loading: true, error: null });
  
  try {
    // Sua requisição aqui
    const response = await fetch('/api/holidays');
    const data = await response.json();
    
    set({ 
      records: data.records, 
      totalRecords: data.total,
      loading: false 
    });
  } catch (error) {
    set({ 
      error: 'Erro ao buscar feriados',
      loading: false 
    });
  }
},
```

## 🧪 Como Executar Testes

### Executar todos os testes
```bash
npm test
```

### Executar testes em modo watch (desenvolvimento)
```bash
npm run test:watch
```

### Executar testes com cobertura
```bash
npm run test:coverage
```

## 📝 Exemplo de Teste

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

## 📚 Documentação

- **Zustand**: https://github.com/pmndrs/zustand
- **Jest**: https://jestjs.io/
- **React Testing Library**: https://testing-library.com/react
