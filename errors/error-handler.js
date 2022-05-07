const httpStatus = require('http-status');

module.exports = class ErrorHandler {
  constructor(_, config) {
    this._mongoErrorMessage = config.mongoErrorMessage;
    this.handler = this.handler.bind(this);
  }

  // eslint-disable-next-line no-unused-vars
  handler(err, req, res, next) {
    const info = {
      message: err.message,
      url: req.url,
      stack: err.stack,
    };
    console.log('Error during request processing', JSON.stringify(info));
    if (err.message === this._mongoErrorMessage) process.exit(0);
    const statusCode =
      (err.error || {}).code === 'ECONNREFUSED'
        ? httpStatus.SERVICE_UNAVAILABLE
        : err.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
    res.status(statusCode).send({
      error: err.message,
      success: false,
    });
  }
};
