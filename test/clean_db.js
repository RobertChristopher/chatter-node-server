import { friend_channel } from '../lib/models'
import vogels from 'vogels'
import Promise from 'bluebird'
import schemas from '../lib/models'
import config from '../config.js'
import Joi from 'joi'
import AWS from 'aws-sdk'


var clear_db = function () {
  var deferred = Promise.pending()

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

  friend_channel
  .scan()
  .loadAll()
  .exec(function (err, items) {
    var items = (items.Items)
    items.map(function (item) {
      if(!item.attrs.channel_id) return
      friend_channel.destroy(item.attrs.channel_id, item.attrs.parent_hashtag)
    })
    deferred.resolve(err)
  })

  return deferred.promise
}

module.exports = clear_db