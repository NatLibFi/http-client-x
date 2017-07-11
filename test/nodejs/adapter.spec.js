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
  var chai = require('chai'),
  nock = require('nock'),
  Promise = require('@natlibfi/es6-polyfills/lib/polyfills/promise'),
  adapterCallback = require('../../lib/nodejs/adapter'),
  expect = chai.expect;
  
  chai.use(require('chai-as-promised'));
  
  describe('adapter', function() {

    afterEach(nock.cleanAll);

    it('Should be a function', function() {
      expect(adapterCallback).to.be.a('function');
    });

    it('Should be rejected because of invalid arguments', function() {
      return expect(adapterCallback()).to.be.rejectedWith(TypeError);
    });

    it('Should be rejected because of an invalid URL', function() {
      return expect(adapterCallback('foo', 'bar')).to.be.rejectedWith(Error, /^Error: Unsupported protocol: null$/);
    });

    it('Should be rejected because the sending the request fails', function() {

      nock('http://foobar').get('/fubar').reply(500);

      return expect(adapterCallback('GET', 'http://foobar')).to.be.rejected.and.to.eventually.be.an.instanceof(Error);

    });

    it('Should be rejected because the retrieving the response fails', function() {

       nock('http://foobar').get('/').reply(500);

      return expect(adapterCallback('GET', 'http://foobar')).to.be.rejected.and.to.eventually.eql({
        status: 500,
        headers: {}
      });

    });

    it('Should resolve with the expected response', function() {

      nock('http://foobar').post('/').reply(200, function(uri, body) {
        return body == 'foo' ? 'bar' : undefined;
      });

      return expect(adapterCallback('POST', 'http://foobar', undefined, 'foo')).to.eventually.eql({
        status: 200,
        headers: {},
        body: 'bar'
      });

    });

    it('Should resolve with the expected response (HTTPS)', function() {

      nock('https://foobar').get('/').reply(200);

      return expect(adapterCallback('GET', 'https://foobar', {})).to.eventually.eql({
        status: 200,
        headers: {}
      });


    });

  });

}());
