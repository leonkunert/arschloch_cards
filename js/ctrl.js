var app = angular.module("app", ['ngRoute']);

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/overview', {
            templateUrl: '/partials/overview.html',
            controller: 'OverviewCtrl'
        })
        .when('/table/:tableId', {
            templateUrl: '/partials/table.html',
            controller: 'TableCtrl'
        })
        .otherwise({
            redirectTo: '/overview'
        });
}]);

app.controller("OverviewCtrl", ['$scope', '$http', function ($scope, $http) {

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
}]);

app.controller("TableCtrl", ['$scope', '$routeParams', '$http', function ($scope, $routeParams, $http) {
    $scope.message = "Table";

}]);