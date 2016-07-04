import express from 'express';
import bodyParser from 'body-parser'
import Promise from 'bluebird'
import hashtagService from '../services/'
import { user_scope } from '../auth'
import { basic } from '../auth'
import { friend_channel } from '../models'
import { user } from '../models'
const router = express.Router();

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({extended: true}))

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

router.post('/:name/users', (req, res, next) => {
  res.send([]);
});

router.delete('/:name/users', (req, res, next) => {
  res.send([]);
});

export default router;