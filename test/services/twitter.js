import config from '../../lib/config.js'
import { twitter } from '../../lib/services' 
import { twitter_fixture } from '../fixture'
import helper from '../helper.js'

describe('Twitter', function () {

  var subject;
  const oauth_token = '713090810183606272-Knhblzn1LTKyd4DlUuFSJeQppBPL9x8'
  const oauth_secret = 'i7QOA2hZuv28GzJRxL4DQkiQO9Zn3xka1RCaXNiLG0xWa'


  before(function () {
    subject = (new twitter(twitter_fixture.auth))

    nock('https://api.twitter.com')
      .filteringRequestBody(/.*/, '*')
      .post('/oauth/request_token')
      .reply('200', twitter_fixture.request_token)
    
    nock('https://api.twitter.com')
      .filteringRequestBody(/.*/, '*')
      .get('/1.1/account/verify_credentials.json')
      .reply('200', twitter_fixture.profile)

  })
  describe('Oauth', function () {
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
  })
  describe('User', function () {
    describe('.verify_credentials', function () {
      it('Successfully returns a user object', function (done) {
        subject.verify_credentials(oauth_token, oauth_secret)
        .then(function (twitter_user_object){
          expect(JSON.parse(twitter_user_object).id).to.exist
          done()
        })
      })
    })
  })

  const url_regexp = 'https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)'

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