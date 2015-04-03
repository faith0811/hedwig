
/**
 * Auth Controller
 */

Promise = require("promise");

redis_client = require("./redis");

var AuthController = {
  createNew: function () {
    var controller = {};

    controller.get_user_id_promise = function (token) {
      var promise = new Promise(function (resolve, reject) {
        redis_client.get(token, function (err, user_id) {
          if (err) reject(err);
          resolve(user_id);
        });
      });
      return promise;
    };

    controller.register = function (promise, socket_id) {
      promise.then(function (user_id) {
        redis_client.setex(socket_id, 60 * 60, user_id);
      }, function (err) {
        console.error(err);
      });
    };

    return controller;
  };
};

module.exports = AuthController.createNew();
