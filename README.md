hedwig
======

This is a web server based on node.js, using socket.io. It can listen to recieve and push messages to socket.io client.

Install
-------

    $ npm install

Run Server
----------

    $ node app.js

Messages to be publish
----------------------

The message publish to redis channel should be json string, and it should have a item named user_id, to identify user.

#### Example

the example shows how to send a message from redis-cli

    $ redis-cli -n 3
    > publish draenor_test '{"user_id": "123", "content":"test"}';

and the message will send to channel `draenor_test` , and recieved by server.

Frontend socket.io client docs
------------------------------

There is a example frontend socket.io client in `fake_public`.

To use the server, you should imply

```javascript
socket.on('connection', function() {
socket.emit('auth', token_key);
  // you should send your token key to server to identify user.

  socket.on('message', function(data) {
    //you will receive data from server.
  });
})
```

Configuration
-------------

You can config the server in file `config.js`.

you can change redis channel by changing `REDIS_SUBSCIBE_CHANNEL`.

TODO
----

More detailed logs
