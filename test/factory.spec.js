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

(function (root, factory) {

  'use strict';

  if (typeof define === 'function' && define.amd) {
    define([
      'chai/chai',
      'simple-mock',
      '../lib/factory'
    ], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory(
      require('chai'),
      require('simple-mock'),
      require('../lib/factory')
    );
  }

}(this, factory));

function factory(chai, simple, factory)
{

  'use strict';

  var expect = chai.expect;

  describe('factory', function() {

    it('Should be a  function', function() {
      expect(factory).to.be.a('function');
    });

    it('Should throw because request callback is not a function', function() {
      expect(factory).to.throw(Error, /^Request callback is not a function$/);
    });

    it('Should return the expected object', function() {
      expect(factory(simple.stub())).to.be.an('object').and.to
        .respondTo('request').and.to
        .respondTo('get').and.to
        .respondTo('head').and.to
        .respondTo('delete').and.to
        .respondTo('post').and.to
        .respondTo('put');
    });

    describe('object', function() {

      describe('#request', function() {

        it('Should throw because arguments are invalid', function() {
          expect(factory(simple.stub()).request).to.throw(Error, /^Invalid arguments$/);
        });

        it('Should throw because method is invalid', function() {
          expect(function() {
            factory(simple.stub()).request({
              method: 0
            });
          }).to.throw(Error, /^Method is not a string$/);
        });

        it('Should throw because URL is invalid', function() {
          expect(function() {
            factory(simple.stub()).request({
              method: 'foobar',
              url: 0
            });
          }).to.throw(Error, /^URL is not a string$/);
        });

        it('Should use the object argument', function() {

          var options = {
            method: 'foo',
            url: 'bar'
          },
          spy = simple.spy();

          factory(spy).request(options);

          expect(spy.callCount).to.equal(1);
          expect(spy.calls[0].args).to.eql([
            'foo',
            'bar',
            {},
            undefined
          ]);
          
        });

        it('Should use string arguments', function() {

          var spy = simple.spy();

          factory(spy).request('foo', 'bar');

          expect(spy.callCount).to.equal(1);
          expect(spy.calls[0].args).to.eql([
            'foo',
            'bar',
            {},
            undefined
          ]);

        });

      });

      describe('#get', function() {

        it('Should throw because arguments are invalid', function() {
          expect(function() {
            factory(simple.stub()).get();
          }).to.throw(Error, /^Invalid arguments$/);
        });

        it('Should use the object argument', function() {

          var options = {
            method: 'foo',
            url: 'bar'
          },
          spy = simple.spy();

          factory(spy).get(options);

          expect(spy.callCount).to.equal(1);
          expect(spy.calls[0].args).to.eql([
            'GET',
            'bar',
            {},
            undefined
          ]);
          
        });

        it('Should use string arguments', function() {

          var spy = simple.spy();

          factory(spy).get('foobar');

          expect(spy.callCount).to.equal(1);
          expect(spy.calls[0].args).to.eql([
            'GET',
            'foobar',
            {},
            undefined
          ]);

        });

      });

      describe('#head', function() {

        it('Should throw because arguments are invalid', function() {
          expect(function() {
            factory(simple.stub()).head();
          }).to.throw(Error, /^Invalid arguments$/);
        });

        it('Should use the object argument', function() {

          var options = {
            method: 'foo',
            url: 'bar'
          },
          spy = simple.spy();

          factory(spy).head(options);

          expect(spy.callCount).to.equal(1);
          expect(spy.calls[0].args).to.eql([
            'HEAD',
            'bar',
            {},
            undefined
          ]);
          
        });

        it('Should use string arguments', function() {

          var spy = simple.spy();

          factory(spy).head('foobar');

          expect(spy.callCount).to.equal(1);
          expect(spy.calls[0].args).to.eql([
            'HEAD',
            'foobar',
            {},
            undefined
          ]);

        });

      });

      describe('#delete', function() {

        it('Should throw because arguments are invalid', function() {
          expect(function() {
            factory(simple.stub()).delete();
          }).to.throw(Error, /^Invalid arguments$/);
        });

        it('Should use the object argument', function() {

          var options = {
            method: 'foo',
            url: 'bar'
          },
          spy = simple.spy();

          factory(spy)['delete'](options);

          expect(spy.callCount).to.equal(1);
          expect(spy.calls[0].args).to.eql([
            'DELETE',
            'bar',
            {},
            undefined
          ]);
          
        });

        it('Should use string arguments', function() {

          var spy = simple.spy();

          factory(spy)['delete']('foobar');

          expect(spy.callCount).to.equal(1);
          expect(spy.calls[0].args).to.eql([
            'DELETE',
            'foobar',
            {},
            undefined
          ]);

        });

      });

      describe('#post', function() {

        it('Should throw because arguments are invalid', function() {
          expect(function() {
            factory(simple.stub()).post('foobar');
          }).to.throw(Error, /^Invalid arguments$/);
        });

        it('Should use the object argument', function() {

          var options = {
            method: 'fubar',
            url: 'foo',
            body: 'bar'
          },
          spy = simple.spy();

          factory(spy).post(options);

          expect(spy.callCount).to.equal(1);
          expect(spy.calls[0].args).to.eql([
            'POST',
            'foo',
            {},
            'bar'
          ]);
          
        });

        it('Should use string arguments', function() {

          var spy = simple.spy();

          factory(spy).post('foo', 'bar');

          expect(spy.callCount).to.equal(1);
          expect(spy.calls[0].args).to.eql([
            'POST',
            'foo',
            {},
            'bar'
          ]);

        });

      });

      describe('#put', function() {

        it('Should throw because arguments are invalid', function() {
          expect(function() {
            factory(simple.stub()).put('foobar');
          }).to.throw(Error, /^Invalid arguments$/);
        });

        it('Should use the object argument', function() {

          var options = {
            method: 'fubar',
            url: 'foo',
            body: 'bar'
          },
          spy = simple.spy();

          factory(spy).put(options);

          expect(spy.callCount).to.equal(1);
          expect(spy.calls[0].args).to.eql([
            'PUT',
            'foo',
            {},
            'bar'
          ]);
          
        });

        it('Should use string arguments', function() {

          var spy = simple.spy();

          factory(spy).put('foo', 'bar');

          expect(spy.callCount).to.equal(1);
          expect(spy.calls[0].args).to.eql([
            'PUT',
            'foo',
            {},
            'bar'
          ]);

        });

      });

    });

  });

}
