var socket = io('http://localhost:7201')

socket.on('connect', function () {
  console.log('connected.');

  //auth
  socket.emit('auth', '12345678');
});
