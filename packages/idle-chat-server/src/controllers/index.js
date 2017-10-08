const express = require('express');
const router = express.Router();
const pkg = require('./../../package.json');

router.use('/graphql', require('./graphql'));

router.route('/')
  .get((req, res) => {
    res.json({
      name: pkg.name,
      description: pkg.description,
      version: pkg.version
    });
  });

module.exports = router;
