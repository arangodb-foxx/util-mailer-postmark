# The Postmark Mailer App

The Postmark mailer app provides a `Foxx.queues` job type for sending transactional emails with [Postmark](https://postmarkapp.com/).

*Examples*

```js
var Foxx = require('org/arangodb/foxx')
    queue = Foxx.queues.create('my-queue', 1);

queue.push('mailer.postmark', {
    From: 'postmaster@initech.example',
    To: 'john.doe@employees.initech.example',
    Subject: 'Termination',
    HtmlBody: '<blink>YOU ARE FIRED!</blink>'
});

// or if you prefer not to hardcode the job type:

queue.push(Foxx.requireApp('/postmark-mailer-mountpoint').mailer.jobType, {
    // ...
});
```

## Configuration

This app has the following configuration options:

* *apiKey*: Your Postmark server's API key. You can find this on the Credentials page for the Postmark server you want this app to use.
* *jobType* (optional): The name under which the mailer app's job type will be available. Default: *mailer.postmark*.
* *maxFailures* (optional): The maximum number of times each job will be retried if it fails. Default: *0* (don't retry).

## Job Data

For full documentation of all job data options supported by Postmark see [the official Postmark API documentation](http://developer.postmarkapp.com/developer-build.html#message-format).