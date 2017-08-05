(function () {
    angular
        .module('WebAppMaker')
        .controller('adminUsersController',adminUsersController);

    function adminUsersController(UserService) {
        var model = this;

        function init() {
            UserService
                .findAllUsers()
                .then(function (users) {
                    model.users = users
                })
        }
        init();
    }
})();
