var Hapi = require("hapi"),
    debug = require("./debug.js");

function screen(config) {
    this.config = config;
}

screen.prototype.addRoutes = function(server) {
    debug("Adding routes to screen server");
    server.route({
        method: 'GET',
        path: '/{name}',
        handler: function (request, reply) {
            reply.file('./../public/' + request.params.name);
        }
    });

    server.route({
        method: 'GET',
        path: '/',
        handler: function (request, reply) {
            reply.file('./../public/index.html');
        }
    });

    return server;
};


screen.prototype.start = function() {
    var server = new Hapi.Server(),
        self = this;
    debug("Starting screen http server on port " + this.config.ports.screen);

    server.connection({
        port: this.config.ports.screen
    });

    server = this.addRoutes(server);


    server.start(function() {
        debug("Screen server started on port " + self.config.ports.screen);
    });

};




module.exports = screen;