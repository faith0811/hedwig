
/**
 * Socket
 */

var redis_client = require("../redis");

function socket_event (socket) {
  socket.emit('ping');
  console.log('connected to ' + socket.id);

  socket.on('ping', function () {
    console.log('recved ping.');
  });

  socket.on('disconnect', function () {
    console.log('disconnected from ' + socket.id);
  });

  socket.on('auth', function (data) {
    console.log('auth data: ' + data.token);
    redis_client._get('123456', function (err, reply) {
      console.log(reply);
    });
  });
};

module.exports = socket_event;
