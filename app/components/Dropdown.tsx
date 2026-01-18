'use client';

import { Component, ReactElement } from 'react';

interface DropdownProps {
  label?: string;
  options?: { value: string; label: string }[];
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
  placeholder?: string;
}

export default class Dropdown extends Component<DropdownProps> {
  public render(): ReactElement {
    const { label, options = [], value, onChange, className = '', placeholder = '' } = this.props;

    return (
      <div className={className}>
        {label && (
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {label}
          </label>
        )}
        <div className="relative">
          <select
            value={value || ''}
            onChange={(e) => onChange && onChange(e.target.value)}
            className="appearance-none px-4 py-2 border border-gray-300 rounded-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-900 dark:border-zinc-700 dark:text-white w-full pr-10"
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg
              className="h-5 w-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      </div>
    );
  }
}
