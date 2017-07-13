(function () {
    angular
        .module("WebAppMaker")
        .factory('PageService', PageService);

    function PageService($http) {
        var pages = [
            { _id: "321", name: "Post 1", websiteId: "456", description: "Lorem" },
            { _id: "432", name: "Post 2", websiteId: "456", description: "Lorem" },
            { _id: "543", name: "Post 3", websiteId: "456", description: "Lorem" }

        ];
        var services = {
            "createPage": createPage,
            "findPageByWebsiteId": findPageByWebsiteId,
            "findPageById": findPageById,
            "updatePage": updatePage,
            "deletePage": deletePage
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
            return pages.reduce(getMaxId, 0).toString();
        }

        function createPage(wid, page) {
            var url = "/api/website/" +wid+ "/page";
            return $http.post(url, page)
                .then(function (response) {//unwrap the data in servers
                    return response.data;
                });



            // var newPageId = getNextId();
            // var newPage = {
            //     _id: newPageId,
            //     name: page.name,
            //     websiteId:wid,
            //     description:page.description,
            //     title:page.title
            //
            // };
            // pages.push(newPage);
        }

        function findPageByWebsiteId(wid) {
            var url = "/api/website/" +wid+ "/page";
            return $http.get(url)
                .then(function (response) {//unwrap the data in servers
                    return response.data;
                });



            // var results = [];
            //
            // for(var v in pages){
            //     if(pages[v].websiteId === wid){
            //         results.push(pages[v]);
            //     }
            // }
            //
            // return results;
        }

        function findPageById(pid) {
            var url = "/api/page/" +pid;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });

            // for (p in pages){
            //     var page = pages[p];
            //     if(parseInt(page._id) === parseInt(pid)){
            //         return page;
            //     }
            // }
            // return null;
        }

        function updatePage(pid, page) {

        }

        function deletePage(pid) {
            var url = "/api/page/" +pid;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });
            // for(var p in pages){
            //     if(pages[p]._id === pid){
            //         pages.splice(p, 1);
            //     }
            // }
        }
    }
})();