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
        .when('/add/table', {
            templateUrl: '/partials/addTable.html',
            controller: 'addTableCtrl'
        })
        .when('/add/player', {
            templateUrl: '/partials/addPlayer.html',
            controller: 'addPlayerCtrl'
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
            $scope.tables = data;
        });
    $scope.message = "Overview";

    // Getting all Players
    $http.get("http://localhost:3003/v1/players")
        .success(function (data) {
            $scope.players = data;
        });
    $log.debug('using overview ctrl');
}]);

app.controller("TableCtrl", ['$scope', '$routeParams', '$http', '$log', function ($scope, $routeParams, $http, $log) {
    $scope.message = "Table";
    if ($routeParams.tableId !== "undefined") {
        $http.get("http://localhost:3003/v1/table/" + $routeParams.tableId)
            .success(function (data) {
                $scope.table   = data[0];
                $scope.players = data[1];
            })
            .error(function (data) {
                // TODO: Handle Error
        });
    }
    $log.debug('using Table ctrl');
}]);

app.controller("addTableCtrl", ['$scope', '$http', '$log', function ($scope, $http, $log) {
    $scope.message = "Add Table";
    $log.debug('using Table ctrl');
    $scope.addTable = function (maxPlayers) {
        console.log(maxPlayers);
        $http.post("http://localhost:3003/v1/add/table", {"maxPlayers": maxPlayers, "authKey": "dsd"})
            .success(function (data) {
                console.log(data);
            });
    };
}]);

app.controller("addPlayerCtrl", ['$scope', '$http', '$log', function ($scope, $http, $log) {
    $scope.message = "Add Player";
    $scope.addPlayer = function (playerName) {
        console.log(playerName);
    };
    $log.debug('using Player ctrl');
}]);