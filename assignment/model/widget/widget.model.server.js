var mongoose = require('mongoose');
var widgetSchema = require('./widget.schema.server');
var widgetModel = mongoose.model('widgetModel', widgetSchema);
var pageModel = require('../page/page.model.server');

widgetModel.createWidget = createWidget;
widgetModel.findAllwidgetsForPage = findAllwidgetsForPage;
widgetModel.findWidgetById = findWidgetById;
widgetModel.updateWidget = updateWidget;
widgetModel.deleteWidget = deleteWidget;
widgetModel.reorderWidget = reorderWidget;

module.exports = widgetModel;

function reorderWidget(pageId, start, end) {
    return pageModel
        .findPageById(pageId)
        .then(
            function (page) {

                if (start && end) {
                    // console.log("come into if condition");
                    if (end >= page.widgets.length) {
                        var k = end - page.widgets.length;
                        while ((k--) + 1) {
                            page.widgets.push(undefined);
                        }
                    }
                    page.widgets.splice(end, 0, page.widgets.splice(start, 1)[0]);

                    // console.log(page.widgets);
                    return page.save();
                }
            }
        )
}

function deleteWidget(widgetId) {
    return widgetModel
        .remove({_id: widgetId});
}

function updateWidget(widgetId, widget) {
    return widgetModel.update({_id: widgetId},
        {   name: widget.name,
            text: widget.text,
            placeholder: widget.placeholder,
            description: widget.description,
            url: widget.url,
            width: widget.width,
            size: widget.size,
            rows: widget.rows,
            formatted: widget.formatted
        })

}

function findWidgetById(widgetId) {
    return widgetModel
        .findOne({_id: widgetId})
}

function findAllwidgetsForPage(pageId) {
    return widgetModel
        .find({_page: pageId})
        .populate('_page')
        .exec();
}

function createWidget(pageId, widget) {

    widget._page = pageId;

    return widgetModel
        .create(widget)
        .then(function (widget) {
            return pageModel
                .addWidgetToPage(pageId, widget._id);
        });
}
