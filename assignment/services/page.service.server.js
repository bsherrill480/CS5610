/*var users = require("./users.mock.json");*/

module.exports = function(app){

    var pages = [
        { _id: "321", name: "Post 1", websiteId: "456", description: "Lorem" },
        { _id: "432", name: "Post 2", websiteId: "456", description: "Lorem" },
        { _id: "543", name: "Post 3", websiteId: "456", description: "Lorem" }

    ];

    app.post('/api/website/:wid/page', createPage);
    app.get('/api/website/:wid/page', findAllPagesForWebsite);

    function createPage(req, res) {
        var page = req.body;


        var newPage = {
            _id: (new Date()).getTime() + "",
            name: page.name,
            websiteId: req.params.wid,
            description:page.description,
            title:page.title

        };
        pages.push(newPage);

        if(newPage){
            res.status(200).send(newPage);
        } else {
            res.sendStatus(500);
        }
    }


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