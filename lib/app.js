import express from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan';
import env from './env.js'
const app = express()
const node_env = env.isProduction

// Initialize apps dependencies
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.listen(process.env.PORT || 8081)


// Initialize developer dependencies
if (node_env === 'development') {
  // HTTP route logging for development mode
  app.use(morgan('dev'));
  // Developement mode error handler
  // Leaks stack trace
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



// Mount routes from controllers
import { hashtag } from './routes'
import { user } from './routes'

app.use('/hashtag', hashtag)
app.use('/user', user)




// 404 Error Handling
app.use((req, res, next) => {
  res.status(404)
    .send('The resource you are requesting is currently unavailable')
});  