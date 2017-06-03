/**
 * Created by yanchao on 6/2/17.
 */
(function(){
    angular
        .module("MyApp",["ngRoute"])
        .controller("myController", myController);

    function myController($scope){
        $scope.hello = "some value";
    }
})();