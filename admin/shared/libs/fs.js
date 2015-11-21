import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import { contains } from './utils';

var loadDir = function(dirname, opts = {}) {
  opts = _.extend({ excludes: ['index'], onlyExt: '.js', flat: false }, opts);
  var res = opts.flat ? [] : {};

  fs.readdirSync(dirname).forEach((file) => {
    var
      fullpath,
      { name, ext } = path.parse(file);

    if (_.startsWith(name, '_')) {
      return;
    }

    if (opts.camelCase) {
      name = _.camelCase(name);
    }

    fullpath = path.join(dirname, file);

    if (!ext && fs.statSync(fullpath).isDirectory()) {
      // Load nested directories recursively.
      if (opts.flat) {
        res = res.concat(loadDir(fullpath, opts));
      } else {
        res[name] = loadDir(fullpath, opts);
      }
    }

    if ((opts.onlyExt && ext !== opts.onlyExt) || contains(opts.excludes, name)) {
      return;
    }

    if (opts.flat) {
      res.push(require(fullpath));
    } else {
      res[name] = require(fullpath);
    }
  });

  return res;
};

export default { loadDir };
