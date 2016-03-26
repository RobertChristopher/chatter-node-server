import express from 'express';
import { user } from '../models/'
import Promise from 'bluebird'
const router = express.Router();


router.post('/', function (req, res, next) {

  var twitter_oauth_token = req.headers['authorization']

  if(!twitter_oauth_token) {
    return next(new Error()
      .status = '400'
      .message = 'Missing twitter_oauth_token')
  }

  var twitter_user_id = 4039
  var subject = new user(get_user_object(twitter_oauth_token, twitter_user_id))

  subject.save((err, response) => {
    
    if(err) {
      return next(new Error()
        .status = '500'
        .message = 'Error encountered while creating account')
    }

    res.sendStatus(201)
      .send()

  })

})

function get_user_object (twitter_oauth_token, user_id) {
  return {
    twitter_oauth_token: twitter_oauth_token,
    user_id: user_id,
    channels: [{
      channel_id: 455,
      parent_hashtag: "trump"
    }]
  }
}

export default router