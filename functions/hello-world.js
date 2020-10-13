exports.handler = function(context, event, callback) {
    const result = {
        message : "Hello World!"
    }

    callback(null, result);
  };
