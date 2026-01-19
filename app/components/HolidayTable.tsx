'use client';

import { Component, ReactElement } from 'react';
import Badge from './Badge';

export interface HolidayRecord {
  name: string;
  date: string;
  type: 'nacional' | 'municipal' | 'estadual';
}

interface HolidayTableProps {
  records: HolidayRecord[];
  onRowClick?: (record: HolidayRecord) => void;
  className?: string;
}

export default class HolidayTable extends Component<HolidayTableProps> {
  public render(): ReactElement {
    const { records, onRowClick, className = '' } = this.props;

    return (
      <div className={`overflow-x-auto ${className}`}>
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-gray-200 dark:border-zinc-700">
              <th className="text-left py-4 px-4 font-bold text-black dark:text-white">Nome</th>
              <th className="text-left py-4 px-4 font-bold text-black dark:text-white">Data</th>
              <th className="text-left py-4 px-4 font-bold text-black dark:text-white">Tipo</th>
              <th className="w-8"></th>
            </tr>
          </thead>
          <tbody>
            {records.map((record, index) => (
              <tr
                key={index}
                onClick={() => onRowClick && onRowClick(record)}
                className="border-b border-gray-100 dark:border-zinc-800 hover:bg-gray-50 dark:hover:bg-zinc-900 cursor-pointer transition-colors"
              >
                <td className="py-4 px-4 text-gray-700 dark:text-gray-300">{record.name}</td>
                <td className="py-4 px-4 text-gray-700 dark:text-gray-300">{record.date}</td>
                <td className="py-4 px-4">
                  <Badge
                    label={record.type.charAt(0).toUpperCase() + record.type.slice(1)}
                    type={record.type}
                  />
                </td>
                <td className="py-4 px-4">
                  <svg
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
