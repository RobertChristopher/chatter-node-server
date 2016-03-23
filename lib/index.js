var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

if(env === 'development')
  require('./app.js')
else
// Production environment. Spawn app on all cores.
require('./cluster.js')