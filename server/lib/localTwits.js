var debug = require("./debug.js"),
    fs = require("fs");


function LocTwit(config) {
    this.config = config,
    this.twitFile = this.config.twitter.tempFile;

    this.createTweetsFile();

    this.tweetObj = require("../" + this.twitFile);

}

LocTwit.prototype.createTweetsFile = function() {
    debug("Checking if tweets file exists");
    if(!fs.existsSync(this.twitFile)) {
        fs.writeFileSync(this.twitFile, JSON.stringify({"tweets":[]}));
        debug("Created file " + this.twitFile);
    }else{
        debug("Tweets file already exists");
    }
};

LocTwit.prototype.writeTwitFile = function() {
    debug("writing tweet file");
    fs.writeFileSync(this.twitFile, JSON.stringify(this.tweetObj));
};


LocTwit.prototype.addTweet = function(tweet, dontWriteFile) {
    debug("writing tweet to tweet array");
    this.tweetObj.tweets.push(tweet);
    if(!dontWriteFile) {
        this.writeTwitFile();
    }
};


LocTwit.prototype.find = function(options) {
    var tweets = this.tweetObj.tweets;
    if(options.id !== undefined) {
        for(var i=0; i<tweets; i++) {
            if(tweets[i].id === options.id) {
                return {
                    index: i,
                    tweet: tweets[i]
                };
            }
        }
    }
};


LocTwit.prototype.approve = function(id) {
    var foundTweet = this.find({id:id});
    if(foundTweet !== undefined) {
        this.tweetsObj.tweets[foundTweet.index].approved = true;
        this.writeTwitFile();
        return foundTweet.tweet;
    }else{
        debug("No tweet found for id " + id);
        return false;
    }
};





LocTwit.prototype.getTweet = function(index) {
    return this.tweetObj.tweets[index];
};







module.exports = LocTwit;