'use client';

import { Component, ReactElement, useEffect } from 'react';
import { useHolidayStore } from '../stores/holidayStore';
import SearchInput from '../components/SearchInput';
import Dropdown from '../components/Dropdown';
import HolidayTable, { HolidayRecord } from '../components/HolidayTable';
import Loading from '../components/Loading';
import { useAlert } from '../hooks/useAlert';

function HolidaysPageContent() {
  const {
    records,
    loading,
    error,
    totalRecords,
    searchValue,
    typeFilter,
    dateFilter,
    sortBy,
    setSearchValue,
    setTypeFilter,
    setDateFilter,
    setSortBy,
    fetchHolidays,
    filterRecordsByName,
    applyFilters,
    getUniqueDates,
  } = useHolidayStore();

  const { AlertComponent } = useAlert({
    type: error ? 'error' : 'success',
    message: error ? 'Ocorreu um problema' : '',
  });

  useEffect(() => {
    fetchHolidays();
  }, [fetchHolidays]);

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
  };

  const handleSearch = () => {
    filterRecordsByName(searchValue);
  };

  const handleTypeChange = (value: string) => {
    setTypeFilter(value);
  };

  const handleDateChange = (value: string) => {
    setDateFilter(value);
  };

  const handleSortChange = (value: string) => {
    setSortBy(value);
  };

  const handleRowClick = (record: HolidayRecord) => {
    console.log('Clicou em:', record);
  };

  const typeOptions = [
    { value: 'nacional', label: 'Nacional' },
    { value: 'municipal', label: 'Municipal' },
    { value: 'estadual', label: 'Estadual' },
  ];

  const sortOptions = [
    { value: 'name', label: 'Nome' },
    { value: 'date', label: 'Data' },
    { value: 'type', label: 'Tipo' },
  ];

  const dateOptions = getUniqueDates().map(date => ({
    value: date,
    label: date,
  }));


  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 bg-white dark:bg-black">
        <Loading message="Carregando feriados..." />
      </div>
    );
  }

  return (
    <>

      {error && AlertComponent}
      
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
              options={sortOptions}
              value={sortBy}
              onChange={handleSortChange}
              placeholder="Ordernar por"
              noBorder={true}
            />
          </div>
        </div>
        
        <div className="flex gap-4">
          <div className="w-48">
            <Dropdown
              placeholder="Tipo"
              options={typeOptions}
              value={typeFilter}
              onChange={handleTypeChange}
              variant="default"              
            />
          </div>
          <div className="w-48">
            <Dropdown
              placeholder="Data do Feriado"
              options={dateOptions}
              value={dateFilter}
              onChange={handleDateChange}
              variant="light-gray"
            />
          </div>
        </div>
      </div>

      <HolidayTable
        records={records}
        onRowClick={handleRowClick}
      />
      </div>
    </>
  );
}

export default class HollydaysPage extends Component<{}, {}> {
  public render(): ReactElement {
    return <HolidaysPageContent />;
  }
}
