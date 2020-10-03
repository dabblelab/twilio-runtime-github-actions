exports.handler = function(context, event, callback) {
    const result = {
        message : "Hello Universe!"
    }

    callback(null, result);
  };
