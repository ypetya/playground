
import Person from "../model/person";
import Lobby from "../model/lobby";
import Message from "../model/message";
import { TransferObject }
    from "../interface/definitions";
import LobbyComponent from "../client/display/lobby";
import MessageComponent from "../client/display/message";

import io = require("socket.io");

const socket: any = io("/");
const lobbyComponent: LobbyComponent = new LobbyComponent();
const messageComponent: MessageComponent = new MessageComponent();
const messages = new Array<Message>();

socket.on('lobby', (data: Lobby) => {
    const lobbyData = new Lobby(data);
    lobbyComponent.setData(lobbyData);
    lobbyComponent.render();

    createAndUpdateClient();
});

socket.on('lobby:change', (data: Lobby) => {
    lobbyComponent.setData(new Lobby(data));
    lobbyComponent.render();
});

socket.on('message:sent', (data: Message) => {
    console.log('new message', data);
    messages.push(new Message(data));
    messageComponent.setData(messages);
    messageComponent.render();
});

function createAndUpdateClient() {
    addClient();
    setInterval(addClient, 10000);
    sendMessage('joined...');
}

let me:Person;

function addClient() {
    let userName = localStorage.getItem("userName") || "Guest " + Number(new Date());
    localStorage.setItem("userName", userName);

    me = new Person();
    me.setName(userName);
    
    socket.emit('add', me);
}

function sendMessage(text: string) {
    const message = new Message();
    message.create(me, text);

    socket.emit('message',message);
}
