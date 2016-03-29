import request from 'supertest'
import express from 'express'
import config from '../../lib/config.js'
import server from './mock_app.js'

var app = express()
var agent = request(app.use('/', server))

describe('Basic Auth', function () {
  describe('Unauthorized', function () {
    it('Throws 401 when given invalid creds', function (done) {
      agent
      .get('/admin')
      .expect(401, done)
    })
  })
  describe('Authorized', function () {
    it('Responds successfully when given valid creds', function (done) {
      agent
      .get('/admin')
      .auth(config.auth.admin_username, config.auth.admin_password)
      .expect(200, done)
    })
  })
})

