import Lobby from "../model/lobby";
import Message from "../model/message";

import { IOSocket, TransferObject }
    from "../interface/definitions";

let socketIo = require("socket.io");

export default class Socket {
    private io: IOSocket;

    private lobby: Lobby;

    constructor(server: any) {
        this.lobby = new Lobby();
        this.io = socketIo(server);
        this.io.on("connect", this.onConnect.bind(this));
        this.io.on("disconnect", this.onDisconnect.bind(this))
    }

    private bind(socket: IOSocket) {
        socket.on("add", this.add.bind(this));
        socket.on("remove", this.remove.bind(this));
        socket.on("message", this.message.bind(this));
    }

    private onConnect(socket: IOSocket) {
        socket.emit("lobby", this.lobby);
        this.bind(socket);
    }

    private onDisconnect(socket: IOSocket) {
        console.log("disconnect", socket);
    }

    private add(data: TransferObject) {
        console.log("add", data);
        this.lobby.add(data.name);
        this.triggerChanges()
    }

    private remove(data: TransferObject) {
        console.log("remove", data);
        this.lobby.remove(data.name);
        this.triggerChanges();
    }

    private triggerChanges() {
        if (this.lobby.hasChange()) {
            this.lobby.resetChanges();
            this.io.emit("lobby:change", this.lobby);
        }
    }

    private message(data: any) {
        const m = new Message(data);
        this.io.emit("message:sent", m);
    }
}