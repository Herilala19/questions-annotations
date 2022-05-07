const express = require('express');
const bodyParser = require('body-parser');
const httpStatus = require('http-status');
const HttpError = require('@errors/http-error');
const helmet = require('helmet');
const hpp = require('hpp');
const cors = require('cors');
const formData = require('express-form-data');
const path = require('path');

const second = 1000;
const minute = 60 * second;
const hour = 60 * minute;
const day = 24 * hour;

module.exports = class ExpressBootstrapper {
  constructor(config) {
    this.app = express();

    this._whitelist = config.whiteList || [];
    this._corsErrorMessage = config.corsErrorMessage;
  }

  bootstrap() {
    const multipartyOptions = {
      autoFiles: true
    };

    // parse a data with connect-multiparty
    this.app.use(formData.parse(multipartyOptions));

    // clear all empty files (size == 0)
    this.app.use(formData.format());

    // change file objects to node stream.Readable
    this.app.use(formData.stream());

    // union body and files
    this.app.use(formData.union());

    this.app.use(bodyParser.json({ limit: '10mb' }));
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json());
    this.app.disable('x-powered-by');
    this.app.set('trust proxy', 1);

    // Securing HTTP headers
    this.app.use(helmet.noCache());
    this.app.use(helmet.noSniff());
    this.app.use(helmet.hidePoweredBy());
    this.app.use(helmet.xssFilter());
    this.app.use(helmet.hsts({
      maxAge: 180 * day
    }));
    this.app.use(helmet.ieNoOpen());
    this.app.use(hpp());

    this.app.use(express.static(path.resolve('./uploads')));
    this.app.use(express.static(path.join(__dirname, './uploads')));
    this.app.use('/static', express.static('uploads'));

    this._setupCORS();
  }

  /**
   * Setup CORS
   */
  _setupCORS() {
    const corsOptions = {
      credentials: true,
      origin: (origin, callback) => {
        if (this._whitelist.includes(origin) || !origin) {
          callback(null, true);
        } else {
          callback(new HttpError(this._corsErrorMessage, httpStatus.FORBIDDEN));
        }
      }
    };
    this.app.use(cors(corsOptions));
  }
};
