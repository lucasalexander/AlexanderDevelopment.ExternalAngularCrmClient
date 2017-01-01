angular.module('app', ['ngRoute','AdalAngular']).config([
        '$routeProvider', '$locationProvider','$httpProvider', 'adalAuthenticationServiceProvider',
        function ($routeProvider, $locationProvider, $httpProvider, adalProvider) {
            $locationProvider.html5Mode(true).hashPrefix('!');
            $routeProvider
            .when('/opportunities', {
                templateUrl: '/Views/Opportunity.html',
                controller: 'OpportunityController',
                controllerAs: 'vm',
                requireADLogin: true
            })
            .when('/', {
                templateUrl: '/Views/Home.html',
                controller: 'HomeController',
                controllerAs: 'vm'
            })
            .otherwise({ redirectTo: '/' });
            
            var endpoints = {
                orgUri: 'https://lucasdemo02.crm.dynamics.com'
            }
            
            adalProvider.init({
                tenant: 'lucasdemo02.onmicrosoft.com',
                clientId: '6b62f90c-4ddc-49b0-8f3b-8defb53b4fd9',
                resource: 'https://lucasdemo02.crm.dynamics.com',
                redirectUri: 'http://localhost:2319',
                postLogoutRedirectUri: 'http://localhost:2319',
                extraQueryParameter: 'nux=1',
                //cacheLocation: 'localStorage', // enable this for IE, as sessionStorage does not work for localhost.
            },$httpProvider);
        }
    ]);

