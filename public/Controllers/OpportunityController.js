angular.module('app')
.controller('OpportunityController', ['$scope', 'adalAuthenticationService','$location', 
function ($scope, adalService, $location) {
    var tokeninterval;
    var token = null;
    var vm = this;
    vm.opportunities = [];

    var getToken = function(){
        token = adalService.acquireToken(adalService.config.resource).$$state.value;
        if(token){
            clearInterval(tokeninterval);
            queryOpportunities(null, token);
        }
    }

    $scope.RetrieveOpportunities = function(){
        //clear the opportunities array so we don't get duplicates displayed if this is not the first time the function is called
        vm.opportunities = [];

        var token = adalService.acquireToken(adalService.config.resource).$$state.value;
        queryOpportunities(null, token); 
        // var token = adalService.acquireToken(adalService.config.resource).$$state.value;
        // if(!token){
        //     tokeninterval = setInterval(getToken, 100);
        // }
        // else{
        //    queryOpportunities(null, token); 
        // }
    }
        
    function queryOpportunities(error, token){
        //set the web api query parameters
        var recorduri = "/opportunities"; 
        var recordselect = ['name','description'].join();
        var recordfilter = '';
        //var recordfilter = '_regardingobjectid_value eq ' + getPlainObjectId();
        //var recordquery = recorduri + "?$select=" + recordselect + "&$filter=" + recordfilter;
        var recordquery = recorduri + "?$select=" + recordselect;


        //execute web api query and process results
        Sdk.request(token, "GET", recordquery, null, true, 5000).then(function (request) {
            //parse the response
            var collection = JSON.parse(request.response).value;
            collection.forEach(function (row, i) {
                //create an object to represent the task
                var oppobject = {};
                oppobject.name = row["name"];
                oppobject.description = row["description"];
                
                //add the object to the tasks array
                vm.opportunities.push(oppobject);
            });

            //call $scope.$apply() to update displayed data 
            $scope.$apply();
        })
        .catch(function (error) {
            console.log(error.message);
        });
    }
}]);