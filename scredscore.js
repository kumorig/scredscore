// Twitter stuff
var Twit = require('twit');
var config = require('./config-local.js');
var T = new Twit(config.twitter_config);
var stream = T.stream('statuses/filter', {track: '#dailyQuarry'});

// Database stuff
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/scredscore');

var Score = require('./model-score.js');

stream.on('tweet', function (tweet) {
  var score = new Score;
  score.tweet = tweet;
  score.markModified('tweet');
  score.save(function (err, saved) {
    console.log("Saved tweet!", saved);
  });
});
