
/**
 * Redis
 */

var redis_settings = require("./config").REDIS_SETTINGS,
    redis = require("redis"),
    client = redis.createClient(redis_settings.port,
                                redis_settings.host,
                                redis_settings.options);

client.select(redis_settings.db, function () {
  console.log('switch to: ' + redis_settings.db + 'db');
});

client.on("error", function (err) {
  console.log("error: " + err);
});

client._get = function (key, func) {
  key = redis_settings.prefix + key;
  console.log(key);
  return client.get(key, func);
}

module.exports = client;
