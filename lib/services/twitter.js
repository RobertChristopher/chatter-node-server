import Promise from 'bluebird'
import request from 'request'
import qs from 'qs'

export default class Twitter {

  constructor (request_token_auth) {
    this._request_token_auth = request_token_auth
  }

  get_redirect_url () {

    const requestTokenUrl = 'https://api.twitter.com/oauth/request_token';
    const authenticateUrl = 'https://api.twitter.com/oauth/authenticate';
    
    var deferred = Promise.pending()

    // Step 1. Obtain request token for the authorization popup.
    request.post({ url: requestTokenUrl, oauth: this._request_token_auth }, function(err, response, body) {
      let oauthToken = qs.parse(body);
      let params = qs.stringify({ oauth_token: oauthToken.oauth_token });

      // Step 2. Redirect to the authorization screen.
      deferred.resolve(authenticateUrl + '?' + params)
    
    })

    return deferred.promise
  }

  get_access_token (oauth_token, oauth_verifier) {

    const accessTokenUrl = 'https://api.twitter.com/oauth/access_token';
    var deferred = Promise.pending()

    this._request_token_auth.token = oauth_token
    this._request_token_auth.verifier = oauth_verifier

    request.post({ url: accessTokenUrl, oauth: this._request_token_auth }, function(err, response, profile) {
      const user_profile = qs.parse(profile)
      deferred.resolve(user_profile)
    });

    return deferred.promise
  }

  verify_credentials (oauth_token, oauth_secret) {
    const accessTokenUrl = 'https://api.twitter.com/1.1/account/verify_credentials.json';
    var deferred = Promise.pending()

    this._request_token_auth.token = oauth_token
    this._request_token_auth.token_secret = oauth_secret

    request.get({ url: accessTokenUrl, oauth: this._request_token_auth }, function(err, response, profile) {
      deferred.resolve(profile)
    });

    return deferred.promise
  }
}