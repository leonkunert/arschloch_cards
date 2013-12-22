'use strict';
/* Controllers */

angular.module('arschloch.controllers', [])

// Overview Controller
.controller("OverviewCtrl", ['$scope', '$http', '$log', '$location', 'playerFactory', 'tableFactory', 'cookieFactory', function ($scope, $http, $log, $location, playerFactory, tableFactory, cookieFactory) {

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

    $log.debug('using overview ctrl');
}])

// Table Controller
.controller("TableCtrl", ['$scope', '$routeParams', '$http', '$log', 'tableFactory', 'cookieFactory', function ($scope, $routeParams, $http, $log, tableFactory, cookieFactory) {

    $scope.message    = "Table";
    $scope.playerName = cookieFactory.getCookie('playerName');
    $scope.playerId   = cookieFactory.getCookie('_id');

    tableFactory.joinTable($routeParams.tableId, $scope.playerId);

    if ($routeParams.tableId !== "undefined") {
        tableFactory.getTable($routeParams.tableId)
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

// Register
.controller("registerCtrl", ['$scope', '$location', '$log', 'cookieFactory', 'playerFactory', function ($scope, $location, $log, cookieFactory, playerFactory) {

    // If Cookies are already there Update their expire Date
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
    $log.debug('using Register ctrl');
}])

.controller("profileCtrl", ['$scope', '$location', '$log', 'cookieFactory', function ($scope, $location, $log, cookieFactory) {
    $scope.message    = 'The Data we have got:';
    $scope.playerName = cookieFactory.getCookie('playerName');
    $scope._id        = cookieFactory.getCookie('_id');
    $log.debug('using Profile ctrl');
}])

// Errors
.controller("errorCtrl", ['$scope', '$log', 'cookieFactory', function ($scope, $log, cookieFactory) {
    $scope.message = "Error. WHAT'S HAPPENING. Have you Cookies and Javascript enabled???";
    cookieFactory.checkCookie();
    $log.debug('using Error ctrl');
}]);