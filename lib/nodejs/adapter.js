/**
*
* @licstart  The following is the entire license notice for the JavaScript code in this file. 
*
* Simple HTTP client that works both in Node.js and browser
*
* Copyright (c) 2016-2017 University Of Helsinki (The National Library Of Finland)
*
* This file is part of http-client-x
*
* http-client-x is free software: you can redistribute it and/or modify
* it under the terms of the GNU Lesser General Public License as published by
* the Free Software Foundation, either version 3 of the License, or
* (at your option) any later version.
*
* This program is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.	See the
* GNU Lesser General Public License for more details.
*
* You should have received a copy of the GNU Lesser General Public License
* along with this program.  If not, see <http://www.gnu.org/licenses/>.
*
* @licend  The above is the entire license notice
* for the JavaScript code in this page.
*
**/

(function() {

  'use strict';

  var Promise = require('@natlibfi/es6-polyfills/lib/polyfills/promise'),
  Object = require('@natlibfi/es6-polyfills/lib/polyfills/object'),
  url = require('url'),
  http = require('http'),
  https = require('https');

  module.exports = function(method, str_url, headers, body)
  {
    return new Promise(function(resolveCallback, rejectCallback) {

      function handleResponse(response)
      {

        var body_response = '';

        response
          .on('error', rejectCallback)
          .on('data', function(chunk) {
            body_response += chunk;
          })
          .on('end', function() {
            
            var result = {
              status: response.statusCode,
              headers: response.headers
            };
            
            if (body_response.length > 0) {
              result.body = body_response;
            }

            if (result.status < 400) {
              resolveCallback(result);
            } else {
              rejectCallback(result);
            }
            
          });
        
      }

      var fn_request, request, options;

      try {

        options = url.parse(str_url);
        
        if (/^http:/.test(options.protocol)) {
          fn_request = http.request;
        } else if (/^https:/.test(options.protocol)) {
          fn_request = https.request;
        } else {
          rejectCallback(new Error('Unsupported protocol: ' + options.protocol));
        }

        options = Object.assign(options, {
          method: method,
          headers: typeof headers === 'object' ? headers: {}
        });

        fn_request(options)
          .on('error', rejectCallback)
          .on('response', handleResponse)
          .end(body);

      } catch (e) {
        rejectCallback(e);
      }

    });
  };

}());
