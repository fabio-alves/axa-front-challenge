'use client';

import { Tab } from '../models/Tab';
import { Component, ReactElement } from 'react';
import Title from './Title';

interface HeaderProps {
  tabs: Tab[];
  activeTabId: string;
  onTabChange: (tabId: string) => void;
  title?: string;
}

export default class Header extends Component<HeaderProps> {
  public render(): ReactElement {
    const { tabs, activeTabId, onTabChange, title = 'MEUS FERIADOS' } = this.props;

    return (
      <header className="bg-white dark:bg-black border-b border-zinc-200 dark:border-zinc-800">
        <nav className="container mx-auto px-4">
          <div className="mb-4 ml-4 mt-4">
            <Title text={title} />
          </div>
          <div className="flex space-x-1">
            {tabs.map((tab) => {
              const isActive = tab.getId() === activeTabId;
              return (
                <button
                  key={tab.getId()}
                  onClick={() => onTabChange(tab.getId())}
                  className={`
                    px-6 py-4 font-medium transition-colors duration-200
                    ${
                      isActive
                        ? 'text-black dark:text-white border-b-2 border-blue-800 dark:border-white'
                        : 'text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white'
                    }
                  `}
                >
                  {tab.getLabel()}
                </button>
              );
            })}
          </div>
        </nav>
      </header>
    );
  }
}
