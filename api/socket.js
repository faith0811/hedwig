
/**
 * Socket
 */

"use strict";

var auth_controller = require("../auth");
var sc = require("../redis").SubscribeController;

function socket_event (socket) {
  console.log('connected to ' + socket.id);

  socket.once('disconnect', function () {
    sc.removeListener(socket.event_name, socket.event_listener);
    console.log('disconnected from user_id: ' + socket.user_id);
  });

  socket.once('auth', function (token) {
    var promise = auth_controller.get_user_id_promise(token);
    promise.then(function (user_id) {
      // if user id is null., kill the connection
      if (user_id == null) {
        socket.disconnect();
        return;
      }
      // else bind the user id to socket
      socket.user_id = user_id;
      console.log('socket_id: ' + socket.id + ' has been binded to user: ' + user_id);

      // register subscribe controller
      socket.event_name = 'data' + user_id;
      socket.event_listener = function (data) {
        socket.emit('message', data);
        console.log('sended: ' + data + ' to user: ' + user_id);
      };
      sc.on(socket.event_name, socket.event_listener);
    }, function (err) {
      console.error(err);
    });
    auth_controller.register(promise, socket.id);
  });
};

/**
 * Export
 */

module.exports = socket_event;
