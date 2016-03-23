require('dotenv').config()

module.exports = {
  isProduction: process.env.NODE_ENV === 'production',
  ADMIN_USERNAME: process.env.ADMIN_USERNAME,
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD
}