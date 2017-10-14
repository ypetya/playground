export class Person {
  private name: string;
  private lastSeen: Date;

  constructor(name: string) {
    this.name = name;
    this.lastSeen = new Date();
  }

  public touch() {
    this.lastSeen = new Date();
  }

  public getLastSeen(): Date {
    return this.lastSeen;
  }
}
