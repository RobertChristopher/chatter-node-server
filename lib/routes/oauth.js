import express from 'express';
import { twitter } from '../services'
import config from '../config.js'
const router = express.Router();

function get_credentials () {
  return {
    consumer_key: config.twitter.consumer_key,
    consumer_secret: config.twitter.consumer_secret,
    callback: config.twitter.oauth_callback
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