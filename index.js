'use strict';

module.exports = function() {
  const lastModified = new Date();
  return function(req, res, next) {
    if (req.method !== 'GET') {
      return next();
    }

    res.header('cache-control', 'public');
    res.header('last-modified', lastModified);

    if (req.fresh) {
      res.header('etag', req.get('if-none-match'));
      res.sendStatus(304);
    }

    return next();
  };
};
