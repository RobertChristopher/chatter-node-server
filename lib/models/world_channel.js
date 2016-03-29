'use strict';

var vogels = require('vogels'),
    Joi = require('joi');

var schema = {
  hashKey: 'channel_id',
  timestamps: true,

  schema: {
    channel_id: Joi.string(),
    parent_hashtag: Joi.string()
  },
  indexes : [{
    hashkey : 'parent_hashtag', rangekey : 'channel_id', type : 'local', name : 'ParentIndex'
  }]
};

module.exports = vogels.define('WorldChannel', schema);
