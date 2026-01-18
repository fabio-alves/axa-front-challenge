'use client';

import { Component, ReactElement } from 'react';
import SearchInput from '../components/SearchInput';
import Dropdown from '../components/Dropdown';
import HolidayTable, { HolidayRecord } from '../components/HolidayTable';

interface HollydaysPageState {
  searchValue: string;
  tipoFilter: string;
  dataFilter: string;
  sortBy: string;
  records: HolidayRecord[];
}

export default class HollydaysPage extends Component<{}, HollydaysPageState> {
  constructor(props: {}) {
    super(props);
    
    this.state = {
      searchValue: '',
      tipoFilter: '',
      dataFilter: '',
      sortBy: '',
      records: [
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
      ],
    };
  }

  private handleSearchChange = (value: string): void => {
    this.setState({ searchValue: value });
  };

  private handleSearch = (): void => {
    // Implementar lógica de busca
    console.log('Buscar:', this.state.searchValue);
  };

  private handleTipoChange = (value: string): void => {
    this.setState({ tipoFilter: value });
  };

  private handleDataChange = (value: string): void => {
    this.setState({ dataFilter: value });
  };

  private handleSortChange = (value: string): void => {
    this.setState({ sortBy: value });
  };

  private handleRowClick = (record: HolidayRecord): void => {
    // Implementar navegação para detalhes
    console.log('Clicou em:', record);
  };

  public render(): ReactElement {
    const { searchValue, tipoFilter, dataFilter, sortBy, records } = this.state;

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

    return (
      <div className="container mx-auto px-4 py-8 bg-white dark:bg-black">
        <div className="mb-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="flex-1">
              <SearchInput
                placeholder="Busque por nome"
                value={searchValue}
                onChange={this.handleSearchChange}
                onSearch={this.handleSearch}
              />
            </div>
            <div className="text-gray-600 dark:text-gray-400 font-medium whitespace-nowrap">
              907 REGISTROS
            </div>
            <div className="w-48">
              <Dropdown
                label="ORDENAR POR"
                options={sortOptions}
                value={sortBy}
                onChange={this.handleSortChange}
              />
            </div>
          </div>
          
          <div className="flex gap-4">
            <div className="w-48">
              <Dropdown
                placeholder="Tipo"
                options={tipoOptions}
                value={tipoFilter}
                onChange={this.handleTipoChange}
              />
            </div>
            <div className="w-48">
              <Dropdown
                placeholder="Data do Feriado"
                options={[]}
                value={dataFilter}
                onChange={this.handleDataChange}
              />
            </div>
          </div>
        </div>

        <HolidayTable
          records={records}
          onRowClick={this.handleRowClick}
        />
      </div>
    );
  }
}
