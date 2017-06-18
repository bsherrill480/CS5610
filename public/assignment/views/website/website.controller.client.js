(function() {
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController)
        .controller("NewWebsiteController", NewWebsiteController)
        .controller("EditWebsiteController", EditWebsiteController);

    function WebsiteListController($routeParams, WebsiteService) {
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.websites = WebsiteService.findWebsitesByUser(vm.uid);
    }

    function NewWebsiteController($routeParams, WebsiteService) {
        var vm = this;
        vm.websites = WebsiteService.findWebsitesByUser(vm.uid);
    }

    function EditWebsiteController($routeParams, WebsiteService) {
        var vm = this;
        vm.websites = WebsiteService.findWebsitesByUser(vm.uid);
    }

})();