var mongoose = require('mongoose');

var pageSchema = mongoose.Schema({
    _website : {type : mongoose.Schema.Types.ObjectId, ref : 'websiteModel'},
    name : {type : String, required : true},
    title : String,
    description : String,
    // widgets : [{
    //     type : mongoose.Schema.Types.ObjectId,
    //     ref : 'widgetModel'
    // }],
    dateCreated : {
        type : Date,
        default: Date.now
    }
}, {collection : 'page'});

module.exports = pageSchema;