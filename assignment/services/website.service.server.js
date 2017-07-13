module.exports = function(app){
    var websites = [
        {_id: "123", name: "Facebook", developerId: "456", description: "Lorem"},
        {_id: "234", name: "Tweeter", developerId: "456", description: "Lorem"},
        {_id: "456", name: "Gizmodo", developerId: "456", description: "Lorem"},
        {_id: "890", name: "Go", developerId: "123", description: "Lorem"},
        {_id: "567", name: "Tic Tac Toe", developerId: "123", description: "Lorem"},
        {_id: "678", name: "Checkers", developerId: "123", description: "Lorem"},
        {_id: "789", name: "Chess", developerId: "234", description: "Lorem"}
    ];

    app.get("/api/user/:uid/website", findWebsitesByUser);
    app.get("/api/website/:wid", findWebsiteById);
    app.delete("/api/website/:wid", deleteWebsite);
    app.post("/api/user/:uid/website", createWebsite);

    function findWebsitesByUser(req, res) {

        var results = [];

        for(var v in websites){
            if(websites[v].developerId === req.params.uid){
                results.push(websites[v]);
            }
        }

        res.json(results);
    }

    function findWebsiteById(req, res) {
        for (w in websites){
            var website = websites[w];
            if(parseInt(website._id) === parseInt(req.params.wid)){
                res.json(website);
            }
        }
        res.sendStatus(404);
    }

    function deleteWebsite(req, res) {
        var wid = req.params.wid;

        for(var w in websites){
            if(websites[w]._id === wid){
                websites.splice(w, 1);
            }
        }
    }

    function createWebsite(req, res) {
        var website = req.body;

        var newWebsite = {
            _id : (new Date()).getTime() + "",
            developerId : req.params.uid,
            name: website.name,
            description: website.description
        };
        websites.push(newWebsite);

        if(newWebsite){
            res.status(200).send(newWebsite);
        } else {
            res.sendStatus(500);
        }
    }
}













