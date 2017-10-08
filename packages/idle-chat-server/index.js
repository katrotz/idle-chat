const logger = require('winston');
const argv = require('minimist')(process.argv.slice(2));
const IdleChat = require('./src');

const port = argv.port || 8080;
const isProduction = (process.env.NODE_ENV === 'production');

logger.cli();

IdleChat.setPort(port)
  .setEnvironment(isProduction)
  .run();