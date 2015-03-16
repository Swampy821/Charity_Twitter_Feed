(function() {

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }





    $(document).ready(function() {


        var turn = 180;
        function updateText(tweet) {
            var tweetText = tweet.text;
            var tweeterImg = tweet.user.profile_image_url;
            var h = $(window).height();
            var w = $(window).width();

            h -= 220;
            w -= 470;
            function mySideChange() {
                $('.tweet');
                $('.tweet > .the-tweet').text(tweetText);
                $('.tweet > .user > img').attr('src',tweeterImg);
                $('.tweet > .user > .name').text('@' + tweet.user.screen_name);
                $('.tweet').css('top',getRandomInt(20, h)).css('left',getRandomInt(20,w));

            }

            $('.tweet').fadeOut(2000, function() {
                mySideChange();
            }).fadeIn(2000);
        }
        var client = new Faye.Client('http://localhost:8009/faye');

        var subscription = client.subscribe('/tweet', function(message) {
            updateText(message.tweet);
        });
    });
})();