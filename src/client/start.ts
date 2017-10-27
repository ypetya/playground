
import Person from "../model/person";
import Lobby from "../model/lobby";
import { TransferObject }
    from "../interface/definitions";
import LobbyComponent from "../client/display/lobby";

import io = require("socket.io");

const socket: any = io("/");
const lobbyComponent: LobbyComponent = new LobbyComponent();

socket.on('lobby', (data: Lobby) => {
    const lobbyData = new Lobby(data);
    lobbyComponent.setData(lobbyData);
    lobbyComponent.render();

    setInterval(addClient, 10000);
});

socket.on('propagate', (data: Lobby) => {
    lobbyComponent.setData(new Lobby(data));

    lobbyComponent.render();
});

function addClient() {
    let userName = localStorage.getItem("userName") || "Guest " + Number(new Date());
    localStorage.setItem("userName", userName);

    socket.emit('add', {
        name: userName 
    });
}
