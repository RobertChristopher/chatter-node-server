import config from '../config.js'
const isProd = config.env.isProduction

export default (app) => {
  // Initialize developer dependencies
  if (!isProd) {
    // Developement mode error handler
    // Leaks stack trace
    return (err, req, res, next) => {
      res.status(err.status || 500);
      res.send(err)
    }

  } else {
    
    // Production error handler
    // No stacktraces leaked to user
    return (err, req, res, next) => {
      res.status(err.status || 500);
      res.send({
        message: err.message,
        error: {}
      });
    }

  }
}