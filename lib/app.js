import express from 'express'
import bodyParser from 'body-parser'

var app = express()
var env = process.env.NODE_ENV || 'development';

// Init
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.listen(process.env.PORT || 8081)


// Development error handler
// Will print stacktrace
if (env === 'development') {

  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send(err)
  });

} else {
  // Production error handler
  // No stacktraces leaked to user
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
  });
}

// 404 Error Handler
app.use((req, res, next) => {
  res.status(404)
    .send('The resource you are requesting is currently unavailable')
});  