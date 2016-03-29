import config from '../config.js'
const node_env = config.env.isProduction

if(!node_env)
  require('./app.js')
else
// Production environment. Spawn app on all cores.
require('./cluster.js')