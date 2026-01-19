'use client';

import { ReactElement, useState, useEffect } from 'react';

export type AlertType = 'error' | 'success';

interface UseAlertProps {
  type: AlertType;
  message: string;
}

interface UseAlertReturn {
  AlertComponent: ReactElement | null;
}

export function useAlert({ type, message }: UseAlertProps): UseAlertReturn {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
    setIsVisible(!!message);
  }, [message]);

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleCardClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  if (!mounted || !message || !isVisible) {
    return { AlertComponent: null };
  }

  const AlertComponent: ReactElement = (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={handleClose}
    >
      <div 
        className="bg-white dark:bg-zinc-900 rounded-lg shadow-xl p-8 max-w-md w-full mx-4 flex flex-col items-center justify-center"
        onClick={handleCardClick}
      >
        <div className="mb-4">
          {type === 'error' ? (
            <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center">
              <svg
                className="w-10 h-10 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
          ) : (
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
              <svg
                className="w-10 h-10 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          )}
        </div>
        
        <p className={`text-center text-lg font-medium mb-6 ${
          type === 'error' 
            ? 'text-red-600 dark:text-red-400' 
            : 'text-green-600 dark:text-green-400'
        }`}>
          {message}
        </p>

        <button
          onClick={handleClose}
          className={`px-6 py-2 rounded-lg font-medium transition-colors ${
            type === 'error'
              ? 'bg-red-500 hover:bg-red-600 text-white'
              : 'bg-green-500 hover:bg-green-600 text-white'
          }`}
        >
          Entendi
        </button>
      </div>
    </div>
  );

  return {
    AlertComponent,
  };
}
