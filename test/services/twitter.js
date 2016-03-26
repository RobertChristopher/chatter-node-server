import { twitter } from '../../lib/services' 
import fixture from './twitter_fixture.js'
import helper from '../helper.js'

describe('Twitter', function () {
  const url_regexp = 'https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)'
  var subject;
  before(function () {
    subject = (new twitter(fixture))
    
    nock('https://api.twitter.com')
    .filteringRequestBody(/.*/, '*')
    .post('/oauth/request_token')
    .reply('200', 'oauth_token=ww96RAAAAAAAuS-YAAABU6_PRxY&oauth_token_secret=r9FbPQZ6EHTQbAWbXyGCPXZNEyN8uQ9Y&oauth_callback_confirmed=true')
  
  })
  describe('.authenticate', function () {
    it('Successfully returns a redirect url', function (done) {
      subject.get_redirect_url()
      .then(function (twitter_redirect_url) {
        var regexp = new RegExp(url_regexp)
        expect(twitter_redirect_url.match(url_regexp)).to.be.truthy
        done()
      })
    })
  })
  // describe('.get_access_token', function () {
  //   it('Successfully returns a redirect url', function (done) {
  //     subject.get_access_token()
  //     .then(function (twitter_redirect_url) {
  //       console.log(twitter_redirect_url)
  //       done()
  //     })
  //   })
  // })
})