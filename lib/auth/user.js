import jwt from 'jsonwebtoken'
import fs from 'fs'
import auth from 'basic-auth'
import config from '../config.js'
import { twitter } from '../services'

export default (req, res, next) => {
  const request = auth(req)

  // User is authenticating via JWT token
  if(req.headers['x-access-token']) {
    const token = req.headers['x-access-token'];

    if(!token)
      return res.sendStatus(401)
        .send()

    const cert = fs.readFileSync('jwt_private.key');

    try {
      let decoded_token = jwt.verify(token, cert)
      if(!decoded_token || !decoded_token.twitter_oauth_token) {
        // JWT is invalid
        return res.sendStatus(400)
          .send()
      }

      req.twitter_oauth_token = decoded_token.twitter_oauth_token
      next()
    } catch (err) {
      return res.sendStatus(401)
        .send()
    }
  } else if(request.name && request.pass) {
      // User is exchanging oauth for JWT
      // Essentially signup verification
      const oauth_token = request.name
      const oauth_secret = request.pass

      const client = new twitter({
        consumer_key: config.twitter.consumer_key,
        consumer_secret: config.twitter.consumer_secret,
        callback: config.twitter.oauth_callback
      })

      if(!oauth_token || !oauth_secret) {
        res.setHeader('WWW-Authenticate', 'Basic realm="Authorization Required"')
        res.sendStatus(401)
      }

      client.verify_credentials(oauth_token, oauth_secret)
      .then(function (profile) {
        var profile;

        try {
          profile = JSON.parse(profile)
        } catch (err) {
          return res.status(502)
            .send(profile)
        }

      if(profile.errors) {
        return res.send(profile)
      }

      req.user = {}
      req.user.oauth_token = oauth_token
      req.user.oauth_secret = oauth_secret
      req.user.id = profile.id
      req.user.screen_name = profile.screen_name
      req.user.name = profile.name

      next()
    })
  }  
}
