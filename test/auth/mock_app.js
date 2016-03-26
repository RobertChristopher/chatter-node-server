import express from 'express';
import { admin_scope, user_scope } from '../../lib/auth'
const router = express.Router();

router.get('/admin', admin_scope, function (req, res, next) {
  res.send();
})

router.get('/user', user_scope, function (req, res, next) {
  res.send();
})

export default router;