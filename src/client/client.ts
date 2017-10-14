var socket = io('http://localhost:8080');

socket.on('lobby', function (data) {
    console.log(data);
    socket.emit('add', {
        name: 'Peter'
    });
});