// import request from 'supertest'
// import express from 'express'
// import jwt from 'jsonwebtoken'
// import fs from 'fs'
// import user from '../../lib/routes/user.js'
// import error_handler from '../../lib/error_handler.js'

// var app = express()
// var agent = request(app.use('/', user))
// app.use(error_handler())

// describe('User Router', function () {
  
//   const cert = fs.readFileSync('jwt_private.key');
//   const twitter_oauth_token = "demo_token"
//   const oauth_token = '713090810183606272-Knhblzn1LTKyd4DlUuFSJeQppBPL9x8'
//   const oauth_secret = 'i7QOA2hZuv28GzJRxL4DQkiQO9Zn3xka1RCaXNiLG0xWa'
  
//   describe('/users', function () {
//     describe('POST /', function () {
//       it('Successfully responds', function (done) {
//         agent
//         .post('/')
//         .auth(oauth_token, oauth_secret)
//         .expect(201, done)
//       })
//     })
//   })
// })