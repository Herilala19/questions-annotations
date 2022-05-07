const { Router } = require('express');
const autoBind = require('auto-bind');

const ImportData = require('./import-data');

module.exports = class Script {
  constructor(models) {
    autoBind(this);
    this._import = new ImportData(models);
  }

  initRoutes(app) {
    const api = Router();
    api.get('/import', this._import.handler);
    /**
     * Entry point for seed routes
     */
    app.use('/script', api);
  }
};
