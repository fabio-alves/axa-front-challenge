'use client';

import { Component, ReactElement } from 'react';

interface LoadingProps {
  message?: string;
  className?: string;
}

export default class Loading extends Component<LoadingProps> {
  public render(): ReactElement {
    const { message = 'Carregando...', className = '' } = this.props;

    return (
      <div className={`flex flex-col items-center justify-center py-12 ${className}`}>
        <div className="relative w-16 h-16 mb-4">
          <div className="absolute top-0 left-0 w-full h-full border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
        </div>
        <p className="text-gray-600 dark:text-gray-400 font-medium">{message}</p>
      </div>
    );
  }
}
