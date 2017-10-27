import Person from './person';

export default class Lobby {
  private people: Array<Person>;

  constructor(lobby?: Lobby) {
    this.people = new Array();
    if (lobby) {
      this.people = lobby.people.map((p) => new Person(p));
    }
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
        this.people.splice(i--,1);
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

  public getPeople() {
    return this.people;
  }
}
