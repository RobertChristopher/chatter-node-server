import request from 'supertest'
import express from 'express'
import jwt from 'jsonwebtoken'
import fs from 'fs'
import server from './mock_app.js'

var app = express()
var agent = request(app.use('/', server))

describe('Basic Auth', function () {
  const cert = fs.readFileSync('jwt_private.key');
  var token;
  before(function (done) {
    // Sign jwt token
    token = jwt.sign({ foo: 'bar' }, cert);
    done()
  })
  describe('Unauthorized', function () {
    it('Throws 401 when given an invalid jwt', function (done) {
      agent
      .get('/user')
      .set('x-access-token', 'invalid_jwt')
      .expect(401, done)
    })
  })
  describe('Authorized', function () {
    it('Responds successfully when given a valid jwt', function (done) {
      agent
      .get('/user')
      .set('x-access-token', token)
      .expect(200, done)
    })
  })
})

