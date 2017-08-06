var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    username : {type : String, required : true, unique: true},
    password : {type : String, required : true},
    firstName : String,
    lastName : String,
    google: {
        id:    String,
        token: String
    },
    roles: [{type: String, default: "USER", enum: ['USER', 'ADMIN']}],

    email : String,
    phone : String,
    websites : [{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'websiteModel'
    }],
    dateCreated : {
        type : Date,
        default: Date.now
    }
}, {collection: 'user'});

module.exports = userSchema;
