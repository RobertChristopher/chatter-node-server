import helper from '../helper.js'
import express from 'express'
import fs from 'fs'
import { hashtag } from '../../lib/routes'
import { user } from '../../lib/routes'
import { twitter_fixture } from '../fixture'

var app = express()
  .use('/hashtag', hashtag)
  .use('/user', user)

var agent = helper.express(app)


const oauth_token = '713090810183606272-Knhblzn1LTKyd4DlUuFSJeQppBPL9x8'
const oauth_secret = 'i7QOA2hZuv28GzJRxL4DQkiQO9Zn3xka1RCaXNiLG0xWa'

describe('Hashtag Router', function () {
  this.timeout(5000)
  var api_auth_token;
  var api_auth_token_2;

  // Turn on Twitter API Mocks for profile 1
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

  // Add a primary user in the database
  before(function (done) {
    agent
    .post('/user')
    .auth(oauth_token, oauth_secret)
    .end(function (err, res) {
      expect(res.status).to.equal(201)
      api_auth_token = res.body.api_auth_token
      done()
    })
  })

  
  describe('/friends', function () {
    before(function () {
      // Clear previous twitter mock.
      // This is so that we can return a new user.
      nock.cleanAll()
      
      // Turn on Twitter API mocks for profile 2
      nock('https://api.twitter.com')
      .filteringRequestBody(/.*/, '*')
      .post('/oauth/request_token')
      .reply('200', twitter_fixture.request_token)
    
      nock('https://api.twitter.com')
      .filteringRequestBody(/.*/, '*')
      .get('/1.1/account/verify_credentials.json')
      // Using profile 2
      .reply('200', twitter_fixture.profile_2)
    })
    before(function (done) {
      // Add another user to the database ( serves as a friend for primary user )
      agent
      .post('/user')
      .auth(oauth_token, oauth_secret)
      .end(function (err, res) {
        expect(res.status).to.equal(201)
        api_auth_token_2 = res.body.api_auth_token
        done()
      })
    })
    // Add the second user to the primary users friend list
    before(function (done) {
      agent
      .post('/user/friends')
      .set('x-access-token', api_auth_token)
      .send({
        // Notice, we are using the second users id
        user_id: twitter_fixture.profile_2.id_str
      })
      .end(function (err, res) { 
        expect(res.status).to.equal(201)
        done()
      })
    })
    describe('POST /', function (done) {
      // Create a friend channel as secondary user
      it('Successfully responds', function (done) {
        agent
        .post('/hashtag/friends')
        .set('x-access-token', api_auth_token_2)
        .send({
          hashtag_name: "Trump"
        })
        .end(function (err, res) {
          expect(res.status).to.equal(201)
          done()
        })
      })

    })
    describe('GET /', function () {
      // Get the secondary users friend channel that was published to all of his friends
      it('Successfully responds', function (done) {
        agent
        .get('/hashtag/friends')
        .set('x-access-token', api_auth_token)
        ///////// FIXXXXXXXXX ///////////////
        .send({
          friends: [twitter_fixture.profile_2.id_str]
        })
        .end(function (err, res) {
          expect(res.body).to.be.an.instanceOf(Array)
          done()
        })
      })
    })
    describe('POST /', function () {
      it('Successfully responds')
    })
  })
  describe('/:name/users', function () {
    describe('POST /', function () {
      it('Successfully responds', function (done) {
        agent
        .post('/hashtag/trump/users')
        .set('x-access-token', api_auth_token)
        .end(function (err, res) {
          expect(res.status).to.equal(200)
          done()
        })
      })
    })
    describe('DELETE /', function () {
      it('Successfully responds', function (done) {
        agent
        .delete('/hashtag/trump/users')
        .set('x-access-token', api_auth_token)
        .end(function (err, res) {
          expect(res.status).to.equal(200)
          done()
        })
      })
    })
  })
  after(function (done) {
    // Wipe DB
    helper.clear_db()
    .then(function (err) {
      expect(err).to.be.null
      done()
    })
  })
})