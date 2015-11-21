import _ from 'lodash';
import logger from 'libs/logger';
import langs from 'config/langs';
import middlewares from '../middlewares';

// ERRORS CODES
// VALIDATION ERROR = 400;
// AUTH REQUIRED = 401;
// ACCESS DENIED = 403;
// NOT FOUND = 404;

export default class Controller {
  constructor() {
  }

  _bind(callbacks) {
    if (_.isArray(callbacks)) {
      for (let i = 0; i < callbacks.length; i++) {
        callbacks[i] = callbacks[i].bind(this);
      }
    } else {
      callbacks = callbacks.bind(this);
    }

    return callbacks;
  }

  _handler(type, route, callbacks) {
    let boundCallbacks = this._bind(callbacks);

    if (_.isArray(route)) {
      while (route.length) {
        this._app[type](route.shift(), ...callbacks);
      }
    } else {
      this._app[type](route, ...callbacks);
    }
  }

  get(url, ...callbacks) {
    this._handler('get', url, callbacks);
  }

  put(url, ...callbacks) {
    this._handler('put', url, callbacks);
  }

  post(url, ...callbacks) {
    this._handler('post', url, callbacks);
  }

  delete(url, ...callbacks) {
    this._handler('delete', url, callbacks);
  }

  use(app) {
    this._app = app;

    if (this.middleware) {
      this.middleware();
    }

    if (this.redirect) {
      this.redirect();
    }

    if (this.router) {
      this.router();
    }

    logger.info('Controller initialized');
  }
}

Controller.prototype.middlewares = middlewares;
Controller.prototype.errorMessage = langs.errorMessage;
Controller.prototype.error = middlewares.error;
Controller.prototype.notFound = middlewares.notFound;
