const server = require('mock-json-server');
const routes = require('./api/routes');

const app = server(routes, 8080, 'localhost');

app.start();
