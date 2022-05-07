const { Router } = require('express');
const autoBind = require('auto-bind');

module.exports = class Script {
  constructor(models) {
    autoBind(this);
    this._import = new ImportData(models);
  }

  initRoutes(app) {
    const api = Router();
    api.get('/search', this._import.handler);
    /**
     * Entry point for api search routes
     */
    app.use('/api', api);
  }
};
