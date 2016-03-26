import auth from 'basic-auth'
import config from '../../config.js'

export default (req, res, next) => {

  const user = auth(req)
    , ADMIN_USERNAME = config.auth.admin_username
    , ADMIN_PASSWORD = config.auth.admin_password

  if(!config.env.isProduction && (!user || user.name !== ADMIN_USERNAME || user.pass != ADMIN_PASSWORD)) {
    // User if not authenticated as admin
    res.setHeader('WWW-Authenticate', 'Basic realm="Authorization Required"')
    res.sendStatus(401)
  } else {
    return next()
  }  

}