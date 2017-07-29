var mongoose = require('mongoose');

module.exports = function(app){

    require("./model/models.server")(mongoose);


    require("./services/user.service.server.js")(app);
    require("./services/website.service.server.js")(app);
    require("./services/page.service.server")(app);
    require("./services/widget.service.server")(app);
};