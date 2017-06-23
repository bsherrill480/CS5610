(function () {
    angular
        .module("WebAppMaker")
        .service('WidgetService', WidgetService);

    function WidgetService() {
        this.findWebsitesByUser = findWebsitesByUser;
        this.findWebsiteById = findWebsiteById;
        this.deleteWebsite = deleteWebsite;
        this.createWebsite = createWebsite;
        this.findAllWidgets = findAllWidgets;

        var widgets =
            [
                { "_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
                { "_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
                { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
                    "url": "http://lorempixel.com/400/200/"},
                { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
                { "_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
                { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
                    "url": "https://youtu.be/AM2Ivdi9c4E" },
                { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
            ];


        function findAllWidgets(pid) {
            return widgets;
        }

        function findWebsitesByUser(uid){
            var results = [];

            for(var v in websites){
                if(websites[v].developerId === uid){
                    results.push(websites[v]);
                }
            }

            return results;
        }

        function findWebsiteById(wid) {
            for (w in websites){
                var website = websites[w];
                if(parseInt(website._id) === parseInt(wid)){
                    return website;
                }
            }
            return null;
        }

        function deleteWebsite(wid) {
            for(var w in websites){
                if(websites[w]._id === wid){
                    websites.splice(w, 1);
                }
            }
        }

        function createWebsite(website) {
            website._id = (new Date()).getTime() + "";
            websites.push(website);
        }
    }
})();