import request from 'supertest'
import express from 'express'
import jwt from 'jsonwebtoken'
import fs from 'fs'
import user from '../../lib/routes/user.js'
import error_handler from '../../lib/error_handler.js'

var app = express()
var agent = request(app.use('/', user))
app.use(error_handler())

describe('User Router', function () {
  const cert = fs.readFileSync('jwt_private.key');
  const twitter_oauth_token = "demo_token"
  describe('/users', function () {
    describe('POST /', function () {
      it('Successfully responds', function (done) {
        agent
        .post('/')
        .set('Authorization', twitter_oauth_token)
        .expect(201, done)
      })
    })
  })
})