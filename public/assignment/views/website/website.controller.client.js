(function (){
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController",WebsiteListController)
        .controller("EditWebsiteController",EditWebsiteController)
        .controller("NewWebsiteController",NewWebsiteController);

    // WebsiteListController

    function WebsiteListController(currentUser, $routeParams, WebsiteService) {
        var model = this;

        // model.uid = $routeParams['uid'];
        model.uid = currentUser._id;

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

    function EditWebsiteController(currentUser, $routeParams, WebsiteService, $location) {
        var model = this;

        // model.uid = $routeParams['uid'];
        model.uid = currentUser._id;
        model.wid = $routeParams['wid'];
        model.deleteWebsite= deleteWebsite;
        model.updateWebsite = updateWebsite;

        function init(){
            //model.websites = WebsiteService.findWebsitesByUser(model.uid);
            //model.website = WebsiteService.findWebsiteById(model.wid);
            WebsiteService
                .findWebsitesByUser(model.uid)
                .then(renderWebsites)
            WebsiteService
                .findWebsiteById(model.wid)
                .then(getWebsite)
        }
        init();
        function renderWebsites(websites) {
            model.websites = websites;
        }
        function getWebsite(website) {
            model.website = website;
        }

        function updateWebsite(website) {
            if (website.name === undefined || website.name === null || website.name === "") {
                model.error = "Website Name cannot be empty.";
                return;
            }
            WebsiteService
                .updateWebsite(website._id, website)
                .then(function () {
                    model.message = "website update was successful";
                })
                .then(function () {
                    $location.url("/website")
                });
        }

        function deleteWebsite (website) {
            WebsiteService
                .deleteWebsite(model.wid)
                .then(function () {
                    $location.url("/website")
                });
            // WebsiteService.deleteWebsite(model.wid);
            // $location.url("/user/"+model.uid+"/website");

        }
    }

    // NewWebsiteController

    function NewWebsiteController(currentUser, $routeParams, WebsiteService, $location) {
        var model = this;

        // model.uid = $routeParams['uid'];
        model.uid = currentUser._id;
        model.createWebsite= createWebsite;

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

        function createWebsite (website) {
            if (website.name === undefined || website.name === null || website.name === "") {
                model.error = "Website Name cannot be empty.";
                return;
            }
            return WebsiteService
                    .createWebsite(model.uid, website)
                    .then(function () {
                        $location.url("/website")
                    }
                )
            // website.developerId = model.uid;
            // WebsiteService.createWebsite(website);
            // $location.url("/user/"+model.uid+"/website");
        }


    }


})();