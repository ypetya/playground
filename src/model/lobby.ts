import Person from './person';

export default class Lobby {
  private people: Array<Person>;

  constructor(lobby?: Lobby) {
    this.people = new Array();
    if(lobby) {
       this.people = lobby.people.map((p)=> new Person(p));
    } 
  }

  private findOrCreate(name: string): Person {
    let i:number;
    for (i = 0; i < this.people.length; i++) {
      if (this.people[i].getName() === name) {
        return this.people[i];
      }
    }
    let person = new Person();
    person.setName(name);
    this.people.push(person);

    return person;
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

  public getPeople(): string {
    return this.people.map((p) => p.getName()).join(',') || 'nobody';
  }
}
