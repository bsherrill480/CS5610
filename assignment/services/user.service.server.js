/*var users = require("./users.mock.json");*/
var userModel = require("../model/user/user.model.server");

module.exports = function(app){
    //
    // var users = [
    //     {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder", email: "alice@gmail.com"},
    //     {_id: "100", username: "a", password: "a", firstName: "a", lastName: "a", email: "a@gmail.com"},
    //     {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley", email: "bob@regge.com"},
    //     {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia", email: "charles@bing.com"},
    //     {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi", email: "jose@neu.com"}
    // ];


    // GET Calls.
    //app.get('/api/user?username=username', findUserByUsername);
    //app.get('/api/user?username=username&password=password', findUserByUsername);
    app.get('/api/user', findAllUsers);
    // app.get('/api/user?username=username&password=password', findUserByCredentials);
    app.get('/api/user/:uid', findUserById);

    // POST Calls.
    app.post('/api/user', createUsers);
    //
    // // PUT Calls.
    app.put('/api/user/:uid', updateUser);
    //
    // // DELETE Calls.
    app.delete('/api/user/:uid', deleteUser);

    /*API implementation*/
    function findAllUsers(req, res) {
        var username = req.query['username'];
        var password = req.query['password'];
        if(username && password){
            userModel
                .findUserByCredentials(username, password)
                .then(function (user) {
                    if(user) {
                        res.json(user);
                    }else {
                        res.sendStatus(404);
                    }
                });

            // for (u in users){
            //         var user = users[u];
            //         if((user.username === username) && (user.password === password)){
            //             res.send(user);
            //             return;
            //         }
            //     }
            //     res.sendStatus(404);
        } else if(username){

            userModel
                .findUserByUsername(username)
                .then(function (user) {
                    if(user) {
                        res.json(user);
                    }else {
                        res.sendStatus(404);
                    }
                });
            // for (u in users){
            //     var user = users[u];
            //     if(user.username === username){
            //         res.send(user);
            //         return;
            //     }
            // }
            // res.sendStatus(404);
        } else {
            userModel
                .findAllUsers()
                .then(function (users) {
                    res.json(users);
                });
        }
        // else {
        //     res.send(users);
        // }
    }

    function createUsers(req, res) {

        var user = req.body;

        userModel
            .createUser(user)
            .then(
                function (user) {
                    res.json(user);
                },
                function (error) {
                    res.sendStatus(404).send(error);
                }
            );

    }

    // function createUsers(req, res) {
    //     var user = req.body;
    //
    //     var newUser = {
    //         _id: (new Date()).getTime() + "",
    //         username: user.username,
    //         password: user.password,
    //         firstName: user.firstName,
    //         lastName: user.lastName,
    //         email: user.email
    //     };
    //     users.push(newUser);
    //
    //     if(newUser){
    //         res.status(200).send(newUser);
    //     } else {
    //         res.sendStatus(500);
    //     }
    // }

    function findUserByUsername (req, res) {
        var username = req.query.username;

        for (u in users){
            var user = users[u];
            if(user.username === username){
                res.status(200).send(user);
                return;
            }
        }
        res.status(404).send("not found!");
    }

    function findUserByCredentials (req, res) {
        var username = req.query.username;
        var pswd = req.query.password;

        /*for (u in users){
         var user = users[u];
         if(user.username === username && user.password === pswd){
         res.status(200).send(user);
         return;
         }
         }*/

        var user = users.find(function (u) { return u.username==username && u.password==pswd  });
        res.send(user);
    }

    function findUserById(req, res) {
        var uid = req.params.uid;

        userModel
            .findUserById(uid)
            .then(function (user) {
                res.json(user);
            });
        // var uid = req.params.uid;
        //
        // var user = users.find(function (u) { return u._id==uid });
        // if(user)
        // {
        //     res.send(user);
        // }
        // else
        // {
        //     res.status(404).send("not found!");
        // }
    }

    function updateUser(req,res) {
        var uid = req.params.uid;
        var user = req.body;

        userModel
            .updateUser(uid, user)
            .then(function (status) {
                res.send(status);
            });

        // var uid = req.params.id;
        // var user = req.body;
        //
        // for (var u in users){
        //     if(users[u].id === uid){
        //         users[u] = user;
        //         res.sendStatus(200);
        //         return;
        //     }
        // }
        // res.status(404);
    }

    function deleteUser(req,res) {
        var uid = req.params.uid;

        userModel
            .deleteUser(uid)
            .then(function (status) {
                res.send(status)
            })



        // var uid = req.params.uid;
        //
        // for (u in users){
        //     var user = users[u];
        //     if(user._id === uid){
        //         users.splice(u,1);
        //         res.sendStatus(200);
        //         return;
        //     }
        // }
        // res.sendStatus(404);
    }
};