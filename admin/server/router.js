import _ from 'lodash';
import Backbone from 'backbone';
import ClientModel from '../client/base/model';
import ClientCollection from '../client/base/collection';
import ClientRouter from '../client/router';
import ClientController from '../client/base/controller';
import { sync, $ } from './mixins/network';
import { renderView, wrapModel, setInitData } from './mixins/isomorphic_controller';
import langs from '../config/langs';
import config from '../config';


// Override client methods to call them on server side
Backbone.Model.prototype.sync = Backbone.Collection.prototype.sync = sync;
ClientModel.prototype.$ = ClientCollection.prototype.$ = $;

ClientController.prototype.renderView = renderView;
ClientController.prototype.wrapModel = wrapModel;
ClientController.prototype.setInitData = setInitData;

export default class Router extends ClientRouter {
  run (app) {
    this._app = app;
    this._mapRoutes();
  }

  use (...args) {
    this._app.get(...args);
  }

  redirect () {

  }

  route (url, action) {
    let temp = action.split('.');
    let method = temp[1];
    let Controller = this.controllers[temp[0]];

    if (!Controller) {
      throw new Error(`undefined controller "${temp[0]}"`);
    }

    this._app.get(url, (req, res, next) => {
      let ctor = new Controller();

      // Add req, res to controller to return response to client in it
      ctor.req = req;
      ctor.res = res;

      if (!ctor[method]) {
        throw new Error(`undefined method "${method}" of "${temp[0]}" controller`);
      }

      // Generate ctx from req
      let ctx = _.pick(req, ['params', 'query']);
      ctor[method](ctx);
    });
  }
}

// Override client middlewares
Router.prototype.auth = require('./middlewares/auth');
Router.prototype.notAuth = require('./middlewares/not_auth');
