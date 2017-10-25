
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

    setInterval(addClient, 20000);
});

socket.on('propagate', (data: Lobby) => {
    lobbyComponent.setData(new Lobby(data));

    lobbyComponent.render();
});

function addClient() {
    socket.emit('add', {
        name: 'Peter ' + Number(new Date())
    });
}
