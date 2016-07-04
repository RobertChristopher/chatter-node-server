import express from 'express'
import config from '../config.js'
import jwt from 'jsonwebtoken'
import { user } from '../models/'
import Promise from 'bluebird'
import bodyParser from 'body-parser'
import { user_scope } from '../auth/'
import fs from 'fs'
const router = express.Router();

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({extended: true}))

router.post('/', user_scope, function (req, res, next) {
  
  var oauth_token = req.user.oauth_token
  var oauth_secret = req.user.oauth_secret
  var user_id = req.user.id


  if(!oauth_token || !oauth_secret) {
    return next(new Error()
      .body = {
        message: 'Missing oauth token or oauth secret',
        status: 400
      })
  }

  var subject = new user({
    twitter_oauth_token: oauth_token,
    twitter_oauth_token_secret: oauth_secret,
    user_id: user_id
  })

  subject.save((err, response) => {

    if(err) {
      return next(new Error()
        .body = {
          message: 'Error encountered while creating account',
          status: 500
        })
    }

    const cert = fs.readFileSync('jwt_private.key');

    var _jwt = jwt.sign({
      twitter_oauth_token: oauth_token,
      twitter_oauth_token_secret: oauth_secret,
      user_id: user_id
    }, cert, { expiresIn: "2m"})

    res.status(201).json({
      user_id: user_id,
      api_auth_token: _jwt
    })

  })

})

router.post('/friends', user_scope, function (req, res, next) {

  var user_id = req.user_id
  var twitter_friend_id = req.body.user_id

  user.update({ user_id: user_id, friends: {$add: twitter_friend_id}}, 
  function (err, item) {

    if(err) {
      return next(new Error()
        .body = {
          message: 'Error encountered while adding friend',
          status: 500
        })
    }


    res.status(201)
      .send()
  })
})

export default router