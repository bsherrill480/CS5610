var mongoose = require('mongoose');

var widgetSchema = mongoose.Schema({
    _page : {type : mongoose.Schema.Types.ObjectId, ref : 'pageModel'},
    widgetType : {
        type : String,
        uppercase : true,
        enum : ['HEADING', 'IMAGE', 'YOUTUBE', 'HTML', 'TEXT']
    },
    name : String,
    text : String,
    placeholder : String,
    description : String,
    url : String,
    width : {
        type : Number,
        default : 100,
        max : 100,
        min : 0
    },
    height : Number,
    rows : Number,
    size : {
        type : Number,
        default : 1
    },
    class : String,
    icon : String,
    deletable : {type : Boolean, default : true},
    formatted : Boolean,
    dateCreated : {
        type : Date,
        default: Date.now
    }
}, {collection : 'widget'});

module.exports = widgetSchema;