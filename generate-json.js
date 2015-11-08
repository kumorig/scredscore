// Database stuff
var mongoose = require('mongoose');
var moment = require('moment');
var async = require('async');
var fs = require('fs');
mongoose.connect('mongodb://localhost/scredscore');
var Score = require('./model-score.js');

/**
 * First we'll process unprocessed tweets (those without a tweet id).
 */
Score.find({'tweet_id': null}, function (err, scores) {
    async.mapSeries(
        scores,
        function (score, cb) {
            var msg = score.tweet.text;
            score.tweet_id = score.tweet.id_str;
            score.username = score.tweet.user.screen_name;
            score.profileImage = score.tweet.user.profile_image_url;
            score.time = msg.match(/\[Time:\s(.+?)]/)[1];
            score.completion = (msg.match(/\[Completion:\s(.+)]/)[1] === 'true');
            score.date = msg.match(/\[Date:\s(.+?)]/)[1];
            score.timestamp = moment(score.tweet.timestamp).toISOString();
            var scorematches = msg.match(/\n(\d+)\n/);
            if (scorematches == null)
                scorematches = msg.match(/\n(\d+)\s?/);
            score.score = scorematches[0];
            score.save(function (err, saved) {
                if (err) {
                    console.log("Error while saving!", err);
                    cb(err);
                } else {
                    console.log("Processed and saved!!");
                    cb(null);
                }
            });
        },
        function (err, results) {
            if (err) {
                console.log("Errors:", err);
            }
            /**
             * Next we find all tweets, group by date, sort by score.
             */

            Score.aggregate([
                    {
                        $project: {
                            date: 1,
                            username: 1,
                            tweet_id: 1,
                            profileImage: 1,
                            completion: 1,
                            timestamp: 1,
                            score: 1,
                            time: 1,
                            scores: 1
                        }
                    },
                    {
                        $sort: {
                            score: -1
                        }
                    },
                    {
                        "$group": {
                            "_id": {date: '$date'},
                            scores: {$push: "$$ROOT"},
                            total_value: {$sum: "$score"},
                            avg_value: {$avg: "$score"}
                        }
                    }
                ],
                function (err, aggregated) {
                    async.sortBy(aggregated, function (a, cb) {
                        cb(null, -moment(a._id.date,"YYYY-M-D").valueOf());
                    }, function (err, sorted) {
                        fs.writeFile('html/scores.json',
                            JSON.stringify(sorted, null, 4),
                            function (err) {
                                if (err) {
                                    console.log("Error:", err);
                                }
                                process.exit();
                            });
                    });

                }
            );
        }
    );
});
