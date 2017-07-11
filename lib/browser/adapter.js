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

define(['es6-polyfills/lib/polyfills/promise'], function(Promise) {

  'use strict';

  function parseResponseHeaders(str)
  {
    return str === null ? {} : str.split(new RegExp('\r\n')).reduce(function(headers, line) {
      
      var pair;

		  if (line) {
        pair = line.split(/=/);
		    headers[pair.shift()] = pair.shift();
      }
      
      return headers;

    }, {});
  }

  return function(method, url, headers, body)
  {
    return new Promise(function(resolveCallback, rejectCallback) {
      
      function handleResponse(error)
      {

        var result;

        /* istanbul ignore if: Cannot be covered (Can't make xmlhttprequest-mock to throw) */         
        if (error) {
          rejectCallback(error);
        } else {

          result = {
            status: xhr.status,
            body: xhr.responseText,
            headers: parseResponseHeaders(xhr.getAllResponseHeaders())
          };
          
          if (result.status < 400) {
            resolveCallback(result);
          } else {
            rejectCallback(result);
          }

        }

      }

      var xhr;

      try {

        xhr = new XMLHttpRequest();
        headers = typeof headers === 'object' ? headers : {};
        
        xhr.withCredentials = true;

        xhr.addEventListener('load', function() {
          handleResponse();
        });
        xhr.addEventListener('error', function() {
          handleResponse();
        });

        Object.keys(headers).forEach(function(key) {
          xhr.setRequestHeader(key, headers[key]);
        });

        xhr.open(method, url);
        xhr.send(body);
        
      } catch (e) {
        /* istanbul ignore next: Cannot be covered (Can't make xmlhttprequest-mock to throw) */ handleResponse(e);
      }

    });
  };

});
