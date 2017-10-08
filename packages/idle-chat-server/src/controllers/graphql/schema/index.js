const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const { graphql, introspectionQuery, printSchema } = require('graphql');
const schema = require('../../../services/schema');

router.route('/')
  .get((req, res) => {
    graphql(schema, introspectionQuery)
      .then(result => {
        res.json(result);
      });
  });

module.exports = router;
