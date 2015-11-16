import _ from 'lodash';

module.exports = function (url, params) {
  if (!params) {
    return url;
  }

  var query = '';

  for (let key in params) {
    if (key === 'filter') {
      continue;
    }

    query += `&${key}=${params[key]}`;
  };

  for (let key in params.filter) {
    let filter = params.filter[key];

    if (_.isObject(filter)) {
      if (filter.value) {
        query += `&_${key}=${filter.value}`;
      }

      for (let filterKey in filter) {
        if (filterKey === 'value') {
          continue;
        }

        query += `&_${key}__${filterKey}=${filter[filterKey]}`;
      }
    } else {
      query += `&_${key}=${filter}`;
    }
  }

  if (url.indexOf('?') !== -1) {
    url += '&';
  } else {
    url += '?';
  }

  return url + query.substr(1);
};
