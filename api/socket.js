
/**
 * Socket
 */

var redis_client = require("../redis");
var auth_controller = require("../auth");

function socket_event (socket) {
  console.log('connected to ' + socket.id);

  socket.on('disconnect', function () {
    console.log('disconnected from ' + socket.id);
  });

  socket.on('auth', function (token) {
    promise = auth_controller.get_user_id_promise(token);
    auth_controller.register(promise, socket.id);
  });

  socket.on('')
};

module.exports = socket_event;
