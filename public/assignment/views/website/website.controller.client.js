(function (){
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController",WebsiteListController)
        .controller("EditWebsiteController",EditWebsiteController)
        .controller("NewWebsiteController",NewWebsiteController);

    // WebsiteListController

    function WebsiteListController($routeParams, WebsiteService) {
        var model = this;

        model.uid = $routeParams['uid'];

        function init() {
            // model.websites = WebsiteService.findWebsitesByUser(model.uid);
            WebsiteService
                .findWebsitesByUser(model.uid)
                .then(renderWebsites)

        }

        init();
        function renderWebsites(websites) {
            model.websites = websites;
        }
    }

    // EditWebsiteController

    function EditWebsiteController($routeParams, WebsiteService, $location) {
        var model = this;

        model.uid = $routeParams['uid'];
        model.wid = $routeParams['wid'];
        model.deleteWebsite= deleteWebsite;

        function init(){
            model.websites = WebsiteService.findWebsitesByUser(model.uid);
            model.website = WebsiteService.findWebsiteById(model.wid);
        }
        init();

        function deleteWebsite () {
            WebsiteService.deleteWebsite(model.wid);
            $location.url("/user/"+model.uid+"/website");
        }
    }

    // NewWebsiteController

    function NewWebsiteController($routeParams, WebsiteService, $location) {
        var model = this;

        model.uid = $routeParams['uid'];
        model.createWebsite= createWebsite;

        function init(){
            model.websites = WebsiteService.findWebsitesByUser(model.uid);
        }
        init();

        function createWebsite (website) {
            website.developerId = model.uid;
            WebsiteService.createWebsite(website);
            $location.url("/user/"+model.uid+"/website");
        }


    }


})();