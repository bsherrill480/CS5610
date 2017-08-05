(function () {
    angular
        .module("WebAppMaker")
        .factory('UserService', UserService);

    function UserService($http) {
        var users = [
            {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder", email: "alice@gmail.com"},
            {_id: "100", username: "a", password: "a", firstName: "a", lastName: "a", email: "a@gmail.com"},
            {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley", email: "bob@regge.com"},
            {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia", email: "charles@bing.com"},
            {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi", email: "jose@neu.com"}
        ];
        var services = {
            "createUser": createUser,
            "findUserById": findUserById,
            "findUserByUsername": findUserByUsername,
            "findAllUsers": findAllUsers,
            "findUserByCredentials": findUserByCredentials,
            "login": login,
            "checkLoggedIn": checkLoggedIn,
            "checkAdmin": checkAdmin,
            "logout": logout,
            "register": register,
            "updateUser": updateUser,
            "deleteUser": deleteUser,
            "unregister": unregister
        };
        return services;

        function getNextId() {
            function getMaxId(maxId, currentId) {
                var current = parseInt(currentId._id);
                if (maxId > current) {
                    return maxId;
                } else {
                    return current + 1;
                }
            }
            return users.reduce(getMaxId, 0).toString();
        }

        function checkAdmin() {
            var url = "/api/checkAdmin";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }


        function logout() {
            var url = "/api/logout";
            return $http.post(url)
                .then(function (response) {
                    return response.data;
                });

        }function register(user) {
            var url = "/api/register";
            return $http.post(url, user)
                .then(function (response) {
                    return response.data;
                });
        }

        function checkLoggedIn() {
            var url = "/api/checkLoggedIn";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function login(username, password) {
            var url = "/api/login";
            var credentials = {
                username: username,
                password: password
            };
            return $http.post(url, credentials)
                .then(function (response) {//unwrap the data in servers
                    return response.data;
                });
        }

        function createUser(user) {
            var url = "/api/user";
            return $http.post(url, user)
                .then(function (response) {//unwrap the data in servers
                    return response.data;
                });
            // var newUserId = getNextId();
            // var newUser = {
            //     _id: newUserId,
            //     username: user.username,
            //     password: user.password,
            //     firstName: user.firstName,
            //     lastName: user.lastName,
            //     email: user.email
            // };
            // users.push(newUser);
        }

        function findUserById(userId) {
            // for (u in users){
            //     var user = users[u];
            //     if(parseInt(user._id) === parseInt(userId)){
            //         return user;
            //     }
            // }
            // return null;
            var url = "/api/user/" + userId;
            return $http.get(url)
                .then(function (response) {//unwrap the data in servers
                    return response.data;
                });
        }

        function findUserByUsername(username) {
            var url = "/api/user?username=" +username;
            return $http.get(url)
                .then(function (response) {//unwrap the data in servers
                    return response.data;
                });
            // for (u in users){
            //     var user = users[u];
            //     if(user.username === username){
            //         return user;
            //     }
            // }
            // return null;
        }

        function findAllUsers(username, password) {
            var url = "/api/user";
            return $http.get(url)
                .then(function (response) {//unwrap the data in servers
                    return response.data;
                });
            // for (u in users){
            //     var user = users[u];
            //     if((user.username === username) && (user.password === password)){
            //         return user;
            //     }
            // }
            // return null;
        }

        function findUserByCredentials(username, password) {
            var url = "/api/user?username=" +username+ "&password=" +password;
            return $http.get(url)
                .then(function (response) {//unwrap the data in servers
                    return response.data;
                });
            // for (u in users){
            //     var user = users[u];
            //     if((user.username === username) && (user.password === password)){
            //         return user;
            //     }
            // }
            // return null;
        }

        function updateUser(userId, user) {
            var url = "/api/user/" + userId;
            return $http.put(url, user)
                .then(function (response) {//unwrap the data in servers
                    return response.data;
                });
            // var oldUser = findUserById(userId);
            // var index = users.indexOf(oldUser);
            // users[index].firstName = user.firstName;
            // users[index].lastName = user.lastName;
            // users[index].email = user.email;
        }

        function deleteUser(userId) {
            var url = "/api/user/" + userId;
            return $http.delete(url)
                .then(function (response) {//unwrap the data in servers
                    return response.data;
                });
            // var oldUser = findUserById(userId);
            // var index = users.indexOf(oldUser);
            // users.splice(index);
        }
        function unregister() {
            var url = "/api/unregister";
            return $http.delete(url)
                .then(function (response) {//unwrap the data in servers
                    return response.data;
                });
            // var oldUser = findUserById(userId);
            // var index = users.indexOf(oldUser);
            // users.splice(index);
        }
    }
})();