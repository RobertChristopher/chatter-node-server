import helper from '../helper.js'
import express from 'express'
import fs from 'fs'
import { oauth } from '../../lib/routes'
import qs from 'qs'
import error_handler from '../../lib/error_handler.js'

var app = express()
  .use('/', oauth)

var agent = helper.express(app)

describe('Twitter oauth router', function () {
  
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

})