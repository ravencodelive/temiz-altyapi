const Application = require('./library/modules/Application.js');
const Properties = require('./library/modules/Application.config.js');
module.exports = new Application(Properties.token).client;

process.on('uncaughtException', console.log);