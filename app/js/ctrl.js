var app = angular.module("app", ['ngRoute', 'ngCookies']);

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
        .when('/com/table/:tableId', {
            templateUrl: '/partials/addPlayerToTable.html',
            controller: 'addPlayerToTableCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });

    $locationProvider.html5Mode(true);
}]);

app.config(function ($logProvider) {
    $logProvider.debugEnabled(true);
});

// PROVIDER / SERVICE / FACTORY

app.factory('playerFactory', ['$http', function ($http) {
    // Getting all Players
    playerFactory = {};

    playerFactory.getPlayers = function () {
        return $http.get("http://localhost:3003/v1/players");
    };

    return playerFactory;
}]);

app.factory('tableFactory', ['$http', function ($http) {
    // Getting all Players
    tableFactory = {};

    tableFactory.getTables = function () {
        return $http.get("http://localhost:3003/v1/tables");
    };

    return tableFactory;
}]);


app.controller("OverviewCtrl",
    ['$scope', '$http', '$log', 'playerFactory', 'tableFactory',
    function ($scope, $http, $log, playerFactory, tableFactory) {

    $scope.message = "Overview";
    // Getting all Tables
    tableFactory.getTables()
        .success(function (data) {
            $scope.tables = data;
        });
    playerFactory.getPlayers()
        .success(function (data) {
            $scope.players = data;
        });

    $log.debug('using overview ctrl');
}]);

app.controller("TableCtrl",
    ['$scope', '$routeParams', '$http', '$log',
    function ($scope, $routeParams, $http, $log) {

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

app.controller("addTableCtrl",
    ['$scope', '$http', '$log', '$location',
    function ($scope, $http, $log, $location) {

    $scope.message = "Add Table";
    $log.debug('using Table ctrl');
    $scope.addTable = function (maxPlayers) {
        console.log(maxPlayers);
        $http.post("http://localhost:3003/v1/add/table", {"maxPlayers": maxPlayers, "authKey": "dsd"})
            .success(function (data) {
                console.log(data);
                $location.path('/');
            });
    };
}]);

app.controller("addPlayerCtrl",
    ['$scope', '$http', '$log', '$location',
    function ($scope, $http, $log, $location) {

    $scope.message = "Add Player";
    $scope.addPlayer = function (playerName) {
        $http.post("http://localhost:3003/v1/add/player", {"playerName": playerName, "authKey": "dsd"})
            .success(function (data) {
                console.log(data);
                $location.path('/');
            });
    };
    $log.debug('using Player ctrl');
}]);

app.controller("addPlayerToTableCtrl",
    ['$scope', '$http', '$log', '$location',
    function ($scope, $http, $log, $location) {

    $scope.message = "Add Player to Table";
    playerFactory.getPlayers()
        .success(function (data) {
            $scope.players = data;
        });
    $log.debug('using Player to table ctrl');
}]);