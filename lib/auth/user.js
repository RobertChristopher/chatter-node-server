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
    console.log(decoded_token)
    res.send([])
  } catch (err) {
    return res.sendStatus(401)
      .send()
  }
}