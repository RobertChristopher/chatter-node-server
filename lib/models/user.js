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
    user_id: Joi.string(),
    channels: vogels.types.stringSet(),
    friends: vogels.types.stringSet(),
  }
};

module.exports = vogels.define('User', schema);
