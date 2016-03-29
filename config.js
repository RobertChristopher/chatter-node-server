require('dotenv').config()

var internals = module.exports


internals.aws = {}
internals.pubnub = {}
internals.auth = {}
internals.twitter = {}
internals.env = {}
internals.env.developement = {}

// Amazon Web Services Configuration
internals.aws.secret_access_key = process.env.AWS_SECRET_ACCESS_KEY
internals.aws.aws_access_key_id = process.env.AWS_ACCESS_KEY_ID
internals.aws.region = process.env.AWS_REGION

// PubNub Configuration
internals.pubnub.publish_key = process.env.PUB_NUB_PUBLISH_KEY
internals.pubnub.secret_key = process.env.PUB_NUB_SECRET_KEY
internals.pubnub.subscribe_key = process.env.PUB_NUB_SUBSCRIBE_KEY

// Twitter Configuration
internals.twitter.consumer_key = process.env.TWITTER_CONSUMER_KEY
internals.twitter.consumer_secret = process.env.TWITTER_CONSUMER_SECRET
internals.twitter.oauth_callback = process.env.TWITTER_OAUTH_CALLBACK

// Authentication Configuration
internals.auth.admin_username = process.env.ADMIN_USERNAME
internals.auth.admin_password = process.env.ADMIN_PASSWORD

internals.env.isProduction = process.env.NODE_ENV === 'production'

if(!internals.env.isProduction) {
  // Development Configuration
  internals.env.developement.aws_local_endpoint = process.env.AWS_LOCAL_ENDPOINT
  internals.env.developement.twitter_oauth_callback = process.env.TWITTER_OAUTH_CALLBACK
}