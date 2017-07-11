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

define([
  'chai/chai',
  'chai-as-promised',
  '@natlibfi/xmlhttprequest-mock',
  '@natlibfi/es6-polyfills/lib/polyfills/promise',
  '../../lib/browser/adapter'
], function (chai, chaiAsPromised, xhrMockFactory, Promise, adapterCallback) {

  'use strict';
  
  var expect = chai.expect,
  xhr_mock = xhrMockFactory(1);
  
  chai.use(chaiAsPromised);

  describe('adapter', function() {

    afterEach(xhr_mock.restore);

    it('Should be a function', function() {
      expect(adapterCallback).to.be.a('function');
    });

    it('Should reject because the request fails', function() {

      xhr_mock.create({
        status: 500,
        fail: 1
      });
      
      return expect(adapterCallback('foo', 'bar')).to.be.rejected.and.to.eventually.eql({
        status: 500,
        body: '',
        headers: {}
      });

    });

    it('Should resolve with the expected response', function() {

      xhr_mock.create({
        headers: {
          'Foo': 'bar'
        }
      });

      return expect(adapterCallback('foo', 'bar', {
        'Bar': 'foo'
      })).to.eventually.eql({
        status: 200,
        body: '',
        headers: {
          'Foo': 'bar'
        }
      });

    });

  });

});
