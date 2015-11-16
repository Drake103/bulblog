import _ from 'lodash';


class Environment {
  constructor () {
    if (process.browser) {
      this.attributes = window.app.env;
    } else {
      this.attributes = {};
    }

    this.create = this.create.bind(this);
  }

  create (req, res, next) {
    this.attributes = res.locals.env = {};

    next();
  }

  get (key) {
    return this.attributes[key];
  }

  set (key, value) {
    this.attributes[key] = value;
  }

  toJSON () {
    return _.clone(this.attributes);
  }
}

export default new Environment();
