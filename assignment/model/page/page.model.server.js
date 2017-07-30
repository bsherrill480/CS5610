var mongoose = require('mongoose');
var pageSchema = require('./page.schema.server');
var pageModel = mongoose.model('pageModel', pageSchema);
var websiteModel = require('../website/website.model.server');

pageModel.createPage = createPage;
pageModel.findAllPagesForWebsite = findAllPagesForWebsite;
pageModel.findPageById = findPageById;
pageModel.updatePage = updatePage;
pageModel.deletePage = deletePage;
pageModel.addWidgetToPage = addWidgetToPage;
pageModel.deleteWidgetToPage = deleteWidgetToPage;


module.exports = pageModel;

function deleteWidgetToPage(pageId, widgetId) {
    return pageModel
        .findOne({_id: pageId})
        .then(function (page) {
            page.widgets.pull(widgetId);
            // page.widgets.remove(widgetId);
            return page.save();
        })
}

function addWidgetToPage(pageId, widgetId) {
    return pageModel
        .findById(pageId)
        .then(function (page) {
            page.widgets.push(widgetId);
            return page.save();
        })
}

function updatePage(pageId, newPage) {
    return pageModel.update({_id: pageId}, {name: newPage.name, title: newPage.title, description: newPage.description})

}

function deletePage(pageId) {

    pageModel
        .findOne({_id: pageId})
        .then(function (page) {
            var websiteId = page._website;
            console.log("websiteId: " + websiteId);
            websiteModel
                .deletePage(websiteId, pageId)
                .then(function (result) {
                    return pageModel
                        .remove({_id: pageId});
                });
        });

    return null;
}

function findPageById(pageId) {
    return pageModel
        .findOne({_id: pageId})
}

function findAllPagesForWebsite(websiteId) {
    return pageModel
        .find({_website: websiteId})
        .populate('_website')
        .exec();
}

function createPage(websiteId, page) {
    page._website = websiteId;
    return pageModel
        .create(page)
        .then(function (page) {
            return websiteModel
                .addPage(websiteId, page._id);
        })
}