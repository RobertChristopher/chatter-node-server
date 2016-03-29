import request from 'supertest'
import express from 'express'
import jwt from 'jsonwebtoken'
import fs from 'fs'
import server from './mock_app.js'

var app = express()
var agent = request(app.use('/', server))

describe('Basic Auth', function () {
  const cert = fs.readFileSync('jwt_private.key');
  var api_auth_token;
  before(function (done) {
    // Sign jwt token
    api_auth_token = jwt.sign({ twitter_oauth_token: 'foobar' }, cert);
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
      .set('x-access-token', api_auth_token)
      .expect(200, done)
    })
  })
})

