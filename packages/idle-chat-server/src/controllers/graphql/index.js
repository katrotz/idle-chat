const express = require('express');
const router = express.Router();
const graphqlHTTP = require('express-graphql');

const app = require('./../../index').app;
const schema = require('../../services/schema');

const environment = app.get('environment');
const pretty = true;
const graphiql = (environment.name !== 'production');

const rootValue = {
  ip: function (args, request) {
    return request.ip;
  }
};

router.use('/', graphqlHTTP({ schema, rootValue, graphiql, pretty }));

module.exports = router;
