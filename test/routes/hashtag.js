import request from 'supertest'
import express from 'express'
import fs from 'fs'
import { hashtag } from '../../lib/routes'

var app = express()
var agent = request(app.use('/', hashtag))

describe('Hashtag Router', function () {
  describe('/area', function () {
    describe('GET /', function () {
      it('Successfully responds')
    })
    describe('POST /', function () {
      it('Successfully responds')
    })
  })
  describe('/friends', function () {
    describe('GET /', function () {
      it('Successfully responds')
    })
    describe('POST /', function () {
      it('Successfully responds')
    })
  })
  describe('/:name/users', function () {
    describe('POST /', function () {
      it('Successfully responds')
    })
    describe('DELETE /', function () {
      it('Successfully responds')
    })
  })
})