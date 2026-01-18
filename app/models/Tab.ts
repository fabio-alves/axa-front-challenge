export class Tab {
  private id: string;
  private label: string;
  private route: string;

  constructor(id: string, label: string, route: string) {
    this.id = id;
    this.label = label;
    this.route = route;
  }

  public getId(): string {
    return this.id;
  }

  public getLabel(): string {
    return this.label;
  }

  public getRoute(): string {
    return this.route;
  }
}
