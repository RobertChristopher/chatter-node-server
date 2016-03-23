import env from './env.js'
const node_env = env.isProduction

if(node_env === 'development')
  require('./app.js')
else
// Production environment. Spawn app on all cores.
require('./cluster.js')