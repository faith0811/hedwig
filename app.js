
/**
 * Main Application
 */

"use strict";

/**
 * Module dependencies
 */

var express = require('express'),
    bodyParser = require('body-parser'),
    routers = require('./router'),
    apis = require('./router/api'),
    sockets = require('./router/socket'),
    http = require('http'),
    path = require('path'),
    server_settings = require('./config').SERVER_SETTINGS;


var app = module.exports = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

/**
 * Configuration
 */

app.set('port', server_settings.port || 7201);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

if (app.get('env') === 'dev') {
  // TODO DEVELOP ENVIRONMENT
}

if (app.get('env') === 'prod') {
  // TODO PRODUCTION ENVIRONMENT
}

/**
 * Socket Register
 */

io.sockets.on('connection', sockets);

/**
 * API Router
 */

app.get('/api', apis.index);
app.get('/api/ping', apis.ping);

app.get('/api/message', apis.get_message_info);
app.post('/api/message', apis.new_message);

app.get('/api/message/:message_id', apis.get_message);

app.get('/api/user', apis.get_user_info);
app.post('/api/user', apis.new_user);
app.delete('/api/user', apis.delete_user);

app.get('/api/user/:user_id', apis.get_user);

/**
 * Start Server
 */

server.listen(app.get('port'), function () {
  console.log('Server Listening on port: ' + app.get('port'));
});
