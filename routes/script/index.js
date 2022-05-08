const { Router } = require('express');
const autoBind = require('auto-bind');

const ImportData = require('./import-data');
const SeedChild = require('./seed-child');

module.exports = class Script {
  constructor(models) {
    autoBind(this);
    this._import = new ImportData(models);
    this._seedChild = new SeedChild();
  }

  initRoutes(app) {
    const api = Router();
    api.get('/import', this._import.handler);
    api.get('/import-child', this._seedChild.handler);
    /**
     * Entry point for seed routes
     */
    app.use('/script', api);
  }
};
