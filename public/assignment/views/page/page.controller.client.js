(function() {
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController)
        .controller("NewPageController", NewPageController)
        .controller("EditPageController", EditPageController);

    function PageListController(currentUser, $routeParams, PageService) {
        var model = this;

        // model.uid = $routeParams['uid'];
        model.uid = currentUser._id;
        model.wid = $routeParams['wid'];

        function init() {
            // model.pages = PageService.findPageByWebsiteId(model.wid);
             PageService
                 .findPageByWebsiteId(model.wid)
                 .then(renderPage)

        }
        init();
        function renderPage(pages) {
            model.pages = pages;
        }
    }

    // NewPageController

    function NewPageController(currentUser, $routeParams, $location, PageService) {
        var model = this;

        // model.uid = $routeParams['uid'];
        model.uid = currentUser._id;
        model.wid = $routeParams['wid'];
        model.createPage = createPage

        function createPage(page) {
            // page.websiteId = model.wid;
            // PageService.createPage(model.wid,page);
            // $location.url("/user/" + model.uid + "/website/" + model.wid + "/page");
            PageService
                .createPage(model.wid,page)
                .then(function () {
                    $location.url("/website/" + model.wid + "/page")
                })
        }
    }

    // EditPageController


    function EditPageController(currentUser, $routeParams, $location, PageService) {
        var model = this;

        // model.uid = $routeParams['uid'];
        model.uid = currentUser._id;
        model.wid = $routeParams['wid'];
        model.pid = $routeParams['pid'];
        model.deletePage= deletePage;
        model.updatePage = updatePage;

        function init() {
            // model.pages = PageService.findPageByWebsiteId(model.wid);
            //model.page = PageService.findPageById(model.pid);
            PageService
                .findPageById(model.pid)
                .then(renderPage)
        }
        init();
        function renderPage(page) {
            model.page = page;
        }

        function updatePage(page) {
            PageService
                .updatePage(page._id, page)
                .then(function () {
                    model.message = "page update was successful";
                })
                .then(function () {
                    $location.url("/website/" + model.wid + "/page");
                });
        }

        function deletePage () {
            PageService
                .deletePage(model.pid)
                .then(function () {
                    $location.url("/website/"+model.wid+"/page")
                })



            // PageService.deletePage(model.pid);
            // $location.url("/user/"+model.uid+"/website/"+model.wid+"/page");
        }
    }
})();