'use strict';
/* Controllers */

angular.module('arschloch.controllers', [])

// Overview Controller
.controller("OverviewCtrl",
    ['$scope', '$http', '$log', 'playerFactory', 'tableFactory', 'cookieFactory',
    function ($scope, $http, $log, playerFactory, tableFactory, cookieFactory) {

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

    $scope.deleteTable = function () {
        console.log('message');
    }

    if(cookieFactory.setUsernameCookie('Hallo Cookiesdfj')) {
        $location.path('/');
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

// AddTable Controller
.controller("addTableCtrl",
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
}])

// Add Player Controller
.controller("addPlayerCtrl",
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
}])

// Add Player to table
.controller("addPlayerToTableCtrl",
    ['$scope', '$http', '$log', '$location',
    function ($scope, $http, $log, $location) {

    $scope.message = "Add Player to Table";
    playerFactory.getPlayers()
        .success(function (data) {
            $scope.players = data;
        });
    $log.debug('using Player to table ctrl');
}])

// Errors
.controller("errorCtrl", [ , function(){
    $scope.message = "Error. WHAT'S HAPPENING. Have you Cookies and Javascript enabled???";
}])