var app = angular.module("app", []);

/*app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/', {
            template: '',
            controller: 'OverviewCtrl'
        })
        .when('/table/:tableId', {
            template: '',
            controller: 'TableCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });
}]);*/

app.controller("OverviewCtrl", function ($http) {
    var app = this;

    // Getting all Tables
    $http.get("http://localhost:3003/v1/tables")
        .success(function (data) {
            console.log(data);
            app.tables = data;
        });

    // Getting all Players
    $http.get("http://localhost:3003/v1/players")
        .success(function (data) {
            console.log(data);
            app.players = data;
        });
});

app.controller("TableCtrl", function ($scope, $location, $routeProvider) {

});