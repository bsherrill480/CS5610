module.exports = function(mongoose) {
    var connectionString =  null;

    console.log("heroku env: " + process.env.MONGODB_URI);

    if (process.env.MONGODB_URI) {
        connectionString = 'mongodb://cs5610_dev:cs5610@ds147821.mlab.com:47821/heroku_h7rf48jn';
    }
    else
    {
        connectionString = 'mongodb://localhost:27017/cs5610_webdev'
    }

    mongoose.connect(connectionString, {useMongoClient: true});
    mongoose.Promise = require('q').Promise;

    var userModel = require("./user/user.model.server.js")(mongoose);
    var websiteModel = require("./website/website.model.server.js")(mongoose, userModel);
    var pageModel =  require("./page/page.model.server.js")(mongoose, websiteModel);
    var widgetModel = require("./widget/widget.model.server.js")(mongoose, pageModel);

    var models = {
        'userModel' : userModel,
        'websiteModel' : websiteModel,
        'pageModel' : pageModel,
        'widgetModel' : widgetModel
    };

    return models;
};

console.log("models.server.js is running");
