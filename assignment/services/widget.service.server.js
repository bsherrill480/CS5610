module.exports = function(app){

    var widgets =
        [
            {"_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
            {"_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            {
                "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
                "url": "http://lorempixel.com/400/200/"
            },
            {"_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
            {"_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            {
                "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
                "url": "https://youtu.be/AM2Ivdi9c4E"
            },
            {"_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
        ];



    app.post("/api/page/:pid/widget", createWidget);
    app.get("/api/page/:pid/widget", findAllWidgetsForPage);
    app.get("/api/widget/:wgid", findWidgetById);
    app.put("/api/widget/:wgid", updateWidget);
    app.delete("/api/widget/:wgid", deleteWidget);

    function findAllWidgetsForPage(req, res) {
        var pid = req.params.pid;
        var results = [];
        for (wi in widgets) {
            var widget = widgets[wi];
            if (parseInt(widget.pageId) === parseInt(pid)) {
                results.push(widget);
            }
        }
        res.send(results);
    }

    function createWidget(req, res) {
        var widget = req.body;
        var pageId = req.params.pid;

        var createWidgetMap = {
            'HEADING': createHeaderWidget,
            'IMAGE': createImageWidget,
            'YOUTUBE': createYouTubeWidget,
            'HTML': createHTMLWidget,
            'LINK': createLinkWidget,
            'TEXTINPUT': createTextInputWidget,
            'LABEL': createLabelWidget,
            'BUTTON': createButtonWidget,
            'REPEATER': createRepeaterWidget,
            'DATATABLE': createDataTableWidget
        };

        function createHeaderWidget(widgetId, pageId, widget) {
            return {
                _id: widgetId,
                widgetType: 'HEADING',
                pageId: pageId,
                size: widget.size,
                name: widget.name,
                text: widget.text
            };
        }

        function createLabelWidget(widgetId, pageId, widget) {
        }

        function createHTMLWidget(widgetId, pageId, widget) {
            return {
                _id: widgetId,
                widgetType: 'HTML',
                pageId: pageId,
                name: widget.name,
                text: widget.text
            };
        }

        function createTextInputWidget(widgetId, pageId, widget) {

        }

        function createLinkWidget(widgetId, pageId, widget) {

        }

        function createButtonWidget(widgetId, pageId, widget) {

        }

        function createImageWidget(widgetId, pageId, widget) {
            return {
                _id: widgetId,
                widgetType: 'IMAGE',
                pageId: pageId,
                width: widget.width,
                url: widget.url,
                name: widget.name,
                text: widget.text
            };

        }

        function createYouTubeWidget(widgetId, pageId, widget) {
            return {
                _id: widgetId,
                widgetType: 'YOUTUBE',
                pageId: pageId,
                name: widget.name,
                text: widget.text,
                width: widget.width,
                url: widget.url
            };

        }

        function createDataTableWidget(widgetId, pageId, widget) {

        }

        function createRepeaterWidget(widgetId, pageId, widget) {

        }

        var newWidgetId = (new Date()).getTime() + "";
        var newWidget = createWidgetMap[widget.widgetType](newWidgetId, pageId, widget);
        widgets.push(newWidget);


        if(newWidget){
            res.status(200).send(newWidget);
        } else {
            res.sendStatus(500);
        }
    }

    function findWidgetById(req, res) {

        for (wg in widgets) {
            var widget = widgets[wg];
            if (parseInt(widgets[wg]._id) === parseInt(req.params.wgid)) {
                res.json(widget);
            }
        }
        res.sendStatus(404);

    }

    function updateWidget(req, res) {
        var wgid = req.params.wgid;
        var widget = req.body;

        for (wg in widgets) {
            if (parseInt(widgets[wg]._id) === parseInt(wgid)) {
                // if (widgets[wi].widgetType != widget.widgetType) {
                //     res.sendStatus(404);
                // }
                widgets[wg].name=widget.name;
                widgets[wg].text=widget.text;
                widgets[wg].size=widget.size;
                widgets[wg].widgetType != widget.widgetType
                widgets[wg].width=widget.width;
                widgets[wg].url=widget.url;
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(404);

        // var oldWidget = findWidgetById(widgetId);
        // var index = widgets.indexOf(oldWidget);
        // if (oldWidget.widgetType != widget.widgetType) {
        //     return;
        // }
        // Object.keys(widget).forEach(function (property) {
        //     if (property === '_id' || property === 'widgetType' || property === 'pageId') {
        //         return;
        //     }
        //     if (oldWidget.hasOwnProperty(property)) {
        //         oldWidget[property] = widget[property];
        //     }
        // });
    }

    function deleteWidget(req, res) {
        var wgid = req.params.wgid;
        for (wg in widgets) {
            if (parseInt(widgets[wg]._id) === parseInt(wgid)) {
                widgets.splice(wg, 1);
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(404);
    }
}