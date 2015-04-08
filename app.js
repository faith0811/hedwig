
/**
 * Main Application
 */

/**
 * Module dependencies
 */

"use strict";

var express = require('express'),
  api = require('./api'),
  http = require('http'),
  path = require('path'),
  server_settings = require('./config').SERVER_SETTINGS


var app = module.exports = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

/**
 * Configuration
 */

app.set('port', server_settings.port || 7201);

if (app.get('env') === 'dev') {
  // TODO DEVELOP ENVIRONMENT
}

if (app.get('env') === 'prod') {
  // TODO PRODUCTION ENVIRONMENT
}

/**
 * Socket Register
 */

io.sockets.on('connection', require('./api/socket'));

function spy_on_sockets () {
  setInterval(function () {
    // do whatever to watch the socket changes.
  }, 5000);
}

/**
 * API Router
 * Will Not Be Used Now
 */

//app.get('/api', api);

/**
 * Start Server
 */

server.listen(app.get('port'), function () {
  console.log('Server Listening on port: ' + app.get('port'));
  spy_on_sockets()
})
