'use client';

import { Component, ReactElement } from 'react';

interface DateInputProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
  label?: string;
}

export default class DateInput extends Component<DateInputProps> {
  public render(): ReactElement {
    const { placeholder = 'Data do Feriado', value = '', onChange, className = '', label } = this.props;

    return (
      <div className={className}>
        {label && (
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {label}
          </label>
        )}
        <input
          type="date"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange && onChange(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-900 dark:border-zinc-700 dark:text-white"
        />
      </div>
    );
  }
}
