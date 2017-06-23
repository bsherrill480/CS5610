(function() {
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController)
        .controller("NewPageController", NewPageController)
        .controller("EditPageController", EditPageController);

    function PageListController($routeParams, PageService) {
        var model = this;

        model.uid = $routeParams['uid'];
        model.wid = $routeParams['wid'];

        function init() {
            model.pages = PageService.findPageByWebsiteId(model.wid);

        }
        init();
    }

    // NewPageController

    function NewPageController($routeParams, $location, PageService) {
        var model = this;

        model.uid = $routeParams['uid'];
        model.wid = $routeParams['wid'];
        model.createPage = createPage

        function createPage(page) {
            page.websiteId = model.wid;
            PageService.createPage(model.wid,page);
            $location.url("/user/" + model.uid + "/website/" + model.wid + "/page");
        }
    }

    // EditPageController


    function EditPageController($routeParams, $location, PageService) {
        var model = this;

        model.uid = $routeParams['uid'];
        model.wid = $routeParams['wid'];
        model.pid = $routeParams['pid'];
        model.deletePage= deletePage;

        function init() {
            // model.pages = PageService.findPageByWebsiteId(model.wid);
            model.page = PageService.findPageById(model.pid);
        }
        init();

        function deletePage () {
            PageService.deletePage(model.pid);
            $location.url("/user/"+model.uid+"/website/"+model.wid+"/page");
        }
    }
})();