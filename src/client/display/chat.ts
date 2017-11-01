import * as d3 from "d3";

import { IOSocket, TransferObject } from "../../interface/definitions";
import Component from "./component";

import Person from "../../model/person";
import Lobby from "../../model/lobby";
import Message from "../../model/message";
import LobbyComponent from "./lobby";
import MessageComponent from "./message";
import InputFieldComponent from "./inputfield";


export default class Chat extends Component {
    private me: Person;

    private socket: IOSocket;
    protected componentClass = "chat";
    private messages = new Array<Message>();

    private lobbyComponent: LobbyComponent;
    private messageComponent: MessageComponent;
    private inputFieldComponent: InputFieldComponent;
    private userNameInputFieldComponent: InputFieldComponent;

    constructor(socket: IOSocket) {
        super('');
        this.socket = socket;
        this.bindSocket();
    }

    protected createSubComponents() {
        // parent can be explicitly set
        const userInputArea = d3.select('.input');

        this.lobbyComponent = new LobbyComponent();
        this.messageComponent = new MessageComponent();
        this.inputFieldComponent = new InputFieldComponent("new_message")
            .setParent(userInputArea)
            .setCallbackOnEnterKey(this.sendMessage.bind(this));
        this.userNameInputFieldComponent = new InputFieldComponent("user_name")
            .setParent(userInputArea)
            .setCallbackOnEnterKey(this.changeUserName.bind(this))
            .setData(this.getUserName());

        this.subComponents.push(this.lobbyComponent,
            this.messageComponent,
            this.inputFieldComponent,
            this.userNameInputFieldComponent);

        super.createSubComponents();
    }

    private bindSocket() {
        this.socket.on("lobby", this.onLobby.bind(this));
        this.socket.on("lobby:change", this.onLobbyChange.bind(this));
        this.socket.on("message:sent", this.onMessageSent.bind(this));
    }

    private onLobby(data: Lobby) {
        this.onLobbyChange(data);
        this.createAndUpdateClient();
    }

    private onLobbyChange(data: Lobby) {
        const lobbyData = new Lobby(data);
        this.lobbyComponent.setData(lobbyData);
        this.lobbyComponent.render();
    }

    private onMessageSent(data: Message) {
        //console.log('new message', data);
        this.messages.push(new Message(data));
        //console.log('messages', messages);
        this.messageComponent.setData(this.messages);
        this.messageComponent.render();
    }

    private createAndUpdateClient() {
        this.addClient();
        setInterval(this.addClient.bind(this), 10000);
    }

    private addClient() {
        this.me = new Person();
        this.me.setName(this.getUserName());
        this.socket.emit('add', this.me);
    }

    private changeUserName(userName: string): string {
        this.socket.emit('remove', this.me);
        localStorage.setItem("userName", userName);
        this.addClient();

        return userName;
    }

    private getUserName(): string {
        let userName = localStorage.getItem("userName") || "Guest " + Number(new Date());
        localStorage.setItem("userName", userName);
        return userName;
    }

    protected sendMessage(text: string): string {
        const message = new Message();
        message.create(this.me, text);

        this.socket.emit('message', message);

        return '';
    }
}