const httpStatus = require('http-status');
const HttpError = require('@errors/http-error');

module.exports = class NotFoundRoute {
  constructor() {
    this._handler = this._handler.bind(this);
  }

  initRoutes(app) {
    app.get('*', this._handler);
  }

  _handler() {}
};
