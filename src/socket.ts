var socketIo = require("socket.io");

export class Socket {
    private io;

    constructor(server: any) {
        this.io = socketIo(server);

        this.bind();
    }

    private bind() {
        this.io.on("connection", this.connectionHandler);
    }

    private connectionHandler(socket) {
        socket.emit("news", { hello: "world" });
        socket.on("my other event", function (data) {
            console.log(data);
        });
    }
}