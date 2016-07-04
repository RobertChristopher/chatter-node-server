import tables from './tables'
import env from 'dotenv'
import request from 'supertest'
import Promise from 'bluebird'
import error_handler from '../lib/error_handler.js'
env.config({path: 'test/.env.test'});

'use strict'

process.env.NODE_ENV = 'test'

global.context = describe

var chai = require('chai')
global.assert = chai.assert
global.expect = chai.expect

global.nock = require('nock')

before(function (done) {
  this.timeout(20000)
  // tables.delete().then(function (err) {
  //   console.log(err)
  // })
  tables.create()
  .then(function () {
    done()
  })
})

beforeEach(function (done) {
  module.exports.connect()
  done()
})

after(function (done) {
  module.exports.disconnect()
  done()
  // tables.delete().then(function (err) {
  //   done()
  // })
})

module.exports.clear_db = function () {
  return tables.clear()
}

module.exports.express = function (app) {
  // So we can enable error reporting to client
  app.use(error_handler())
  return request(app)
}

module.exports.nock = function(options) {
  console.log('Mocking out HTTP Requests with nock')

  var nock = require('nock')

  var url      = options.url || 'http://example.com';
  var uri      = options.uri || '/';
  var method   = (options.method  || 'GET').toLowerCase();
  var status   = options.status   || 200;
  var response = options.response || {};

  nock(url).get(uri)
  .reply(status, response);
};

module.exports.connect = function() {
  var nock = require('nock')

  nock.enableNetConnect()
};


module.exports.disconnect = function() {
  var nock = require('nock')

  nock.cleanAll()
};
