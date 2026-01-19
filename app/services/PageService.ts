import { ReactElement } from 'react';
import ScreenAPage from '../pages/ScreenAPage';
import ScreenBPage from '../pages/ScreenBPage';
import ScreenCPage from '../pages/ScreenCPage';
import HollydaysPage from '../pages/HollydaysPage';

export class PageService {
  private pageMap: Map<string, any>;

  constructor() {
    this.pageMap = new Map();
    this.initializePages();
  }

  private initializePages(): void {
    this.pageMap.set('screenapage', new ScreenAPage({}));
    this.pageMap.set('screenbpage', new ScreenBPage());
    this.pageMap.set('screencpage', new ScreenCPage());
    this.pageMap.set('hollydays', new HollydaysPage({}));
  }

  public getPage(route: string): any {
    return this.pageMap.get(route);
  }

  public renderPage(route: string): ReactElement | null {
    const page = this.getPage(route);
    return page ? page.render() : null;
  }
}
