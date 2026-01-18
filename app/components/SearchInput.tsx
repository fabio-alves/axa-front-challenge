'use client';

import { Component, ReactElement } from 'react';

interface SearchInputProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onSearch?: () => void;
  className?: string;
}

export default class SearchInput extends Component<SearchInputProps> {
  public render(): ReactElement {
    const { placeholder = 'Busque por nome', value = '', onChange, onSearch, className = '' } = this.props;

    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange && onChange(e.target.value)}
          className="flex-1 px-4 py-2 border-b border-gray-300  focus:outline-none focus:border-blue-500 text-black dark:text-white dark:bg-zinc-900 dark:border-zinc-700"
        />
        <button
          onClick={onSearch}
          className="w-10 h-10 bg-blue-800 rounded-full flex items-center justify-center text-white hover:bg-blue-900 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </div>
    );
  }
}
