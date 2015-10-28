var Twit = require('twit');
var config = require('./config.js');
var T = new Twit(config.twitter_config);
var stream = T.stream('statuses/filter', { track: '#dailyQuarry' })

stream.on('tweet', function (tweet) {
  console.log(tweet)
});
