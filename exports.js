/*global module, applicationContext */
'use strict';

module.exports = {
  mount: applicationContext.mount,
  name: 'mailer',
  maxFailures: applicationContext.configuration.maxFailures
};