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

/* istanbul ignore next: umd wrapper */
(function (root, factory) {

  'use strict';

  if (typeof define === 'function' && define.amd) {
    define(['es6-polyfills/lib/polyfills/object'], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory(require('es6-polyfills/lib/polyfills/object'));
  }

}(this, factory));

function factory(Object)
{

  return function(requestCallback)
  {

    function parseArgs(options, args)
    {
      if (typeof args[0] === 'object') {
        return Object.assign(JSON.parse(JSON.stringify(args[0])), options);
      } else if (typeof args[0] === 'string') {
        return Object.assign(options, {
          url: args[0]
        });
      } else {
        throw new Error('Invalid arguments');
      }
    }

    function parseArgsWithBody(options, args)
    {
      if (typeof args[0] === 'object') {
        return Object.assign(JSON.parse(JSON.stringify(args[0])), options);
      } else if (typeof args[0] === 'string' && typeof args[1] === 'string') {
        return Object.assign(options, {
          url: args[0],
          body: args[1]
        });
      } else {
        throw new Error('Invalid arguments');
      }
    }

    var proto = {};

    if (typeof requestCallback !== 'function') {
      throw new Error('Request callback is not a function');
    } else {    
      return Object.assign(proto, {
        request: function()
        {

          var options = {
            headers: {}
          };

          if (typeof arguments[0] === 'object') {
            options = Object.assign(options, arguments[0]);
          } else if (typeof arguments[0] === 'string' && typeof arguments[1] === 'string') {
            options = Object.assign(options, {
              method: arguments[0],
              url: arguments[1]
            });
          } else {
            throw new Error('Invalid arguments');
          }
          
          if (typeof options.method !== 'string') {
            throw new Error('Method is not a string');
          } else if (typeof options.url !== 'string') {
            throw new Error('URL is not a string');
          }

          return requestCallback(options.method, options.url, options.headers, options.body);

        },
        get: function()
        {
          return proto.request(parseArgs({
            method: 'GET'
          }, arguments));
        },
        head: function()
        {
          return proto.request(parseArgs({
            method: 'HEAD'
          }, arguments));
        },
        delete: function()
        {
          return proto.request(parseArgs({
            method: 'DELETE'
          }, arguments));
        },
        post: function()
        {
          return proto.request(parseArgsWithBody({
            method: 'POST'
          }, arguments));
        },
        put: function()
        {
          return proto.request(parseArgsWithBody({
            method: 'PUT'
          }, arguments));
        }
      });
    }

  };

}
