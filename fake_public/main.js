var socket = io('http://localhost:7201')

socket.on('connect', function () {
  console.log('connected.');

  // auth
  socket.emit('auth', '123456');

  // recieve msg
  socket.on('message', function (data) {
    console.log(data);
  });
});
