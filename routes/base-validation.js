const Joi = require('joi');
const httpStatus = require('http-status');
const _ = require('lodash');
const autoBind = require('auto-bind');

const HttpError = require('../errors/http-error');

module.exports = class BaseValidationRoute {
  constructor() {
    autoBind(this);
  }

  handler() {
    throw new Error('Not implemented');
  }

  _validate(data, schema = this._schema) {
    if (!schema) throw new Error('Validation rules not defined');
    const result = Joi.validate(data, schema);
    if (result.error) {
      const error = (_.head(result.error.details) || result.error || {}).message;
      throw new HttpError(error, httpStatus.BAD_REQUEST);
    }
    return result.value;
  }
};
