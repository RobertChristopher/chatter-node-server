import express from 'express';
import bodyParser from 'body-parser'
import Promise from 'bluebird'
import PubNub from 'pubnub'
import { world_channel } from '../models'
import { user_scope } from '../auth'
import { basic } from '../auth'
import { friend_channel } from '../models'
import { user } from '../models'
import config from '../config'
import hashtagService from '../services/'
const router = express.Router();

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({extended: true}))


const Client = PubNub.init(config.pubnub)


router.get('/', (req, res, next) => {
  res.send();
})

router.get('/friends', user_scope, (req, res, next) => {

  const user_id = req.user_id
  
  user
  .query(user_id)
  .execAsync()
  .then((friends, resolve) => {
    var deferred = Promise.pending()

    if(!friends) {
      return next(new Error()
        .body = {
          message: 'An error while retrieving user has occured',
          status: 500
        })
    }

    if(!friends.Count) {
      // No user was found
      return next(new Error()
        .body = {
          message: 'User no longer exists',
          status: 404
        })
    }

    deferred.resolve(friends.Items[0].attrs.friends)
    return deferred.promise

  })
  .then((friends, resolve) => {


    friend_channel
    .scan()
    .where("channel_creator").in(friends)
    .exec(function (err, item) {

      if(err) {
        return next(new Error()
          .body = {
            message: 'Error finding friend channels',
            status: 500
          })
      }

      if(!item.Count) {
        // Did not find any friends channels
        return res.status(404)
          .send([])
      }

      var items = item.Items
      var response = []

      // Gather all channels up into an array
      items.map(function (item) {
        response.push({
          hashtag_name: item.attrs.parent_hashtag,
          channel_id: item.attrs.channel_id,
          users_in_channel: 0
        })
      })

      res.send(response)
    })
  })

});

router.post('/friends', user_scope, (req, res, next) => {

  if(!req.body)
    return res.status(400)
      .send()


  const channel_id = "500"
  const parent_hashtag = req.body.hashtag_name
  const channel_creator = req.user_id

  var subject = new friend_channel({
    channel_id: channel_id,
    parent_hashtag: parent_hashtag,
    channel_creator: channel_creator
  })

  subject.save((err, response) => {
    if(err) {
      return next(new Error()
        .body = {
          message: 'Error encountered while creating friend channel',
          status: 500
        })
    }

    res.status(201)
      .send({ channel_id: channel_id })
  })
});

router.post('/:name/users', user_scope, (req, res, next) => {
  
  const hashtag = req.params.name
  const user_id = req.user_id


   world_channel
  .query(hashtag)
  .usingIndex('PublishedIndex')
  .where('users_present').lt(11)
  .limit(1)
  .execAsync()
  .then((item) => {

    var deferred = Promise.pending()

    if(item.count) {
      return deferred.resolve(item.Items[0].attrs)
    }

    // Hashtag is not available. Create it.
    var subject = new world_channel({
      parent_hashtag: hashtag,
      users_present: 1,
      users: [user_id],
    })

    subject.save((err, response) => {
      if(err) {
        return next(new Error()
          .body = {
            message: 'Error encountered while creating channel',
            status: 500
        })
      }

      return deferred.resolve(response.attrs)
    })


    return deferred.promise
  })
  .then(function (joined_channel) {
    user.update({ user_id: user_id, channels: {$add: joined_channel.channel_id }},
     function (err, item) {
      if(err) {
        return next(new Error()
          .body = {
            message: 'Error encountered while joining a channel',
            status: 500
        })
      }
      res.send()
    })
  })
});

router.delete('/:name/users', user_scope, (req, res, next) => {

  const hashtag = req.params.name
  const user_id = req.user_id

  user
  .query(user_id)
  .execAsync()
  .then((item) => {
    var deferred = Promise.pending()
    var channel_id_list = item.Items[0].attrs.channels
    deferred.resolve(channel_id_list)
    return deferred.Promise
  })
  .then(function (channel_list) {
    world_channel
    .query(hashtag)
    .filter('users').contains(user_id)
    .execAsync()
    .then((item) => {
      console.log(item)
    })
  })
  
  res.send([]);
});

export default router;