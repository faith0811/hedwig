var socket = io('http://localhost:7201')

socket.on('connect', function () {
  socket.emit('ping');
  console.log('connected.');

  //auth
  socket.emit('auth', {
    token: '12345678'
  });
});

socket.on('ping', function () {
  console.log('recved ping.');
});
