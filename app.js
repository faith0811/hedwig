
/**
 * Main Application
 */

/**
 * Module dependencies
 */

"use strict";

var express = require('express'),
  router = require('./router'),
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

io.sockets.on('connection', require('./router/socket'));

/**
 * API Router
 * Will Not Be Used Now
 */

// app.get('/', router);

/**
 * Start Server
 */

server.listen(app.get('port'), function () {
  console.log('Server Listening on port: ' + app.get('port'));
})
