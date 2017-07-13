/*var users = require("./users.mock.json");*/

module.exports = function(app){

    var pages = [
        { _id: "321", name: "Post 1", websiteId: "456", description: "Lorem" },
        { _id: "432", name: "Post 2", websiteId: "456", description: "Lorem" },
        { _id: "543", name: "Post 3", websiteId: "456", description: "Lorem" }

    ];

    app.get('/api/website/:wid/page', findAllPagesForWebsite);


    function findAllPagesForWebsite(req, res) {

        var results = [];

        for(var v in pages){
            if(pages[v].websiteId === req.params.wid){
                results.push(pages[v]);
            }
        }

        res.json(results) ;
    }
};