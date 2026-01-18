'use client';

/**
 * EXEMPLO: Como integrar o Zustand store na HollydaysPage
 * 
 * Este arquivo mostra como usar o holidayStore para fazer requisições
 * e gerenciar o estado dos feriados.
 * 
 * Para usar, substitua o conteúdo de HollydaysPage.tsx por este exemplo
 * e ajuste a URL da API conforme necessário.
 */

import { Component, ReactElement } from 'react';
import { useHolidayStore } from '../stores/holidayStore';
import SearchInput from '../components/SearchInput';
import Dropdown from '../components/Dropdown';
import HolidayTable, { HolidayRecord } from '../components/HolidayTable';

export default class HollydaysPage extends Component<{}, {}> {
  // Hook não pode ser usado diretamente em classes, então usamos HOC ou convertemos para functional component
  // OU usamos o store fora do componente e passamos via props
  
  public render(): ReactElement {
    // Em classes React, você precisa usar o store de forma diferente
    // Opção 1: Criar um wrapper functional component
    // Opção 2: Usar useEffect e useState para sincronizar com o store
    
    return <HolidaysPageWrapper />;
  }
}

// Wrapper functional component para usar hooks
function HolidaysPageWrapper() {
  const {
    records,
    loading,
    error,
    totalRecords,
    searchValue,
    tipoFilter,
    dataFilter,
    sortBy,
    setSearchValue,
    setTipoFilter,
    setDataFilter,
    setSortBy,
    fetchHolidays,
  } = useHolidayStore();

  // Buscar feriados ao montar o componente
  React.useEffect(() => {
    fetchHolidays();
  }, [fetchHolidays]);

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
  };

  const handleSearch = () => {
    // Refazer busca com novos filtros
    fetchHolidays();
  };

  const handleTipoChange = (value: string) => {
    setTipoFilter(value);
  };

  const handleDataChange = (value: string) => {
    setDataFilter(value);
  };

  const handleSortChange = (value: string) => {
    setSortBy(value);
  };

  const handleRowClick = (record: HolidayRecord) => {
    console.log('Clicou em:', record);
  };

  const tipoOptions = [
    { value: 'nacional', label: 'Nacional' },
    { value: 'municipal', label: 'Municipal' },
    { value: 'estadual', label: 'Estadual' },
  ];

  const sortOptions = [
    { value: 'nome', label: 'Nome' },
    { value: 'data', label: 'Data' },
    { value: 'tipo', label: 'Tipo' },
  ];

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 bg-white dark:bg-black">
        <div className="text-center">Carregando...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 bg-white dark:bg-black">
        <div className="text-center text-red-500">Erro: {error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-white dark:bg-black">
      <div className="mb-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="flex-1">
            <SearchInput
              placeholder="Busque por nome"
              value={searchValue}
              onChange={handleSearchChange}
              onSearch={handleSearch}
            />
          </div>
          <div className="text-gray-600 dark:text-gray-400 font-medium whitespace-nowrap">
            {totalRecords} REGISTROS
          </div>
          <div className="w-48">
            <Dropdown
              label="ORDENAR POR"
              options={sortOptions}
              value={sortBy}
              onChange={handleSortChange}
            />
          </div>
        </div>
        
        <div className="flex gap-4">
          <div className="w-48">
            <Dropdown
              placeholder="Tipo"
              options={tipoOptions}
              value={tipoFilter}
              onChange={handleTipoChange}
            />
          </div>
          <div className="w-48">
            <Dropdown
              placeholder="Data do Feriado"
              options={[]}
              value={dataFilter}
              onChange={handleDataChange}
            />
          </div>
        </div>
      </div>

      <HolidayTable
        records={records}
        onRowClick={handleRowClick}
      />
    </div>
  );
}

// Import necessário para o useEffect
import React from 'react';
