
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

var RedisTokenController = {
  createNew: function () {
    var controller = {};

    controller.init = function () {
      var client_promise = init_redis();
      client_promise.then(function (client) {
        controller.client = client;
      }, function (err) {
        console.log(err);
      });
    };

    controller.set_key_prefix = function (key) {
      return 'token-manager' + redis_settings.prefix + ":" + key;
    };

    controller.get = function (key, func) {
      key = controller.set_key_prefix(key);
      return controller.client.get(key, func);
    };

    controller.set = function (key, val, func) {
      key = controller.set_key_prefix(key);
      return controller.client.set(key, val, func);
    };

    controller.set_ex = function (key, exp, val, func) {
      key = controller.set_key_prefix(key);
      return controller.client.set_ex(key, exp, val, func);
    };

    return controller;
  }
};


function RedisSubscribeController () {
  // init and config redis
  // inherit from event emitter
  obj = this
  EventEmitter.call(this);
  redis_promise = init_redis();
  redis_promise.then(function (client) {
    obj.client = client;
  }, function (err) {
    console.error(err);
  });
}
util.inherits(RedisSubscribeController, EventEmitter);

RedisSubscribeController.prototype.register_event = function () {
  obj = this
  this.client.on('message', function (ch, msg) {
    obj.emit('data', msg);
  });
  this.client.subscribe(redis_subscibe_channel);
}

/**
 * Init Redis Controllers
 */

var tc = RedisTokenController.createNew();
tc.init();

var sc = new RedisSubscribeController();

/**
 * Export
 */

module.exports.TokenController = tc;
module.exports.SubscribeController = sc;
