import _ from 'lodash';
import url from 'url';

var
  CORS_REGEXP = /(?:.*\.)?rtap\.(?:dev|me)$/,
  allowedHeaders = [
    'Accept', 'Content-Type', 'X-Access-Token',
  ].join(', ');

export function dev(req, res, next) {
  var
    parsedUrl,
    referer = req.get('referer');

  if (!referer) {
    return next();
  }

  parsedUrl = url.parse(referer);

  if (CORS_REGEXP.test(parsedUrl.hostname) || parsedUrl.hostname == 'localhost') {
    let origin = `${parsedUrl.protocol}//${parsedUrl.host}`;
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
    res.header('Access-Control-Allow-Headers', allowedHeaders);
  }

  if (req.method === 'OPTIONS') {
    res.end();
  } else {
    next();
  }
}
