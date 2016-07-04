'use strict';

var vogels = require('vogels'),
    Joi = require('joi');

var schema = {
  hashKey: 'parent_hashtag',
  rangeKey: 'channel_id',
  timestamps: true,
  schema: {
    channel_id: vogels.types.uuid(),
    parent_hashtag: Joi.string(),
    users_present: Joi.number(),
    users: vogels.types.stringSet()
  }
  ,
  indexes : [{
    hashKey: 'parent_hashtag', rangeKey : 'users_present', type : 'local', name : 'PublishedIndex'
  }]

};

module.exports = vogels.define('WorldChannel', schema);
