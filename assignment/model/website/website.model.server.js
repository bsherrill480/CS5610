var mongoose = require('mongoose');
var websiteSchema = require('./website.schema.server');
var websiteModel = mongoose.model('websiteModel', websiteSchema);
var userModel = require('../user/user.model.server');
websiteModel.findAllWebsites = findAllWebsites;
websiteModel.createWebsite = createWebsite;
websiteModel.findWebsitesByUser = findWebsitesByUser;
websiteModel.deleteWebsite = deleteWebsite;
websiteModel.findWebsiteById = findWebsiteById;
websiteModel.updateWebsite = updateWebsite;

module.exports = websiteModel;

function updateWebsite(websiteId, newWebsite) {
    return websiteModel.update({_id: websiteId}, {name: newWebsite.name, description: newWebsite.description})
}


function findWebsiteById(websiteId) {
    return websiteModel
        .findOne({_id: websiteId})
}

function findAllWebsites() {
    return websiteModel.find();
}

function createWebsite(userId, website) {
    website._user = userId;
    return websiteModel
        .create(website)
        .then(function (website) {
            return userModel
                .addWebsite(userId, website._id);
        })
}

function findWebsitesByUser(userId) {
    return websiteModel
        .find({_user: userId})
        .populate('_user')
        .exec();
}

function deleteWebsite(websiteId) {
    return websiteModel
        .remove({_id: websiteId})
}