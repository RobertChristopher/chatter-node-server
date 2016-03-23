'use strict';

var vogels = require('vogels'),
    Joi = require('joi');

var schema = {
  hashKey: 'user_id',
  timestamps: true,

  schema: {
    twitter_oauth_token: Joi.string(),
    user_id: Joi.string().email(),
    channels: Joi.array().includes(Joi.object().keys({
      channel_id: Joi.number(),
      parent_hashtag: Joi.string()
    }))
  }
};

module.exports = vogels.define('User', schema);
