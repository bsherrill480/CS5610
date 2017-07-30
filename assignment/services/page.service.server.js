/*var users = require("./users.mock.json");*/
var pageModel = require('../model/page/page.model.server');

module.exports = function(app){

    var pages = [
        { _id: "321", name: "Post 1", websiteId: "456", description: "Lorem" },
        { _id: "432", name: "Post 2", websiteId: "456", description: "Lorem" },
        { _id: "543", name: "Post 3", websiteId: "456", description: "Lorem" }

    ];

    app.post('/api/website/:wid/page', createPage);
    app.get('/api/website/:wid/page', findAllPagesForWebsite);
    app.get('/api/page/:pid', findPageById);
    app.put('/api/page/:pid', updatePage);
    app.delete('/api/page/:pid', deletePage);

    app.get('/api/test/:pid/:wgid', function (req, res) {
        // var pid = req.pid;
        var pid = "597c10734f45fca0fc6029cd";
        // var wgid = req.wgid;
        var wgid = "597c107e4f45fca0fc6029ce";

        pageModel
            .deleteWidgetToPage(pid, wgid)
            .then(function (result) {
                console.log(result);
            });
    });


    function updatePage(req, res) {
        var pid = req.params.pid;
        var page = req.body;

        pageModel
            .updatePage(pid, page)
            .then(function (page) {
                res.json(page)
            })

        // var pid = req.params.pid;
        // var page = req.body;
        //
        // for (p in pages) {
        //     if (String(pages[p]._id) === String(pid)) {
        //         // websites[w].name=website.name;
        //         // websites[w].desc=website.desc;
        //         pages[p] = page;
        //         res.sendStatus(200);
        //         return;
        //     }
        // }
        // res.sendStatus(404);
    }

    function createPage(req, res) {
         var page = req.body;
         var websiteId = req.params.wid;

         pageModel
             .createPage(websiteId, page)
             .then(function (page) {
                 res.json(page);
             })



        // var page = req.body;
        //
        //
        // var newPage = {
        //     _id: (new Date()).getTime() + "",
        //     name: page.name,
        //     websiteId: req.params.wid,
        //     description:page.description,
        //     title:page.title
        //
        // };
        // pages.push(newPage);
        //
        // if(newPage){
        //     res.status(200).send(newPage);
        // } else {
        //     res.sendStatus(500);
        // }
    }


    function findAllPagesForWebsite(req, res) {
        pageModel
            .findAllPagesForWebsite(req.params.wid)
            .then(function (pages) {
                res.json(pages);
            })

        // var results = [];
        //
        // for(var v in pages){
        //     if(pages[v].websiteId === req.params.wid){
        //         results.push(pages[v]);
        //     }
        // }
        //
        // res.json(results) ;
    }

    function findPageById(req, res) {
        pageModel
            .findPageById(req.params.pid)
            .then(function (status) {
                res.json(status);
            })
        // for (p in pages){
        //     var page = pages[p];
        //     if(parseInt(page._id) === parseInt(req.params.pid)){
        //         res.json(page);
        //     }
        // }
        // res.sendStatus(404);
    }

    function deletePage(req, res) {
        var pid = req.params.pid;
        pageModel
            .deletePage(pid)
            // .then(function (status) {
            //     res.json(status);
            // })

        // for(var p in pages){
        //     if(pages[p]._id === req.params.pid){
        //         pages.splice(p, 1);
        //     }
        // }
    }
};