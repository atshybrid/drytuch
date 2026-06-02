const { readFileSync } = require('node:fs');
const { join } = require('node:path');
const jsonServer = require('json-server');

const dbPath = join(process.cwd(), 'server/db.json');
const db = JSON.parse(readFileSync(dbPath, 'utf8'));

const server = jsonServer.create();
const router = jsonServer.router(db);
const middlewares = jsonServer.defaults({ noCors: false, logger: false });

server.use(middlewares);
server.use(router);

/** JSON Server API for Vercel — mirrors local json-server on port 3001 */
module.exports = (req, res) => {
  const url = req.url || '/';
  req.url = url.replace(/^\/api(?=\/|$)/, '') || '/';
  server(req, res);
};
