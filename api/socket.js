
/**
 * Socket
 */

module.exports = function (socket) {
  socket.emit('ping', {
    msg: 'ping'
  });

};
