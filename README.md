# HTTP client X [![NPM Version](https://img.shields.io/npm/v/http-client-x.svg)](https://npmjs.org/package/http-client-x) [![Build Status](https://travis-ci.org/NatLibFi/http-client-x.svg)](https://travis-ci.org/NatLibFi/http-client-x) [![Test Coverage](https://codeclimate.com/github/NatLibFi/http-client-x/badges/coverage.svg)](https://codeclimate.com/github/NatLibFi/http-client-x/coverage)

Simple HTTP client that works both in Node.js and browser.

## Usage

HTTP client X provides convenience methods for common HTTP requests. Each method returns a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) which is rejected if HTTP status is an error (Status code is greater or equal to 400). The same result object is passed to both resolve and reject callbacks (Unless the request fails and no HTTP response data is available).

* **get**, **head**, **delete**: These methods take a single argument. Either a string representing the URL the request is send to or an object with properties *url* and optional *headers*
* **post**, **put**: These methods either takes two string arguments *url* and *body* or an object with properties *url* and optional *body* and *headers*
* **request**: This method either takes two string arguments *method* and *url* or an object with properties *method*, *url*, and optional *body* and *headers*

Behind the scenes, HTTP client X uses [XMLHttpRequest](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest) in browsers and [http](https://nodejs.org/dist/latest-v4.x/docs/api/http.html)/[https](https://nodejs.org/dist/latest-v4.x/docs/api/https.html) modules in Node.js. Therefore testing software using HTTP client X can be done by faking those implementations or using [http-client-x-mock](https://github.com/NatLibFi/http-client-x-mock) which provides an unified API for mocking.

### Node.js

```js
var http_client = require('http-client-x/lib/nodejs/main');

http_client.get('http://foo.bar').then(function(response) {

  console.log(response.status);
  console.log(response.body);
  console.log(response.headers);

}).catch(function(e) {
  console.error(e);		     
});

```

### AMD
```js
define(['http-client-x/lib/browser/main'], function(http_client) {

  http_client.get('http://foo.bar').then(function(response) {

    console.log(response.status);
    console.log(response.body);
    console.log(response.headers);

  }).catch(function(e) {
    console.error(e);		     
  });

});
```

## Development 

Clone the sources and install the package using `npm`:

```sh
npm install
```

Run the following NPM script to lint, test and check coverage of the code:

```javascript

npm run check

```

## License and copyright

Copyright (c) 2016 **University Of Helsinki (The National Library Of Finland)**

This project's source code is licensed under the terms of **GNU General Public License Version 3** or any later version.
