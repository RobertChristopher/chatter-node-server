import request from 'supertest'
import express from 'express'
import fs from 'fs'
import { user } from '../../lib/routes'

var app = express()
var agent = request(app.use('/', user))

describe('User Router', function () {
  describe('/users', function () {
    describe('GET /', function () {
      it('Successfully responds')
    })
  })
})