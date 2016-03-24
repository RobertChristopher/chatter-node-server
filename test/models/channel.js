import vogels from 'vogels'
import AWS from 'aws-sdk'
import channel from '../../lib/models/channel.js'
const region = "us-east-1"

AWS.config.update({
  accessKeyId: 'AKIAIWMRS3V6WO7NCUVA', 
  secretAccessKey: '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', 
  region: region
});

var opts = { endpoint : 'http://localhost:8000', apiVersion: '2012-08-10' };

var dynamodb = new AWS.DynamoDB(opts);
vogels.dynamoDriver(dynamodb);


before(function (done) {
  this.timeout(10000)
  vogels.createTables(() => {
    console.log("yo")
    done()
  })
})

describe('hashtag Schema', () => {
  describe('Test', () => {
    it('Whatever you are testing..', (done) => {
      done()
    })
  })
})

