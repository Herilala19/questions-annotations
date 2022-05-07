const httpStatus = require('http-status');

module.exports = class HttpError extends Error {
  constructor(message, status) {
    // Calling parent constructor of base Error class.
    super(message);

    // Capturing stack trace, excluding constructor call from it.
    Error.captureStackTrace(this, this.constructor);

    // Saving class name in the property of our custom error as a shortcut.
    this.name = this.constructor.name;

    // `500` is the default value if not specified.
    this.statusCode = status || httpStatus.INTERNAL_SERVER_ERROR;
  }
};
