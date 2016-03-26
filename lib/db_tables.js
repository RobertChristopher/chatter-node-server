import vogels from 'vogels'
import Promise from 'bluebird'
import schemas from './models'
import config from '../config.js'
import Joi from 'joi'
import AWS from 'aws-sdk'


export default {
  create: (done) => {

    AWS.config.update({
      accessKeyId: config.aws.aws_access_key_id, 
      secretAccessKey: config.aws.secret_access_key, 
      region: config.aws.region
    });

    var opts;

    if(!config.env.isProduction)
      opts = { endpoint: config.env.developement.aws_local_endpoint, apiVersion: '2012-08-10' };

    var dynamodb = new AWS.DynamoDB(opts);
    vogels.dynamoDriver(dynamodb);

    var deferred = Promise.pending()
    vogels.createTables(function(err) {
      if(err)
        throw err
      done()
    });

  }
}