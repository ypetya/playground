import Lobby from "../model/lobby";
import Message from "../model/message";

import { IOSocket, TransferObject }
    from "../interface/definitions";

let socketIo = require("socket.io");

export default class Socket {
    private io: IOSocket;

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
        socket.on("message", this.message.bind(this));
    }

    private onDisconnect(socket: IOSocket) {
        console.log("disconnect", socket);
    }

    private add(data: TransferObject) {
        console.log("add", data);
        this.lobby.add(data.name);
        if (this.lobby.hasChange()) {
            this.io.emit("lobby:change", this.lobby);
        }
    }

    private message(data: any) {
        const m = new Message(data);
        this.io.emit("message:sent", m);
    }
}