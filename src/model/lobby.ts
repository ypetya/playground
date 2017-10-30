import Person from './person';

export default class Lobby {
  private people: Array<Person>;
  private changed: boolean;

  constructor(lobby?: Lobby) {
    this.people = new Array();
    if (lobby) {
      this.people = lobby.people.map((p) => new Person(p));
    }
    this.changed = false;
  }

  public hasChange() : boolean {
    return this.changed;
  }

  private findOrCreate(name: string): Person {
    let i: number;
    for (i = 0; i < this.people.length; i++) {
      let user = this.people[i];
      if (user.getName() === name) {
        user.touch();
        return user;
      }
      if(!user.isPresent()) {
        this.removeIth(i--);
      }
    }
    
    let person = new Person();
    person.setName(name);
    this.people.push(person);
    this.changed = true;
    return person;
  }

  private removeIth(ith:number): void {
    this.people.splice(ith,1);
    this.changed = true;
  }

  public add(name: string): Person {
    let person = this.findOrCreate(name);
    return person;
  }

  public remove(name: string) {
    let i: number;

    for (i = 0; i < this.people.length; i++) {
      if (this.people[i].getName() === name) break;
    }
    if (i < this.people.length) this.people.splice(i);
  }

  public getPeople() {
    return this.people;
  }
}
