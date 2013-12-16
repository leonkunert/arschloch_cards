var app = angular.module("app", ['ngRoute']);

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl: '/partials/overview.html',
            controller: 'OverviewCtrl'
        })
        .when('/table/:tableId', {
            templateUrl: '/partials/table.html',
            controller: 'TableCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });

    $locationProvider.html5Mode(true);
}]);

app.config(function ($logProvider) {
    $logProvider.debugEnabled(true);
});

app.controller("OverviewCtrl", ['$scope', '$http', '$log', function ($scope, $http, $log) {

    // Getting all Tables
    $http.get("http://localhost:3003/v1/tables")
        .success(function (data) {
            console.log(data);
            $scope.tables = data;
        });
    $scope.message = "Overview";

    // Getting all Players
    $http.get("http://localhost:3003/v1/players")
        .success(function (data) {
            console.log(data);
            $scope.players = data;
            console.log($scope);
        });
    $log.debug('using overview ctrl');
}]);

app.controller("TableCtrl", ['$scope', '$routeParams', '$http', '$log', function ($scope, $routeParams, $http, $log) {
    $scope.message = "Table";
    console.log($routeParams);

}]);