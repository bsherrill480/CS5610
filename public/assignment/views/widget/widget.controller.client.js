(function () {
    angular
        .module('WebAppMaker')
        .controller('WidgetListController', WidgetListController);
    
    function WidgetListController($sce,$routeParams, WidgetService) {
        var model = this;

        model.uid = $routeParams['uid'];
        model.wid = $routeParams['wid'];
        model.pid = $routeParams['pid'];
        model.wgid = $routeParams['wgid'];

        model.widgets = WidgetService.findAllWidgets(model.pid);
        model.trust = trust;
        model.getYouTubeEmbedUrl = getYouTubeEmbedUrl;
        
        
        function trust(html) {
            //scrubbing the html
            return $sce.trustAsHtml(html);
        }
        
        function getYouTubeEmbedUrl(linkUrl) {
            var embedUrl = "https://www.youtube.com/embed/";
            var linkUrlParts = linkUrl.split('/');
            embedUrl += linkUrlParts[linkUrlParts.length -1];
            return $sce.trustAsResourceUrl(embedUrl);
        }
    }
})();