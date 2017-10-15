
import Person from "../model/person";

const socket = io('http://localhost:8080');

socket.on('lobby', (data) => {
    console.log(data.people);
    console.log(new Person("peter"));
    socket.emit('add', {
        name: 'Peter'
    });
});

export default function ok(){
    console.log('ok');
}

// function addElement()
