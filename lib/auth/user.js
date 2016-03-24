import jwt from 'jsonwebtoken'
import fs from 'fs'

export default (req, res, next) => {
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
}