'use strict';

var vogels = require('vogels'),
    Joi = require('joi');

var schema = {
  hashKey: 'user_id',
  timestamps: true,

  schema: {
    twitter_oauth_token: Joi.string(),
    twitter_oauth_token_secret: Joi.string(),
    twitter_username: Joi.string(),
    user_id: Joi.number(),
    channels: Joi.array().includes(Joi.object().keys({
      channel_id: Joi.number(),
      parent_hashtag: Joi.string()
    })),
    friends: Joi.array().includes(Joi.object().keys({
      user_id: Joi.number()
    }))
  }
};

module.exports = vogels.define('User', schema);
