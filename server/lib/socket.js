var debug = require("./debug.js"),
    faye =require("faye"),
    http = require("http");

function socket(config) {
    this.config = config;
    debug("Socket instantiated");
    this.HTTPserver = http.createServer(),
        this.bayeux = new faye.NodeAdapter({mount: '/faye'});
}


socket.prototype.startSocket = function() {
    this.bayeux.attach(this.HTTPserver);
    this.HTTPserver.listen(this.config.ports.faye);
    debug("Socket server started on port " + this.config.ports.faye);
};


socket.prototype.sendTweet = function(tweet) {
    this.bayeux.getClient().publish('/tweet', {
        tweet: tweet
    });
    debug("sent tweet " + tweet.text);
};

socket.prototype.sendApproval = function(tweet) {
    this.bayeux.getClient().publish('/approve', { tweet: tweet});
    debug("Sent tweet " + tweet.text + " for approval.")
};



module.exports = socket;