
/**
 * Module dependencies
 */

var express = require('express'),
  api = require('./api'),
  http = require('http'),
  path = require('path');

var app = module.exports = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

/**
 * Configuration
 */

app.set('port', process.env.PORT || 7201);

if (app.get('env') === 'dev') {
  // TODO DEVELOP ENVIRONMENT
}

if (app.get('env') === 'prod') {
  //TODO PRODUCTION ENVIRONMENT
}

/**
 * Socket Register
 */

io.sockets.on('connection', require('./api/socket'));

/**
 * API Router
 * Will Not Be Used Now
 */

//app.get('/api', api);

/**
 * Start Server
 */

server.listen(app.get('port'), function () {
  console.log('Server Listening on port' + app.get('port'));
})
