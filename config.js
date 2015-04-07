
/**
 * Configuration
 */

"use strict";

/**
 * Server Settings
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

var REDIS_SUBSRIBE_CHANNEL = 'draenoe_test';

/**
 * Export
 */

module.exports.SERVER_SETTINGS = SERVER_SETTINGS;
module.exports.REDIS_SETTINGS = REDIS_GENERAL_SETTINGS;
module.exports.REDIS_SUBSRIBE_CHANNEL = REDIS_SUBSRIBE_CHANNEL;
