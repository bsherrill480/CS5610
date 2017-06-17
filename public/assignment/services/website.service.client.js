(function () {
    angular
        .module("WebAppMaker")
        .factory('WebsiteService', WebsiteService);

    function WebsiteService() {
        var websites = [
            {_id: "123", name: "Facebook", developerId: "456", desc: "Lorem"},
            {_id: "234", name: "Tweeter", developerId: "456", desc: "Lorem"},
            {_id: "456", name: "Gizmodo", developerId: "456", desc: "Lorem"},
            {_id: "890", name: "Go", developerId: "123", desc: "Lorem"},
            {_id: "567", name: "Tic Tac Toe", developerId: "123", desc: "Lorem"},
            {_id: "678", name: "Checkers", developerId: "123", desc: "Lorem"},
            {_id: "789", name: "Chess", developerId: "234", desc: "Lorem"}
        ];

        var services = {
            'createWebsite': createWebsite,
            'findWebsitesByUser': findWebsitesByUser,
            'findWebsiteById': findWebsiteById,
            'updateWebsite': updateWebsite,
            'deleteWebsite': deleteWebsite,
            'deleteWebsitesByUser': deleteWebsitesByUser
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

            return websites.reduce(getMaxId, 0).toString();
        }

        function createWebsite(userId, website) {
            var newWebsiteId = getNextId();
            var newWebsite = {
                _id: newWebsiteId,
                name: website.name,
                desc: website.desc,
                developerId: userId
            };
            websites.push(newWebsite);
        }

        function findWebsitesByUser(userId) {
            result = [];
            for (w in websites) {
                var website = websites[w];
                if (parseInt(website.developerId) === parseInt(userId)) {
                    result.push(website);
                }
            }
            return result;
        }

        function findWebsiteById(websiteId) {
            for (w in websites) {
                var website = websites[w];
                if (parseInt(website._id) === parseInt(websiteId)) {
                    return website;
                }
            }
            return null;
        }

        function updateWebsite(websiteId, website) {
            var oldWebsite = findWebsiteById(websiteId);
            var index = websites.indexOf(oldWebsite);
            websites[index].name = website.name;
            websites[index].desc = website.desc;
        }

        function deleteWebsite(websiteId) {
            var oldWebsite = findWebsiteById(websiteId);
            var index = websites.indexOf(oldWebsite);
            websites.splice(index, 1);
        }

        function deleteWebsitesByUser(userId) {
            for (w in websites) {
                website = websites[w];
                if (website.developerId === userId) {
                    deleteWebsite(website._id);
                }
            }
        }
    }
})();