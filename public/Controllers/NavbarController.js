angular.module('app')
.controller('NavbarController', ['$scope', 'adalAuthenticationService','$location', 
    function ($scope, adalService, $location) {
        var vm = this;
        

        // var token = null;
        // vm.tokenacquired = false;

        // $scope.$parent.hasToken = false;
        // //vm.hasToken = true;
        // vm.getToken = function(){
        //     token = adalService.acquireToken(adalService.config.resource).$$state.value;
        //     if(token){
        //         clearInterval(tokeninterval);
        //         vm.tokenacquired = true;
        //         $scope.$parent.hasToken = true;
        //         //$scope.$apply();
        //     }
        // }

        // if($scope.$parent.userInfo){
        //     if($scope.$parent.userInfo.isAuthenticated){
        //         token = adalService.acquireToken(adalService.config.resource).$$state.value;
        //         if(!token){
        //             tokeninterval = setInterval(vm.getToken, 100);
        //         }
        //         else{
        //             vm.tokenacquired = true;
        //             $scope.$parent.hasToken = true;
        //             //$scope.$apply();
        //         }
        //     }
        // }

    }
]);