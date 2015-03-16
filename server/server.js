
var Socket = require("./lib/socket.js"),
    Screen = require("./lib/screen.js"),
    Tweets = require("./lib/tweets.js"),
    TwatController = require("./lib/twitterController.js"),
    LocTwit = require("./lib/localTwits.js"),
    config = require("./config.json"),
    debug = require("./lib/debug.js");


var socket = new Socket(config),
    screen = new Screen(config),
    tweets = new Tweets(config),
    locTwit = new LocTwit(config),
    twat = new TwatController(config, screen, socket, tweets, locTwit);



socket.startSocket();
screen.start();
tweets.start();
twat.start();

twat.sendTheTweets();








/*var Twitter = require('twitter'),
    fs = require('fs'),
    Hapi = require('hapi'),
    config = require("./../config.json");
var dbFile = "./tweets.json";
var tweetArray = require(dbFile);
var server = new Hapi.Server();

var tweetindex = 0;
*/

/*
if(false === true) {
    var http = require('http'),
        faye = require('faye');

    var HTTPserver = http.createServer(),
        bayeux = new faye.NodeAdapter({mount: '/faye'});

    bayeux.attach(HTTPserver);
    HTTPserver.listen(8009);

    function sendTweet() {
        if(tweetArray.tweets[tweetindex] !== undefined) {
            bayeux.getClient().publish('/tweet', {
                text: tweetArray.tweets[tweetindex]
            });
            tweetindex++;
        }
        setTimeout(function() {
            sendTweet();
        },5000);
    }
    //sendTweet();

}
*/
/*



if(!config.hapiOff) {
    server.connection({
        port: config.hapiPort
    });

    server.route({
        method: 'GET',
        path: '/{name}',
        handler: function (request, reply) {
            reply.file('public/' + request.params.name);
        }
    });

    server.route({
        method: 'GET',
        path: '/',
        handler: function (request, reply) {
            reply.file('public/index.html');
        }
    });

    server.start(function () {
        console.log("server started on port " + config.hapiPort);
    });
}
if(!config.twitterOff) {

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
}

    */