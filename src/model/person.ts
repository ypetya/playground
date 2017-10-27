const TIMEOUT = 30000;//ms
export default class Person {
  private name: string;
  private lastSeen: Date;

  constructor(person?: Person) {
    if (person) {
      this.name = person.name;
      this.lastSeen = person.lastSeen;
    } else {
      this.name = 'nobody';
      this.lastSeen = new Date();
    }
  }

  public touch() {
    this.lastSeen = new Date();
  }

  public isPresent() {
    return (Number(new Date()) - Number(this.lastSeen)) <= TIMEOUT;
  }

  public getLastSeen(): Date {
    return this.lastSeen;
  }

  public setName(name: string) {
    this.name = name;
  }

  public getName(): string {
    return this.name;
  }
}
