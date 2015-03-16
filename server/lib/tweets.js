var Twitter = require("twitter"),
    fs = require("fs"),
    debug = require("./debug.js");


function tweets(config) {
    this.config = config;
}


tweets.prototype.start = function() {
    this.client = new Twitter({
        consumer_key: this.config.twitter.consumerKey,
        consumer_secret: this.config.twitter.consumerSecret,
        access_token_key: this.config.twitter.accessTokenKey,
        access_token_secret: this.config.twitter.accessTokenSecret
    });
    debug("Connected to twitter API");
};

tweets.prototype.startTweetStream = function(obj) {
    debug("Starting twitter stream");
    this.client.stream('statuses/filter', {track: obj.track}, function (stream) {
        if(typeof obj.dataCallback === "function") {
            debug("Setting data callback");
            stream.on('data', function (tweet) {
                obj.dataCallback(tweet);
            });
        }
        if(typeof obj.errorCallback === "function") {
            debug("Setting error callback");
            stream.on('error', function (error) {
                obj.errorCallback(error);
            });
        }
    });
}


module.exports = tweets;


/*
var client = new Twitter({
    consumer_key: config.twitter.consumerKey,
    consumer_secret: config.twitter.consumerSecret,
    access_token_key: config.twitter.accessTokenKey,
    access_token_secret: config.twitter.accessTokenSecret
});

client.stream('statuses/filter', {track: config.track}, function (stream) {
    stream.on('data', function (tweet) {
        if(tweet.text!=='null') {
            //console.log("TWEET: " + tweet.text);
            // tweetArray.tweets.push(tweet);
            tweet.count = tweetindex;
            bayeux.getClient().publish('/tweet', {
                text: tweet
            });
            tweetindex++;
            // fs.writeFile(dbFile, JSON.stringify(tweetArray));
        }
    });

    stream.on('error', function (error) {
        console.log(error);
    });
});
*/