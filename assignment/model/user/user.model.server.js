var mongoose = require('mongoose');
var userSchema = require('./user.schema.server');
var userModel = mongoose.model('userModel', userSchema);

userModel.createUser = createUser;
userModel.findUserById = findUserById;
userModel.findAllUsers = findAllUsers;
userModel.findUserByUsername = findUserByUsername;
userModel.findUserByCredentials = findUserByCredentials;
userModel.updateUser = updateUser;
userModel.deleteUser = deleteUser;
userModel.addWebsite = addWebsite;
userModel.deleteWebsite = deleteWebsite;

module.exports = userModel;

function createUser(user) {
    return userModel.create(user);
}

function findUserById(userId) {
    return userModel.findById(userId);
}

function findAllUsers() {
    return userModel.find();
}

function findUserByUsername(username) {
    return userModel.findOne({username: username})
}

function findUserByCredentials(username, password) {
    return userModel.findOne({username: username, password: password})
}

function updateUser(userId, newUser) {
    delete newUser.username; //do not allow to update username
    return userModel.update({_id: userId}, {$set: newUser})
}

function deleteUser(userId) {
    return userModel.remove({_id: userId});
}

function addWebsite(userId, websiteId) {
    return userModel
        .findById(userId)
        .then(function (user) {
            user.websites.push(websiteId);
            return user.save(); //save it back to db
        });
}

function deleteWebsite(userId, websiteId) {
    return userModel
        .findOne({_id: userId})
        .then(function(user){
                user.websites.pull(websiteId);
                user.save();
        });
}