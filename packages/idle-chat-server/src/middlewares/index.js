const bootstrap = require('./bootstrap');
const compression = require('compression')({});
const cors = require('cors')();
const routeNotFound = require('./route-not-found');

module.exports = {
  pre: [
    bootstrap,
    compression,
    cors
  ],
  post: [
    routeNotFound
  ]
};
