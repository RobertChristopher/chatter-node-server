process.env.NODE_ENV = process.env.NODE_ENV || 'development';

import cluster from 'cluster'
import os from 'os'
const numCPUs = os.cpus().length;

if (cluster.isMaster) {
  for (var i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    cluster.fork()
  });

} else {
  require('./app.js')
}