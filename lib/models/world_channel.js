'use strict';

var vogels = require('vogels'),
    Joi = require('joi');

var schema = {
  hashKey: 'channel_id',
  timestamps: true,

  schema: {
    channel_id: Joi.string(),
    parent_hashtag: Joi.string(),
    people_in_channel: Joi.number()
  }
};

module.exports = vogels.define('WorldChannel', schema);
