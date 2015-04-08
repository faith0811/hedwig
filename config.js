
/**
 * Configuration
 */

"use strict";

/**
 * Server Settingse
 */

var SERVER_SETTINGS = {
  host: "localhost",
  port: "7201"
};

/**
 * Redis Settings
 */

var REDIS_GENERAL_SETTINGS = {
  host: "testing",
  port: "6379",
  db: 3,
  options: {},
  prefix: ""
};

var REDIS_SUBSCRIBE_CHANNEL = "draenor_test";

/**
 * Export
 */

module.exports.SERVER_SETTINGS = SERVER_SETTINGS;
module.exports.REDIS_SETTINGS = REDIS_GENERAL_SETTINGS;
module.exports.REDIS_SUBSCRIBE_CHANNEL = REDIS_SUBSCRIBE_CHANNEL;
