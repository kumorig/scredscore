/**
 * The data-layer for a message wall
 * @module models
 */
var mongoose = require('mongoose');
/**
 * Message schema, contains replies too
 * @constructor Score
 */
var ScoreSchema = new mongoose.Schema({
  created_at  : Date,
  timestamp   : Date,
  username    : {type: String, default: ''},
  tweet_id    : {type: String, default: null},
  score       : Number,
  time        : String,
  completion  : Boolean,
  date        : String,
  profileImage: String,
  tweet       : mongoose.Schema.Types.Mixed
});

module.exports = mongoose.model('Score', ScoreSchema);
