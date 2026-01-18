'use client';

import { Component, ReactElement } from 'react';
import { Tab } from './models/Tab';
import { TabManager } from './models/TabManager';
import { PageService } from './services/PageService';
import Header from './components/Header';

/**
 * Componente principal da aplicação com header e tabs
 */
export default class Home extends Component<{}, { tabManager: TabManager; pageService: PageService }> {
  constructor(props: {}) {
    super(props);
    
    // Inicializa as tabs
    const tabs = [
      new Tab('screenapage', 'Tela A', 'screenapage'),
      new Tab('screenbpage', 'Tela B', 'screenbpage'),
      new Tab('screencpage', 'Tela C', 'screencpage'),
      new Tab('hollydays', 'Feriados', 'hollydays'),
    ];

    // Inicializa o TabManager e PageService
    const tabManager = new TabManager(tabs, 'home');
    const pageService = new PageService();

    this.state = {
      tabManager,
      pageService,
    };
  }

  private handleTabChange = (tabId: string): void => {
    this.setState((prevState) => {
      const newTabManager = new TabManager(prevState.tabManager.getTabs());
      newTabManager.setActiveTab(tabId);
      return {
        tabManager: newTabManager,
        pageService: prevState.pageService,
      };
    });
  };

  public render(): ReactElement {
    const { tabManager, pageService } = this.state;
    const activeTab = tabManager.getActiveTab();

    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-black">
        <Header
          tabs={tabManager.getTabs()}
          activeTabId={tabManager.getActiveTabId()}
          onTabChange={this.handleTabChange}
        />
        <main className="min-h-screen bg-white dark:bg-black">
          {activeTab && pageService.renderPage(activeTab.getRoute())}
        </main>
      </div>
    );
  }
}
