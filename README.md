# cache-cache

A cache middleware for express application serving static or almost static content. It generates a `Last-Modified` header based on last application restart.

If a valid `If-Modified-Since` header is sent by the client, it will send a `304 Not Modified` response with empty body, and not even hit express routes.

With just express server, it allows browser caching.

With reverse proxies such as Nginx or Varnish, it will use it to cache every request hitting the middleware until your process restart. Each express route will be hit only once by process restart. It works also with multi-process server behind reverse proxy.

## Usage

```js
const cache = require('cache-cache');

var app = express();

// static files
app.use('/static/', express.static(__dirname + '/static/', {maxAge: '60000'}));

// cache-cache can be used globally
app.use(cache());

// or with any given routes
app.use('/blog', cache());

// other middlewares and routes
app.use(othermiddleware());
app.get(function(req, res) {
    res.send('ok');
});
```
