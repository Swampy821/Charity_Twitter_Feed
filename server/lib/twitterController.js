var debug = require("./debug.js");

function TwatControl(config, screen, socket, tweets, locTwit, options) {
    this.config = config,
        this.screen = screen,
        this.socket = socket,
        this.tweets = tweets,
        this.locTwit = locTwit,
        this.tweetIndex = 0;

    if(options !== undefined &&
        options.track !== undefined) {
        debug("overriding original track option with " + options.track);
        this.config.track = options.track;
    }
}


TwatControl.prototype.start = function() {
    var self = this;
    this.tweets.startTweetStream({
        dataCallback: function(tweet) {
            debug("Collecting tweet " + tweet.text);
            self.locTwit.addTweet(tweet);
        },
        track: this.config.track,
        errorCallback: function(error) {
            debug(error);
        }
    });
};

TwatControl.prototype.sendTheTweets = function() {
    var self = this;
    var tweet = this.locTwit.getTweet(this.tweetIndex);

    if(tweet !== undefined) {
        this.socket.sendTweet(tweet);
        this.tweetIndex++;
    }
    setTimeout(function() {
        self.sendTheTweets();
    }, this.config.tweetDelay);
};




module.exports = TwatControl;