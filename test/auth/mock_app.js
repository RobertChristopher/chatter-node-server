import express from 'express';
import { basic, user } from '../../lib/auth'
const router = express.Router();

router.get('/admin', basic, function (req, res, next) {
  res.send([]);
})

router.get('/user', user, function (req, res, next) {
  res.send([]);
})

export default router;