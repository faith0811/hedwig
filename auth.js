
/**
 * Auth Controller
 */

"use strict";

var Promise = require("promise"),
    tc = require("./redis").TokenController;

var AuthController = {
  createNew: function () {
    var controller = {};

    controller.get_user_id_promise = function (token) {
      var promise = new Promise(function (resolve, reject) {
        tc.get(token, function (err, user_id) {
          if (err) reject(err);
          resolve(user_id);
        });
      });
      return promise;
    };

    controller.register = function (promise, socket_id) {
      promise.then(function (user_id) {
        tc.setex(user_id, 60 * 60, socket_id);
      }, function (err) {
        console.error(err);
      });
    };

    return controller;
  }
};

/**
 * Export
 */

module.exports = AuthController.createNew();
