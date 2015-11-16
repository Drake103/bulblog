import _ from 'lodash';
import request from 'request';
import Q from 'q';
import { contains } from '../../libs/utils';


const METHOD_MAP = {
  create: 'POST',
  update: 'PUT',
  patch:  'PATCH',
  delete: 'DELETE',
  read:   'GET',
};

let parseBody = (body) => {
  let number = parseInt(body, 10);

  if (number) {
    return number;
  }

  let res = JSON.parse(body);
  return res;
};

let network = {
  request (options, callback) {
    if (!options.url) {
      throw new Error('Provide URL via options');
    }

    options = _.assign({ headers: 'User-Agent' }, options);

    request(options, (err, res, body) => {
      let resource = null;
      let error;
      let status = _.result(res, 'statusCode') || 0;
      let headers =  _.result(res, 'headers');

      if (err || status !== 200) {
        error = { status: status, message: `Couldn't fetch resource: ${status}@${options.url}` };
        callback(error, null, headers);
        return;
      } else {
        try {
          resource = parseBody(body);
        } catch (e) {

        }

        if (resource !== null) {
          callback(null, resource, headers);
          return;
        }
      }

      error = { status: status, message: `Couldn't parse API response: ${status}@${options.url}` };
      callback(error, null, headers);
    });
  },

  $ (opts = {}) {
    let url = '';
    let dfd = Q.defer();
    let data = opts.data || {};
    let token = _.result(this, 'security.token');

    if (_.isString(opts)) {
      url = opts;
    } else {
      url = opts.url;
    }

    let options = {
      headers: opts.headers || {},
      method: opts.type || 'GET',
      dataType: 'json',
      url: url,
      data: data,
    };

    if (token) {
      options.headers['x-access-token'] = token.value;
    }

    let xhr = network.request(options, (error, resource, headers) => {
      let statusText = error ? 'error' : 'success';

      if (error) {
        dfd.reject(error);

        if (opts.error) {
          opts.error(xhr, statusText, error);
        }
      } else {
        this._resource = resource;
        this._headers = headers;

        dfd.resolve(resource);

        if (opts.success) {
          opts.success(resource, statusText, xhr);
        }
      }
    });

    return dfd.promise;
  },

  sync (method, model, params = {}) {
    let dfd = Q.defer();
    let data = params.data || params.attrs || {};
    let token = _.result(this, 'security.token');

    let options = {
      headers: {},
      method: METHOD_MAP[method],
      dataType: 'json',
      url: params.url || _.result(model, 'url'),
    };

    if (params.headers) {
      options.headers = params.headers;
    }

    if (token) {
      options.headers['x-access-token'] = token.value;
    }

    if (model.requestHeaders) {
      _.assign(options.headers, model.requestHeaders);
    }

    if (contains(['create', 'update', 'patch'], method)) {
      options.body = _.assign(model.toJSON(params), data);
    } else if (!_.isEmpty(data)) {
      options.qs = data;
    }

    let xhr = network.request(options, (error, resource, headers) => {
      let statusText = error ? 'error' : 'success';

      if (params.complete) {
        params.complete(xhr, statusText, error);
      }

      if (error) {
        dfd.reject(error);

        if (params.error) {
          params.error(xhr, statusText, error);
        }
      } else {
        this._resource = resource;
        this._headers = headers;

        dfd.resolve(resource);

        if (params.success) {
          params.success(resource, statusText, xhr);
        }
      }
    });

    model.trigger('request', model, xhr, params);
    return dfd.promise;
  },
};

export default network;
