import { Tab } from './Tab';

export class TabManager {
  private tabs: Tab[];
  private activeTabId: string;

  constructor(tabs: Tab[], initialTabId?: string) {
    this.tabs = tabs;
    this.activeTabId = initialTabId || tabs[0]?.getId() || '';
  }

  public getTabs(): Tab[] {
    return this.tabs;
  }

  public getActiveTabId(): string {
    return this.activeTabId;
  }

  public setActiveTab(tabId: string): void {
    const tabExists = this.tabs.some(tab => tab.getId() === tabId);
    if (tabExists) {
      this.activeTabId = tabId;
    }
  }

  public getActiveTab(): Tab | undefined {
    return this.tabs.find(tab => tab.getId() === this.activeTabId);
  }

  public getTabById(tabId: string): Tab | undefined {
    return this.tabs.find(tab => tab.getId() === tabId);
  }

  public addTab(tab: Tab): void {
    this.tabs.push(tab);
  }
}
