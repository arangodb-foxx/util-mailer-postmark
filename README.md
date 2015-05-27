# The Postmark Mailer App

The Postmark mailer app provides a `Foxx.queues` job type for sending transactional emails with [Postmark](https://postmarkapp.com/).

**Note:** Version 2.0.0 and higher require ArangoDB 2.6 or later to work correctly.

*Examples*

First add this app to your dependencies:

```js
{
  ...
  "dependencies": {
    "mailer": "mailer-postmark:^2.0.0"
  }
  ...
}
```

Once you've configured both apps correctly, you can use it like this:

```js
var Foxx = require('org/arangodb/foxx');
var queue = Foxx.queues.get('default');

queue.push(applicationContext.dependencies.mailer, {
    From: 'postmaster@initech.example',
    To: 'john.doe@employees.initech.example',
    Subject: 'Termination',
    HtmlBody: '<blink>YOU ARE FIRED!</blink>'
});
```

## Configuration

This app has the following configuration options:

* *apiKey*: Your Postmark server's API key. You can find this on the Credentials page for the Postmark server you want this app to use.
* *maxFailures* (optional): The maximum number of times each job will be retried if it fails. Default: *0* (don't retry).

## Job Data

For full documentation of all job data options supported by Postmark see [the official Postmark API documentation](http://developer.postmarkapp.com/developer-build.html#message-format).

## License

This code is distributed under the [Apache License](http://www.apache.org/licenses/LICENSE-2.0) by ArangoDB GmbH.
