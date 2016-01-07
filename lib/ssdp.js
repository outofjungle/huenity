'use strict';

const LOG = require('winston');
LOG.level = 'debug';

var dgram = require('dgram');
var server = dgram.createSocket('udp4');

var run = function() {
  server.on('error', (err) => {
    LOG.error(`server error:\n${err.stack}`);
    server.close();
  });

  server.on('message', (msg, info) => {
    if (info.address == '172.16.4.216') {
      LOG.debug(`${msg}`);
    }
  });

  server.on('listening', () => {
    var address = server.address();
    LOG.info(`server listening ${address.address}:${address.port}`);
  });

  server.bind(1900, function() {
    server.addMembership('239.255.255.250');
  });
};

module.exports = {
  run: run
};
