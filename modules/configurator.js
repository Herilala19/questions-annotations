/* eslint-disable import/no-dynamic-require */
const path = require('path');

module.exports = class Configurator {
  constructor() {
    this._env = process.env.NODE_ENV || 'dev';
  }

  getAll(fileName) {
    const directory = path.join(path.resolve(__dirname, '../'), 'config');
    let config;
    try {
      // eslint-disable-next-line global-require
      config = require(path.join(directory, fileName));
    } catch (e) {
      throw new Error(`Could not load configuration: ${fileName}: ${e.stack}`);
    }
    return Object.assign(config.all || {}, config[this._env] || {});
  }
};
