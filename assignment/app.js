var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/cs5610_webdev');
mongoose.Promise = require('q').Promise;
module.exports = function(app){

    require("./services/user.service.server.js")(app);
    require("./services/website.service.server.js")(app);
    require("./services/page.service.server")(app);
    require("./services/widget.service.server")(app);
};