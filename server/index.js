const express = require('express');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handler = app.getRequestHandler();

function redirectToHTTPS(req, res, next) {
  if (!req.secure && req.get('X-Forwarded-Proto') !== 'https' && req.headers.host != '127.0.0.1:3000') {
    res.redirect(301, '<domain>' + req.url);
  } else next();
}

function redirectTrailingSlash(req, res, next) {
  let paths = req.url.split('?'); // get url and query from request
  let path = paths[0],
    query = null; // split request and query
  if (paths.length > 1) query = paths.slice(1, paths.length).join('?'); // Rebuild query

  if (path.substr(-1) === '/' && path.length > 1) res.redirect(301, path.slice(0, -1) + (query ? '?' + query : ''));
  // Redirect User with 301 and without the slash
  else next();
}

app
  .prepare()
  .then(async () => {
    const server = express();

    server.get('*', async (req, res) => {
      return handler(req, res);
    });

    server
      .use(redirectTrailingSlash)
      .use(redirectToHTTPS)
      .listen(3000, err => {
        if (err) throw err;
        console.log(`> Ready on 3000`);
      });
  })
  .catch(() => {
    process.exit(1);
  });
