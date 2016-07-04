'use strict';

var vogels = require('vogels'),
    Joi = require('joi');

var schema = {
  hashKey: 'channel_id',
  timestamps: true,
  rangeKey: 'parent_hashtag',
  schema: {
    channel_id: Joi.string(),
    parent_hashtag: Joi.string(),
    channel_creator: Joi.string(),
    people_in_channel: Joi.number(),
  }
};

var Promise = require("bluebird");
var vogels = require("vogels");

Promise.promisifyAll(require('vogels/lib/table').prototype);
Promise.promisifyAll(require('vogels/lib/item').prototype);
Promise.promisifyAll(require('vogels/lib/query').prototype);
Promise.promisifyAll(require('vogels/lib/scan').prototype);
Promise.promisifyAll(require('vogels/lib/parallelScan').prototype);

var vogels_model = vogels.model;
vogels.model = function(name, model){
  if (model) { Promise.promisifyAll(model); }
  return vogels_model.apply(vogels, arguments);
};


module.exports = vogels.define('FriendChannel', schema);
