(function () {
    angular
        .module("WebAppMaker")
        .service('WebsiteService', WebsiteService);

    function WebsiteService($http) {
        this.findWebsitesByUser = findWebsitesByUser;
        this.findWebsiteById = findWebsiteById;
        this.deleteWebsite = deleteWebsite;
        this.createWebsite = createWebsite;
        this.updateWebsite = updateWebsite;

        var websites = [
            {_id: "123", name: "Facebook", developerId: "456", description: "Lorem"},
            {_id: "234", name: "Tweeter", developerId: "456", description: "Lorem"},
            {_id: "456", name: "Gizmodo", developerId: "456", description: "Lorem"},
            {_id: "890", name: "Go", developerId: "123", description: "Lorem"},
            {_id: "567", name: "Tic Tac Toe", developerId: "123", description: "Lorem"},
            {_id: "678", name: "Checkers", developerId: "123", description: "Lorem"},
            {_id: "789", name: "Chess", developerId: "234", description: "Lorem"}
        ];

        function updateWebsite(wid, website) {

            var url = "/api/website/" +wid;
            return $http.put(url, website)
                .then(function (response) {//unwrap the data in servers
                    return response.data;
                });
                // var oldWebsite = findWebsiteById(wid);
                // var index = websites.indexOf(oldWebsite);
                // websites[index].name = website.name;
                // websites[index].description = website.description;

        }



        function findWebsitesByUser(uid){
            var url = "/api/user/" +uid +"/website";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });

            // var results = [];
            //
            // for(var v in websites){
            //     if(websites[v].developerId === uid){
            //         results.push(websites[v]);
            //     }
            // }
            //
            // return results;
        }

        function findWebsiteById(wid) {
            var url = "/api/website/" +wid;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });


            // for (w in websites){
            //     var website = websites[w];
            //     if(parseInt(website._id) === parseInt(wid)){
            //         return website;
            //     }
            // }
            // return null;
        }

        function deleteWebsite(wid) {
            var url = "/api/website/" +wid;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });

            // for(var w in websites){
            //     if(websites[w]._id === wid){
            //         websites.splice(w, 1);
            //     }
            // }
        }

        function createWebsite(uid,website) {
            var url = "/api/user/" + uid+ "/website";
            return $http.post(url, website)
                .then(function (response) {//unwrap the data in servers
                    return response.data;
                });
            // website._id = (new Date()).getTime() + "";
            // websites.push(website);
        }
    }
})();