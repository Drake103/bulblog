import _ from 'lodash';
import querystring from 'querystring';


export function getParams () {
  return querystring.parse(window.location.search.slice(1)) || {};
};

export function buildUrl (url, params) {
  var query = querystring.stringify(params);

  if (query.length) {
    url += `?${query}`;
  }

  return url;
};

export function overrideUrl (params) {
  var
    query,
    url = window.location.pathname;

  params = _.assign(getParams(), params);

  for (let key in params) {
    if (params[key] == null || !params[key].length) {
      delete params[key];
    }
  }

  query = querystring.stringify(params);

  if (query.length) {
    url += `?${query}`;
  }

  return url;
};
