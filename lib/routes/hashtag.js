import express from 'express';
import hashtagService from '../services/'
import auth from '../auth'
const router = express.Router();

router.get('/', function (req, res, next) {
  res.send([]);
})

router.get('/area', function(req, res, next) {
  res.send([]);
});

router.post('/area', function(req, res, next) {
  res.send([]);
});

router.get('/friends', function(req, res, next) {
  res.send([]);
});

router.post('/friends', function(req, res, next) {
  res.send([]);
});

router.post('/:name/users', function(req, res, next) {
  res.send([]);
});

router.delete('/:name/users', function(req, res, next) {
  res.send([]);
});

export default router;