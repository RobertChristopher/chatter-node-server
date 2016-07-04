import helper from '../helper.js'
import request from 'supertest'
import config from '../../config.js'
import express from 'express'
import user from '../../lib/routes/user.js'
import { twitter_fixture } from '../fixture'

var app = express()
app.use('/', user)

var agent = helper.express(app)

describe('User Router', function () {

  const oauth_token = '713090810183606272-Knhblzn1LTKyd4DlUuFSJeQppBPL9x8'
  const oauth_secret = 'i7QOA2hZuv28GzJRxL4DQkiQO9Zn3xka1RCaXNiLG0xWa'  
  const twitter_oauth_token = "demo_token"
  var api_auth_token;
  const friend_user_id = 4040

  before(function () {
    nock('https://api.twitter.com')
      .filteringRequestBody(/.*/, '*')
      .post('/oauth/request_token')
      .reply('200', twitter_fixture.request_token)
    
    nock('https://api.twitter.com')
      .filteringRequestBody(/.*/, '*')
      .get('/1.1/account/verify_credentials.json')
      .reply('200', twitter_fixture.profile)
  })

  describe('/users', function () {
    describe('POST /', function () {
      it('Successfully responds', function (done) {
        agent
        .post('/')
        .auth(oauth_token, oauth_secret)
        .end(function (err, res) {
          expect(res.status).to.equal(201)
          api_auth_token = res.body.api_auth_token
          done()
        })
      })
    })
  })
  describe('/friends', function () {
    describe('POST /', function () {
      it('Successfully responds', function (done) {
        agent
        .post('/friends')
        .set('x-access-token', api_auth_token)
        .send({
          user_id: friend_user_id
        })
        .end(function (err, res) {
          expect(res.status).to.equal(201)
          done()
        })
      })
    })
  })
})