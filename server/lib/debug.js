var rootConfig = require("../config.json");

function debug(message) {
    if(rootConfig.debug) {
        console.log(message);
    }
}





module.exports = debug;

