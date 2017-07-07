(function() {
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController)
        .controller("RegisterController", RegisterController)
        .controller("ProfileController", ProfileController);

    function LoginController($location, UserService) {
        var vm = this;
        vm.login = login;

        function login(username, password) {
            // var user = UserService.findUserByCredentials(username, password);
            UserService
                .findUserByCredentials(username, password)
                .then(function (found) {
                if (found !== null) {
                    $location.url("/user/" + found._id);
                } else {
                    vm.error = "Username does not exist.";
                }
            });
        }
    }

    function RegisterController($location, UserService) {
        var vm = this;
        vm.register = register;

        function register(username, password, vpassword) {
            if (username === undefined || username === null || username === "" || password === undefined || password === "") {
                vm.error = "Username and Passwords cannot be empty.";
                return;
            }
            if (password !== vpassword) {
                vm.error = "Password does not match.";
                return;
            }
            UserService
                .findUserByUsername(username)
                .then(
                    function () {
                        vm.error = "Username already exists.";
                    },
                    function () {
                        var user = {
                            username: username,
                            password: password,
                            firstName: "",
                            lastName: "",
                            email: ""
                        };
                        return UserService
                            .createUser(user);
                    }
                )
                .then(function (newUser) {
                    $location.url("/user/" + newUser._id);
                });
        }
    }

    function ProfileController($routeParams, $location, $timeout, UserService) {
        var vm = this;

        vm.userId = $routeParams['uid'];

        UserService
            .findUserById(vm.userId)
            .then(renderUser, userError);

        function renderUser(user){
            vm.user = user;
        }

        function userError() {
            vm.error = "User not Found";
        }

        // fetch username from user to user.username in template
        // vm.username = vm.user.username;
        // vm.firstName = vm.user.firstName;
        // vm.lastName = vm.user.lastName;
        // vm.email = vm.user.email;
        vm.updateUser = updateUser;

        function updateUser() {
            var update_user = {
                _id: $routeParams.uid,
                firstName: vm.firstName,
                lastName: vm.lastName,
                email: vm.email
            };
            UserService.updateUser($routeParams.uid, update_user);
            vm.updated = "Profile changes saved!";

            $timeout(function () {
                vm.updated = null;
            }, 3000);
        }
    }
})();