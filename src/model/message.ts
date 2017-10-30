import Person from "./person";

export default class Message {
    private text: string;
    private sender: Person;
    private timestamp: number;

    constructor(message?: Message) {
        if (message) {
            this.text = message.text;
            this.sender = new Person(message.sender);
            this.timestamp = message.timestamp;
        }
    }

    public create(sender:Person, text:string) {
        this.sender = sender;
        this.text = text;
        this.timestamp = Number(new Date);
    }

    public getSender(): Person {
        return this.sender;
    }

    public getText(): string {
        return this.text;
    }
}