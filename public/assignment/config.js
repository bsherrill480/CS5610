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
            .when('/admin', {
                templateUrl : "views/user/admin.view.client.html",
                resolve: {
                    currentUser: checkAdmin
                }
            })
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
            .when('/profile', {
                templateUrl : "views/user/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model",
                resolve:{
                    currentUser:checkLoggedIn
                }
            })
            //#!/user/{{model.uid}}/website
            .when('/website', {
                templateUrl : "views/website/website-list.view.client.html",
                controller: "WebsiteListController",
                controllerAs: "model",
                resolve:{
                    currentUser:checkLoggedIn
                }
            })
            //#!/user/{{model.uid}}/website/new
            .when('/website/new', {
                templateUrl : "views/website/website-new.view.client.html",
                controller: "NewWebsiteController",
                controllerAs: "model",
                resolve:{
                    currentUser:checkLoggedIn
                }
            })
            //#!/user/{{model.uid}}/website/{{model.wid}}
            .when('/website/:wid', {
                templateUrl : "views/website/website-edit.view.client.html",
                controller: "EditWebsiteController",
                controllerAs: "model",
                resolve:{
                    currentUser:checkLoggedIn
                }
            })
            // #!/user/{{model.uid}}/website/{{model.wid}}/page
            .when('/website/:wid/page', {
                templateUrl: "views/page/page-list.view.client.html",
                controller: "PageListController",
                controllerAs: "model",
                resolve:{
                    currentUser:checkLoggedIn
                }
            })
            // #!/user/{{model.uid}}/website/{{model.wid}}/page/new
            .when('/website/:wid/page/new', {
                templateUrl : "views/page/page-new.view.client.html",
                controller: "NewPageController",
                controllerAs: "model",
                resolve:{
                    currentUser:checkLoggedIn
                }
            })
            // #!/user/{{model.uid}}/website/{{model.wid}}/page/{{model.pid}}
            .when('/website/:wid/page/:pid', {
                templateUrl : "views/page/page-edit.view.client.html",
                controller: "EditPageController",
                controllerAs: "model",
                resolve:{
                    currentUser:checkLoggedIn
                }
            })
            // #!/user/{{model.uid}}/website/{{model.wid}}/page/{{model.pid}}/widget
            .when('/website/:wid/page/:pid/widget', {
                templateUrl : "views/widget/widget-list.view.client.html",
                controller: "WidgetListController",
                controllerAs: "model",
                resolve:{
                    currentUser:checkLoggedIn
                }
            })
            // #!/user/{{model.uid}}/website/{{model.wid}}/page/{{model.pid}}/widget/new
            .when('/website/:wid/page/:pid/widget/new', {
                templateUrl : "views/widget/widget-chooser.view.client.html",
                controller: "NewWidgetController",
                controllerAs: "model",
                resolve:{
                    currentUser:checkLoggedIn
                }
            })
            // #!/user/{{model.uid}}/website/{{model.wid}}/page/{{model.pid}}/widget/create/{{model.wtype}}
            .when('/website/:wid/page/:pid/widget/create/:wtype', {
                templateUrl : "views/widget/widget-new.view.client.html",
                controller: "CreateWidgetController",
                controllerAs: "model",
                resolve:{
                    currentUser:checkLoggedIn
                }
            })
            // #!/user/{{model.uid}}/website/{{model.wid}}/page/{{model.pid}}/widget/{{model.wgid}}
            .when('/website/:wid/page/:pid/widget/:wgid', {
                templateUrl : "views/widget/widget-edit.view.client.html",
                controller: "EditWidgetController",
                controllerAs: "model",
                resolve:{
                    currentUser:checkLoggedIn
                }
            })
            .when('/website/:wid/page/:pid/widget/:wgid/search', {
                templateUrl : "views/widget/widget-flickr-search.view.client.html",
                controller: "flickrController",
                controllerAs: "model",
                resolve:{
                    currentUser:checkLoggedIn
                }
            })
            .otherwise({
                redirectTo : "/login"
            });
    }

    function checkLoggedIn($q, $location, UserService) {
        var deferred = $q.defer();
        UserService
            .checkLoggedIn()
            .then(function (currentUser) {
               if(currentUser === '0'){
                   deferred.reject();
                   $location.url('/login');
               } else {
                   deferred.resolve(currentUser);
               }
            });
        return deferred.promise;
    }

    function checkAdmin($q, $location, UserService) {
        var deferred = $q.defer();
        UserService
            .checkAdmin()
            .then(function (currentUser) {
                if(currentUser === '0'){
                    deferred.resolve({});
                    $location.url('/login');
                } else {
                    deferred.resolve(currentUser);
                }
            });
        return deferred.promise;
    }
})();