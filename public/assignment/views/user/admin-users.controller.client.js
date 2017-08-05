(function () {
    angular
        .module('WebAppMaker')
        .controller('adminUsersController',adminUsersController);

    function adminUsersController(UserService) {
        var model = this;
        model.deleteUser = deleteUser;
        function init() {
            findAllUsers()
        }
        init();
        
        
        function deleteUser(user) {
            UserService
                .deleteUser(user._id)
                .then(findAllUsers());
        }

        function findAllUsers() {
            UserService
                .findAllUsers()
                .then(function (users) {
                    model.users = users
                })
        }
    }
})();
