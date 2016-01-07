'use strict';

var logger = require('winston');
logger.level = 'debug';

var dgram = require('dgram');
var server = dgram.createSocket('udp4');

var run = function() {
  server.on('error', (err) => {
    logger.error(`server error:\n${err.stack}`);
    server.close();
  });

  server.on('message', (msg, info) => {
    logger.debug(`${msg}`);
  });

  server.on('listening', () => {
    var address = server.address();
    logger.info(`server listening ${address.address}:${address.port}`);
  });

  server.bind(1900, function() {
    server.addMembership('239.255.255.250');
  });
};

module.exports = {
  run: run
};
