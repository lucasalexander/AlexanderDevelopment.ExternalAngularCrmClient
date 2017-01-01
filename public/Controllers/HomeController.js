angular.module('app')
.controller('HomeController', ['$scope', 'adalAuthenticationService','$location', 
    function ($scope, adalService, $location) {
        var vm = this;
        var tokeninterval;
        vm.message = "hello!";

        $scope.login = function () {
            adalService.login();
        };
        $scope.logout = function () {
            adalService.logOut();
        };

        vm.hasToken = true;
        vm.getToken = function(){
            token = adalService.acquireToken(adalService.config.resource).$$state.value;
            if(token){
                clearInterval(tokeninterval);
                vm.tokenacquired = true;
                $scope.$parent.hasToken = true;
                //$scope.$apply();
            }
        }

        if($scope.$parent.userInfo){
            if($scope.$parent.userInfo.isAuthenticated){
                token = adalService.acquireToken(adalService.config.resource).$$state.value;
                if(!token){
                    tokeninterval = setInterval(vm.getToken, 100);
                }
                else{
                    vm.tokenacquired = true;
                    $scope.$parent.hasToken = true;
                }
            }
        }
    }
]);