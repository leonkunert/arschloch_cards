'use strict';
/* Controllers */

angular.module('arschloch.controllers', [])

// Overview Controller
.controller("OverviewCtrl",
    ['$scope', '$http', '$log', '$location', 'playerFactory', 'tableFactory', 'cookieFactory',
    function ($scope, $http, $log, $location, playerFactory, tableFactory, cookieFactory) {

    $scope.message = "Overview";

    if (cookieFactory.checkCookie()) {
        console.log(cookieFactory.getCookie('playerName'));
        if (cookieFactory.getCookie('playerName') === '') {
            $location.path('/register');
        }
    } else {
        $location.path('/register');
    }


    // Getting all Tables
    tableFactory.getTables()
        .success(function (data) {
            $scope.tables = data;
        });
    playerFactory.getPlayers()
        .success(function (data) {
            $scope.players = data;
        });

    // Delete Tables
    $scope.deleteTable = function () {
        tableFactory.rmTable(this.table._id);
        for (var table in $scope.tables) {
            if (this.table._id === $scope.tables[table]._id) {
                $scope.tables.splice(table, 1);
                break;
            }
        }
    };

    $scope.deletePlayer = function () {
        playerFactory.rmPlayer(this.table._id);
        for (var player in $scope.players) {
            if (this.player._id === $scope.players[player]._id) {
                $scope.players.splice(player);
                break;
            }
        }
    };

    $log.debug('using overview ctrl');
}])

// Table Controller
.controller("TableCtrl",
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
}])

// Add Player Controller
.controller("addPlayerCtrl",
    ['$scope', '$http', '$log', '$location',
    function ($scope, $http, $log, $location) {

    $scope.message = "Add Player";
    $log.debug('using Player ctrl');
}])

// Add a new Table
.controller("addTableCtrl", ['$scope', '$location', 'tableFactory', function ($scope, $location, tableFactory) {

    $scope.message = 'Add a new Table';
    $scope.addTable = function (maxPlayers) {
        tableFactory.addTable(maxPlayers).
            success(function(data) {
                $location.path('/');
            })
    };
}])

// Register
.controller("registerCtrl",
    ['$scope', '$location', 'cookieFactory', 'playerFactory',
    function ($scope, $location, cookieFactory, playerFactory) {

    if (cookieFactory.getCookie('playerName') !== '' || cookieFactory.getCookie('_id') !== '') {
        cookieFactory.setPlayerName(cookieFactory.getCookie('playerName'), 900);
        $location.path('/');
    }

    $scope.addPlayer = function (playerName) {
        console.log(playerName);
        if (playerName !== undefined) {
            cookieFactory.setPlayerName(playerName, 9000);
            $location.path('/');
        }
    };

    $scope.message = "Hey would you like to play? Just enter a Username.";
}])

// Errors
.controller("errorCtrl",
    ['$scope', 'cookieFactory',
    function ($scope, cookieFactory) {

    $scope.message = "Error. WHAT'S HAPPENING. Have you Cookies and Javascript enabled???";
    cookieFactory.checkCookie();
}]);