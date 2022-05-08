const { Router } = require('express');
const autoBind = require('auto-bind');
const Search = require('./search');

module.exports = class General {
  constructor(models) {
    autoBind(this);
    this._search = new Search(models);
  }

  initRoutes(app) {
    const api = Router();
    api.get('/search', this._search.handler);
    /**
     * Entry point for api search routes
     */
    app.use('/api', api);
  }
};
