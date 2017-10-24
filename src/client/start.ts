
import Person from "../model/person";
import Lobby from "../model/lobby";
import config from "../config/config";
import { TransferObject }
    from "../interface/definitions";

import io = require("socket.io");

const socket: any = io(config.url);

socket.on('lobby', (data: Lobby) => {
    console.log(data.toString());
    console.log(new Person("peter"));
    socket.emit('add', {
        name: 'Peter'
    });
});

export default function ok() {
    console.log('ok');
};

// function addElement()
