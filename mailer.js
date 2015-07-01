/*global require, module, applicationContext */
'use strict';
var apiKey = applicationContext.configuration.apiKey;
var request = require('org/arangodb/request');
var util = require('util');

var data = require('./exports').schema.validate(applicationContext.argv[0]);
if (data.error) {
  throw data.error;
}

var response = request.post('http://api.postmarkapp.com/email', {
  body: data.value,
  json: true,
  headers: {
    'accept': 'application/json',
    'content-type': 'application/json',
    'x-postmark-server-token': applicationContext.configuration.apiKey
  }
});

if (response.body) {
  if (response.body.ErrorCode !== 0) {
    throw new Error(util.format(
      'Server returned error code %s with message: %s',
      response.body.ErrorCode,
      response.body.Message
    ));
  }
} else if (Math.floor(response.statusCode / 100) !== 2) {
  throw new Error('Server sent an empty response with status ' + response.statusCode);
}

module.exports = response.body;
