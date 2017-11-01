
import io = require("socket.io");
import * as d3 from "d3";

const content = d3.select(".content");
const userInputArea = d3.select('.input');

import Person from "../model/person";
import Lobby from "../model/lobby";
import Message from "../model/message";
import { TransferObject }
    from "../interface/definitions";
import LobbyComponent from "../client/display/lobby";
import MessageComponent from "../client/display/message";
import InputFieldComponent from "../client/display/inputfield";

const socket: any = io("/");
const lobbyComponent = new LobbyComponent().setParent(content);
const messageComponent= new MessageComponent().setParent(content);
const messages = new Array<Message>();
const inputFieldComponent = new InputFieldComponent("new_message")
    .setParent(userInputArea)
    .setCallbackOnEnter(sendMessage)
    .render();
const userNameInputFieldComponent = new InputFieldComponent("user_name")
    .setParent(userInputArea)
    .setCallbackOnEnter(changeUserName)
    .setData(getUserName())
    .render();

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
    //console.log('new message', data);
    messages.push(new Message(data));
    //console.log('messages', messages);
    messageComponent.setData(messages);
    messageComponent.render();
});

function createAndUpdateClient() {
    addClient();
    setInterval(addClient, 10000);
    //sendMessage('joined...');
}

let me:Person;

function addClient() {
    me = new Person();
    me.setName(getUserName());
    
    socket.emit('add', me);
}

function changeUserName(userName:string) {
    socket.emit('remove', me);
    localStorage.setItem("userName", userName);
    addClient();

    return userName;
}

function getUserName() {
    let userName = localStorage.getItem("userName") || "Guest " + Number(new Date());
    localStorage.setItem("userName", userName);
    return userName;
}

function sendMessage(text: string) {
    const message = new Message();
    message.create(me, text);

    socket.emit('message',message);

    return '';
}
