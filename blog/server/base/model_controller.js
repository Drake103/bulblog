import _ from 'lodash';
import { contains } from '../libs/utils';
import Controller from './controller';
import middlewares from '../middlewares';

export default class ModelController extends Controller {
  constructor() {
    super();

    this.urlPrefix = '';
    this.Model = null;
    this.sortableFields = null;
    this.filterableFields = null;
    this.listFields = null;
    this.auth = false;

    this.defaultPage = 1;
    this.defaultPerPage = 10;
    this.maxPerPage = 100;

    this.create.type = 'post';
    this.update.type = 'put';
    this.delete.type = 'delete';

    this.get.url = '/:id';
    this.update.url = '/:id';
    this.delete.url = '/:id';
  }

  router() {
    if (!this.actions) {
      throw new Error('Actions are not specified');
    }

    var baseUrl = `/api${this.urlPrefix}`;

    if (this.auth) {
      this._app.use(baseUrl, middlewares.auth);
    }

    for (let i = 0; i < this.actions.length; i++) {
      let
        action = this.actions[i],
        handlers = [],
        handler = this[action],
        method = handler.type || 'get',
        handlerUrl = handler.url || '',
        url = `${baseUrl}${handlerUrl}`;

      if (handler.auth) {
        handlers.push(middlewares.auth);
      }

      if (handler.url && contains(handler.url, ':id')) {
        handlers.push(this.getModelItem);
      }

      handlers.push(handler);
      super[method](url, ...handlers);
    }
  }

  create(req, res) {
    res.json({ message: 'Empty method' });
  }

  update(req, res) {
    res.json({ message: 'Empty method' });
  }

  get(req, res) {
    res.json({ message: 'Empty method' });
  }

  delete(req, res) {
    res.json({ message: 'Empty method' });
  }

  list(req, res, next) {
    var
      order = '_id',
      filters = {};

    if (req.query.order && this.sortableFields) {
      var clientOrder = this.getListOrder(req);
      if (clientOrder) {
        order = clientOrder;
      }
    }

    if ((this.filterableFields || {}).length) {
      filters = this.getListFilters(req);
    }

    if (this.getCustomListFilters) {
      filters = _.assign(filters, this.getCustomListFilters(req));
    }

    var query = this.Model
      .find(filters)
      .sort(order);

    if (!this.listFields) {
      throw new Error('listFields value is not specified');
    }

    query = query.select(this.listFields.join(' '));

    this.paginate(req, res, next, query, filters);
  }

  paginate(req, res, next, query, filters) {
    var { page, perPage } = this.getPagination(req);

    var error = this.validatePagination(page, perPage);

    if (!_.isEmpty(error)) {
      return this.error(res, error);
    }

    query
      .skip((page - 1) * perPage)
      .limit(perPage)
      .lean()
      .exec((error, collection) => {
        if (error) {
          return next(error);
        }

        this.Model.count(filters, (error, count) => {
          if (error) {
            return next(error);
          }

          page = +page;
          perPage = +perPage;

          if (this.setAdditionalFields) {
            this.setAdditionalFields(req, next, collection, () => {
              res.json({ total: count, page, perPage, collection });
            });
          } else {
            res.json({ total: count, page, perPage, collection });
          }
        });
      });
  }

  getPagination(req) {
    var page = req.query.page || this.defaultPage;
    var perPage = req.query.perPage || this.defaultPerPage;

    return { page, perPage };
  }

  validatePagination(page, perPage) {
    var error = {};

    page = parseInt('' + page, 10);
    if (isNaN(page)) {
      error.page = 'bad_int_value';
    }

    perPage = parseInt('' + perPage, 10);
    if (isNaN(perPage)) {
      error.perPage = 'bad_int_value';
    }

    if (!_.isEmpty(error)) {
      return error;
    }

    if (perPage <= 0) {
      error.perPage = 'less_than_allowed';
    } else if (perPage > this.maxPerPage) {
      error.perPage = 'more_than_allowed';
    }

    if (page <= 0) {
      error.page = 'less_than_allowed';
    }

    return error;
  }

  getListFilters(req) {
    var filter = {};

    for (let key in req.query) {
      if (!_.startsWith(key, '_')) {
        continue;
      }

      let
        operation,
        field = key.substr(1);

      if (contains(field, '__')) {
        [field, operation] = field.split('__');
      }

      if (!contains(this.filterableFields, field)) {
        continue;
      }

      if (!operation) {
        filter[field] = req.query[key];
      }

      if (operation === 'contains') {
        filter[field] = { $regex: req.query[key], $options: 'i' };
      }
    }

    return filter;
  }

  getListOrder(req) {
    var
      { order } = req.query,
      field = _.startsWith(order, '-') ? order.substr(1) : order;

    if (contains(this.sortableFields, field)) {
      return req.query.order;
    }
  }
}
