(function() {
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController)
        .controller("RegisterController", RegisterController)
        .controller("ProfileController", ProfileController);

    function LoginController($location, UserService) {
        var model = this;
        model.login = login;

        function login(username, password) {
            // var user = UserService.findUserByCredentials(username, password);
            UserService
                .findUserByCredentials(username, password)
                .then(function (found) {
                if (found !== null) {
                    $location.url("/user/" + found._id);
                } else {
                    model.error = "Username does not exist.";
                }
            });
        }
    }

    function RegisterController(UserService, $location, $timeout) {
        var model = this;
        model.register = register;

        function register(username, password, vpassword) {
            if (username === undefined || username === null || username === "" || password === undefined || password === "") {
                model.error = "Username and Passwords cannot be empty.";
                return;
            }
            if (password !== vpassword) {
                model.error = "Password does not match.";
                return;
            }
            // var user = UserService.findUserByUsername(username);
            UserService
                .findUserByUsername(username)
                .then(
                    function(){
                        model.error = "Username already exists.";
                        $timeout(function () {
                            model.error = null;
                        }, 3000);
                    },
                    function () {
                        var user = {
                            username: username,
                            password: password,
                            firstName: "",
                            lastName: "",
                            email: "",
                            _id: (new Date()).getTime() + ""
                        };
                         return UserService
                            .createUser(user)
                            // .then(
                            //     function (user) {
                            //         $location.url("/user/" + user._id);
                            //     }
                            // )
                        // user = UserService.findUserByUsername(username);
                        //$location.url("/user/" + user._id);
                    }
                )
                .then(// after adding a return before UserService, then catch the promise here to avoid nesting construction and keep synchronize.
                    function (user) {
                        $location.url("/user/" + user._id);
                    }
                );
            // if (user === null) {
            //     user = {
            //         username: username,
            //         password: password,
            //         firstName: "",
            //         lastName: "",
            //         email: ""
            //     };
            //     UserService.createUser(user);
            //     user = UserService.findUserByUsername(username);
            //     $location.url("/user/" + user._id);
            // }
            // else {
            //     model.error = "Username already exists.";
            //     $timeout(function () {
            //         model.error = null;
            //     }, 3000);
            // }
        }
    }

    function ProfileController($routeParams, $location, $timeout, UserService) {
        var model = this;

        model.userId = $routeParams['uid'];

        UserService
            .findUserById(model.userId)
            .then(renderUser, userError);

        function renderUser(user){
            model.user = user;
        }

        function userError() {
            model.error = "User not Found";
        }

        // fetch username from user to user.username in template
        // model.username = model.user.username;
        // model.firstName = model.user.firstName;
        // model.lastName = model.user.lastName;
        // model.email = model.user.email;
        model.updateUser = updateUser;
        model.deleteUser = deleteUser;
        // function updateUser() {
        //     var update_user = {
        //         _id: $routeParams.uid,
        //         firstName: model.firstName,
        //         lastName: model.lastName,
        //         email: model.email
        //     };
        //     UserService.updateUser($routeParams.uid, update_user);
        //     model.updated = "Profile changes saved!";
        //
        //     $timeout(function () {
        //         model.updated = null;
        //     }, 3000);
        // }

        function updateUser(user) {
            UserService
                .updateUser(user._id, user)
                .then(function () {
                    model.message = "User update was successful";
                })
        }

        function deleteUser(user) {
            UserService
                .deleteUser(user._id)
                .then(function () {
                    $location.url('/')
                }),
                    function () {
                model.error = "Unable to unregister you"
            }
        }

    }
})();