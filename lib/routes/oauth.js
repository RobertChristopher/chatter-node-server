import express from 'express';
import { twitter } from '../services'
const router = express.Router();

function get_credentials () {
  return {
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    callback: process.env.TWITTER_OAUTH_CALLBACK
  }
}

router.get('/twitter', (req, res, next) => {

  var subject = (new twitter(get_credentials()))
  subject.get_redirect_url()
  .then(function (redirect_url) {
    res.redirect(redirect_url)
  })
});

router.get('/twitter/callback', (req, res, next) => {
  const token = req.query.oauth_token
  const verifier = req.query.oauth_verifier

  var subject = (new twitter(get_credentials()))
  
  subject.get_access_token(token, verifier)
  .then(function (profile) {
    res.send(profile)
  })
})

export default router