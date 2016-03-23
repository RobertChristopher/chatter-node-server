import auth from 'basic-auth'
import env from '../env.js'

export default (req, res, next) => {

  const user = auth(req)
    , ADMIN_USERNAME = env.ADMIN_USERNAME
    , ADMIN_PASSWORD = env.ADMIN_PASSWORD

  if(!env.isProduction && (!user || user.name !== ADMIN_USERNAME || user.pass != ADMIN_PASSWORD)) {
    // User if not authenticated as admin
    res.setHeader('WWW-Authenticate', 'Basic realm="Authorization Required"')
    res.sendStatus(401)
  } else {
    return next()
  }  

}