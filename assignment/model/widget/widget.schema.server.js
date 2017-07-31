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
    placeholder : {type: String, default: "placeholder"},
    description : {type: String, default: "description"},
    url : {type: String, default: "url"},
    width : {
        type : Number,
        default : 100,
        max : 100,
        min : 0
    },
    height : {type: Number, default: 10},
    rows : {type: Number, default: 0},
    size : {
        type : Number,
        default : 1
    },
    class : {type: String, default: "class"},
    icon : {type: String, default: "icon"},
    deletable : {type : Boolean, default : true},
    formatted : {type: Boolean, default: false},
    dateCreated : {
        type : Date,
        default: Date.now
    }
}, {collection : 'widget'});
module.exports = widgetSchema;