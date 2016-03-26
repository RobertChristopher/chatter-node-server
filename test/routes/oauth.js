import request from 'supertest'
import express from 'express'
import jwt from 'jsonwebtoken'
import fs from 'fs'
import helper from '../helper.js'
import { oauth } from '../../lib/routes'
import qs from 'qs'
import error_handler from '../../lib/error_handler.js'

var app = express()
var agent = request(app.use('/', oauth))
app.use(error_handler())

describe('Twitter oauth router', function () {
  before(function () {
    //Setup nock mocks because i'm too lazy

     // nock('https://api.twitter.com')
     // .filteringRequestBody(/.*/, '*')
     // .post('/oauth/access_token')
     // .reply('200', 'oauth_token=2488807699-ufFQV6O3CkDOWDZSWsvNKTfqeb8ovEZdwfueUQY&oauth_token_secret=EeU4EL24BgJzCgNm77a34DsGD15Cc9OsxEOs3fNGR804Y&user_id=2488807699&screen_name=c9Kicks&x_auth_expires=0')
  
  })
  describe('/twitter', function () {
    describe('GET /', function () {
      it('Successfully responds with a twitter redirect url', function (done) {
        agent
        .get('/twitter')
        .end(function (err, response) {
          expect(response.headers.location).to.exist
          done()
        })
      })
    })
  })
  // describe('/twitter/callback', function () {
  //   describe('GET /', function () {
  //     it('Successfully completes the twitter oauth proccess', function (done) {
  //       agent
  //       .get('/twitter/callback?' + qs.stringify({
  //         oauth_token: 'e3g52gAAAAAAuS-YAAABU6_k_34',
  //         oauth_verifier: 'eRRLx12xzcg1kqtWa4HDfqOk3d0n7cuF'
  //       }))
  //       .end(function (err, response) {
  //         expect(response.body.oauth_token).to.exist
  //         expect(response.body.oauth_token_secret).to.exist
  //         expect(response.body.user_id).to.exist
  //         expect(response.body.screen_name).to.exist
  //         done()
  //       })
  //     })
  //   })
  // })
})