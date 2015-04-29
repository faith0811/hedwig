
/**
 * Redis
 */

"use strict";

/**
 * Config Redis
 */

var redis_subscibe_channel = require("./config").REDIS_SUBSCRIBE_CHANNEL,
    redis_settings = require("./config").REDIS_SETTINGS,
    redis = require("redis"),
    Promise = require("promise"),
    util = require("util"),
    EventEmitter = require("events").EventEmitter;

function init_redis () {
  var promise = new Promise(function (resolve, reject) {
    var client = redis.createClient(redis_settings.port,
                                    redis_settings.host,
                                    redis_settings.options);

    client.on("error", function (err) {
      reject(err);
    });

    client.select(redis_settings.db, function () {
      resolve(client);
    });
  });
  return promise;
};


/**
 * Build Our Own Redis Controller
 */

function RedisTokenController () {
  var obj = this;
  var redis_promise = init_redis();
  redis_promise.then(function (client) {
    obj.client = client;
  }, function (err) {
    console.log(err);
  });
}

RedisTokenController.prototype.set_key_prefix = function (key) {
  return redis_settings.prefix + ":" + key;
};

RedisTokenController.prototype.get = function (key, func) {
  var obj = this;
  key = obj.set_key_prefix(key);
  return obj.client.get(key, func);
};

RedisTokenController.prototype.set = function (key, val, func) {
  var obj = this;
  key = obj.set_key_prefix(key);
  return obj.client.set(key, val, func);
};

RedisTokenController.prototype.set_ex = function(key, exp, val, func) {
  var obj = this;
  key = obj.set_key_prefix(key);
  return obj.client.set_ex(key, exp, val, func);
};

function RedisSubscribeController () {
  // init and config redis
  // inherit from event emitter
  var obj = this;
  EventEmitter.call(this);
  var redis_promise = init_redis();
  redis_promise.then(function (client) {
    obj.client = client;
    obj.register_event();
  }, function (err) {
    console.error(err);
  });
}
util.inherits(RedisSubscribeController, EventEmitter);

RedisSubscribeController.prototype.register_event = function () {
  var obj = this;
  this.client.on('message', function (ch, msg) {
    var data = JSON.parse(msg);
    var event_name = 'data' + data.user_id;
    obj.emit(event_name, data.content);
  });
  this.client.subscribe(redis_subscibe_channel);
}

/**
 * Init Redis Controllers
 */

var tc = new RedisTokenController();

var sc = new RedisSubscribeController();

/**
 * Export
 */

module.exports.TokenController = tc;
module.exports.SubscribeController = sc;
