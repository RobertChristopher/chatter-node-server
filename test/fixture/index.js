import twitter_profile_1 from './twitter_profile.js'
import twitter_profile_2 from './twitter_profile_2.js'
import twitter_auth from './twitter_auth.js'
import twitter_request_token from './twitter_request_token.js'

module.exports = {
  twitter_fixture: {
    profile: twitter_profile_1,
    profile_2: twitter_profile_2,
    auth: twitter_auth,
    request_token: twitter_request_token
  }
}