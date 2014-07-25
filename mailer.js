/*jshint indent: 2, nomen: true, maxlen: 120 */
/*global require, exports, applicationContext */
var queues = require('org/arangodb/foxx').queues,
  internal = require('internal');

queues.registerJobType(applicationContext.configuration.jobType, {
  maxFailures: applicationContext.configuration.maxFailures,
  execute: function (data) {
    'use strict';
    var response, body;
    response = internal.download(
      'http://api.postmarkapp.com/email',
      JSON.stringify(data),
      {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'content-type': 'application/json',
          'x-postmark-server-token': applicationContext.configuration.apiKey
        }
      }
    );
    if (response.body) {
      body = JSON.parse(response.body);
      if (body.ErrorCode !== 0) {
        throw new Error(
          'Server returned error code ' +
          body.ErrorCode +
          ' with message: ' +
          body.Message
        );
      }
    } else if (Math.floor(response.code / 100) !== 2) {
      throw new Error('Server sent an empty response with status ' + response.code);
    }
  }
});

Object.defineProperty(exports, 'jobType', {
  get: function () {
    'use strict';
    return applicationContext.configuration.jobType;
  },
  configurable: false,
  enumerable: true
});