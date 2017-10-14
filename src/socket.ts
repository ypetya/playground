import Lobby from "./lobby";

var socketIo = require("socket.io");

interface IOSocket {
    on: Function;
    emit: Function;
}

interface TransferObject {
    name: string;
}

export default class Socket {
    private io : IOSocket;

    private lobby: Lobby;

    constructor(server: any) {
        this.io = socketIo(server);
        this.lobby = new Lobby();

        this.bind();
    }

    private bind() {
        this.io.on("connect", this.onConnect.bind(this));
        this.io.on("disconnect", this.onDisconnect.bind(this));
    }

    private onConnect(socket: IOSocket) {
        socket.emit("lobby", this.lobby);
        socket.on("add", this.add.bind(this));
    }

    private onDisconnect(socket: IOSocket) {
        console.log('disconnect', socket);
    }

    private add(data: TransferObject) {
        console.log('add', data);
        this.lobby.add(data.name);
    }
}