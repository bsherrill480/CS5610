/*var users = require("./users.mock.json");*/
var userModel = require("../model/user/user.model.server");
var passport      = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

module.exports = function(app){
    //
    // var users = [
    //     {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder", email: "alice@gmail.com"},
    //     {_id: "100", username: "a", password: "a", firstName: "a", lastName: "a", email: "a@gmail.com"},
    //     {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley", email: "bob@regge.com"},
    //     {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia", email: "charles@bing.com"},
    //     {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi", email: "jose@neu.com"}
    // ];

    app.get('/api/user', isAdmin, findAllUsers);
    app.get('/api/user/:uid', findUserById);
    app.post('/api/user', createUsers);
    app.put('/api/user/:uid', updateUser);
    app.delete('/api/user/:uid', isAdmin, deleteUser);
    app.delete('/api/unregister', unregister);

    app.post  ('/api/login', passport.authenticate('local'), login);
    app.get  ('/api/checkLoggedIn', checkLoggedIn);
    app.get  ('/api/checkAdmin', checkAdmin);
    app.post  ('/api/logout', logout);
    app.post  ('/api/register', register);

    app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

    app.get('/auth/google/callback',
        passport.authenticate('google', {
            successRedirect: '/#!/profile',
            failureRedirect: '/#!/login'
        }));

    var googleConfig = {
        clientID     : process.env.GOOGLE_CLIENT_ID,
        clientSecret : process.env.GOOGLE_CLIENT_SECRET,
        callbackURL  : process.env.GOOGLE_CALLBACK_URL
    };

    passport.use(new GoogleStrategy(googleConfig, googleStrategy));

    function googleStrategy(token, refreshToken, profile, done) {
        //console.log(profile);
        userModel
            .findUserByGoogleId(profile.id)
            .then(
                function(user) {
                    if(user) {
                        return done(null, user);
                    } else {
                        var email = profile.emails[0].value;
                        var emailParts = email.split("@");
                        var newGoogleUser = {
                            username:  emailParts[0],
                            password: "0",
                            firstName: profile.name.givenName,
                            lastName:  profile.name.familyName,
                            email:     email,
                            google: {
                                id:    profile.id,
                                token: token
                            }
                        };
                        return userModel.createUser(newGoogleUser);
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }
            )
            .then(
                function(user){
                    return done(null, user);
                },
                function(err){
                    if (err) { return done(err); }
                }
            );
    }

    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    function localStrategy(username, password, done) {
        //done is a callback, which chains several functions that can handle the same exact request.
        userModel
            .findUserByCredentials(username, password)
            .then(
                function(user) {
                    if (!user) {
                        return done(null, false);
                    }
                    return done(null, user);
                },
                function(err) {
                    if (err) { return done(err); }
                }
            );
    }



    function register(req, res) {
        var user = req.body;
        userModel
            .createUser(user)
            .then(
                function (user) {
                    req.login(user, function (status) {
                        res.json(user);
                    });
                },
                function (error) {
                    res.sendStatus(404).send(error);
                }
            );

    }

    function logout(req, res) {
        req.logOut();
        res.send(200);
    }

    function checkLoggedIn(req, res) {
        if(req.isAuthenticated()) {
            res.json(req.user);
        } else {
            res.json('0');
            console.log("Not Authenticated")
        }
    }

    function checkAdmin(req, res) {
        if(req.isAuthenticated() && req.user.roles.indexOf('ADMIN') > -1 ) {
            res.json(req.user);
        } else {
            res.json('0');
        }
    }

    function isAdmin(req, res, next) {
        if(req.isAuthenticated() && req.user.roles.indexOf('ADMIN') > -1 ) {
            next();
        } else {
            res.sendStatus(401);
        }
    }

    function login(req, res) {
        var user = req.user;
        res.json(user);
    }

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

    function unregister(req, res) {
        userModel
            .deleteUser(req.user._id)
            .then(function (status) {
                req.logout();
                res.sendStatus(200);
            });
    }

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        userModel
            .findUserById(user._id)
            .then(
                function(user){
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            );
    }
};