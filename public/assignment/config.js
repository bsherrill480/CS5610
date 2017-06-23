(function(){
    angular
        .module("WebAppMaker")
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
        /*            .when('/', {
         templateUrl : "/views/user/login.view.client.html",
         controller: "LoginController",
         controllerAs: "model"
         })*/
            .when('/register', {
                templateUrl : "views/user/register.view.client.html",
                controller: "RegisterController",
                controllerAs: "model"
            })
            .when('/login', {
                templateUrl : "views/user/login.view.client.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            // #!/user/{{model.uid}}
            .when('/user/:uid', {
                templateUrl : "views/user/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model"
            })
            //#!/user/{{model.uid}}/website
            .when('/user/:uid/website', {
                templateUrl : "views/website/website-list.view.client.html",
                controller: "WebsiteListController",
                controllerAs: "model"
            })
            //#!/user/{{model.uid}}/website/new
            .when('/user/:uid/website/new', {
                templateUrl : "views/website/website-new.view.client.html",
                controller: "NewWebsiteController",
                controllerAs: "model"
            })
            //#!/user/{{model.uid}}/website/{{model.wid}}
            .when('/user/:uid/website/:wid', {
                templateUrl : "views/website/website-edit.view.client.html",
                controller: "EditWebsiteController",
                controllerAs: "model"
            })
            // #!/user/{{model.uid}}/website/{{model.wid}}/page
            .when('/user/:uid/website/:wid/page', {
                templateUrl: "views/page/page-list.view.client.html",
                controller: "PageListController",
                controllerAs: "model"
            })
            // #!/user/{{model.uid}}/website/{{model.wid}}/page/new
            .when('/user/:uid/website/:wid/page/new', {
                templateUrl : "views/page/page-new.view.client.html",
                controller: "NewPageController",
                controllerAs: "model"
            })
            // #!/user/{{model.uid}}/website/{{model.wid}}/page/{{model.pid}}
            .when('/user/:uid/website/:wid/page/:pid', {
                templateUrl : "views/page/page-edit.view.client.html",
                controller: "EditPageController",
                controllerAs: "model"
            })
            // #!/user/{{model.uid}}/website/{{model.wid}}/page/{{model.pid}}/widget
            .when('/user/:uid/website/:wid/page/:pid/widget', {
                templateUrl : "views/widget/widget-list.view.client.html",
                controller: "WidgetListController",
                controllerAs: "model"
            })
            // #!/user/{{model.uid}}/website/{{model.wid}}/page/{{model.pid}}/widget/new
            .when('/user/:uid/website/:wid/page/:pid/widget/new', {
                templateUrl : "views/widget/widget-chooser.view.client.html",
                controller: "NewWidgetController",
                controllerAs: "model"
            })
            // #!/user/{{model.uid}}/website/{{model.wid}}/page/{{model.pid}}/widget/create/{{model.wtype}}
            .when('/user/:uid/website/:wid/page/:pid/widget/create/:wtype', {
                templateUrl : "views/widget/widget-new.view.client.html",
                controller: "CreateWidgetController",
                controllerAs: "model"
            })
            // #!/user/{{model.uid}}/website/{{model.wid}}/page/{{model.pid}}/widget/{{model.wgid}}
            .when('/user/:uid/website/:wid/page/:pid/widget/:wgid', {
                templateUrl : "views/widget/widget-edit.view.client.html",
                controller: "EditWidgetController",
                controllerAs: "model"
            })
            .otherwise({
                redirectTo : "/login"
            });
    }
})();