import React from 'react';
import page from 'page';
import vent from '../modules/vent';


export default class Router {
  _mapRoutes () {
    if (this.middleware) this.middleware();
    if (this.redirect) this.redirect();
    if (this.router) this.router();
  }

  run () {
    this.page = page;
    this.ctor = null;

    this.page('*', this.createQuery);
    this._mapRoutes();
    this.page.start();

    vent.on('routeTo', (url) => this.routeTo(url));
  }

  routeTo (url) {
    this.page(url);
  }

  use (...args) {
    this.page(...args);
  }

  route (url, action) {
    let temp = action.split('.');
    let method = temp[1];
    let Controller = this.controllers[temp[0]];

    if (!Controller) {
      throw new Error(`undefined controller "${temp[0]}"`);
    }

    this.page(url, (ctx) => {
      this.beforeRoute(ctx);
      this.ctor = new Controller();

      if (!this.ctor[method]) {
        throw new Error(`undefined method "${method}" of "${temp[0]}" controller`);
      }

      if (this.ctor[method].length > 1) {
        this.ctor[method](ctx, () => this.afterRoute(ctx));
      } else {
        this.ctor[method](ctx);
        this.afterRoute(ctx);
      }
    });
  }

  beforeRoute (ctx) {
    if (this.ctor) {
      this.ctor.destroy();
      this.ctor = null;
    }

    vent.trigger('route:before', ctx);
  }

  afterRoute (ctx) {
    vent.trigger('route:after', ctx);
  }

  createQuery (ctx, next) {
    let query = {};
    let params = ctx.querystring.split('&');

    for (let [index, param] of params.entries()) {
      param = param.split('=');
      query[param[0]] = param[1];
    }

    ctx.query = query;
    next();
  }
}
