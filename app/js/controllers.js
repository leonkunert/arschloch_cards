'use strict';
/* Controllers */

angular.module('arschloch.controllers', [])

// Overview Controller
.controller("OverviewCtrl", function ($scope, $http, $log, $location, playerFactory, tableFactory, cookieFactory, socket) {

    $scope.message = "Overview";
    socket.on('test', function(data) {
        console.log(data);
    });

    socket.emit('joinOverview', {'playerName': cookieFactory.getCookie('playerName'), 'playerId': cookieFactory.getCookie('_id')})

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
})

// Table Controller
.controller("TableCtrl", function ($scope, $routeParams, $http, $log, tableFactory, playerFactory, cookieFactory, socket) {

    $scope.message    = "Add Table";
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
    socket.emit('joinTable', {'playerName': $scope.playerName, 'playerId': $scope.playerId});
    $log.debug('using Table ctrl');
    socket.on('newPlayer', function (data) {
        playerFactory.getPlayer(data.playerId)
            .success(function (playerData) {
                $scope.players.push(playerData);
            });
    })
})

// Register
.controller("registerCtrl", function ($scope, $location, $log, cookieFactory, playerFactory) {

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
})

.controller("addTableCtrl", function ($scope, $location, tableFactory) {
    $scope.message = 'Add a new Table';
    $scope.addTable = function (maxPlayers) {
        tableFactory.addTable(maxPlayers)
            .success(function (data) {
                $location.path('/');
            });
    };
})

.controller("profileCtrl", function ($scope, $location, $log, cookieFactory, playerFactory) {
    $scope.message    = 'The Data we have got:';
    // getting all Player Data
    var playerData;
    playerFactory.getPlayer(cookieFactory.getCookie('_id'))
        .success(function (data) {
            $scope.playerData = data;
        });
    console.log($scope);
    $log.debug('using Profile ctrl');
})

.controller("statusCtrl", function ($scope, $log, socket) {
    $scope.messages = [];
    socket.on('test', function(data) {
        $scope.messages.push(data);
    });
    $log.debug('using status ctrl');
})

// Errors
.controller("errorCtrl", function ($scope, $log, cookieFactory) {
    $scope.message = "Error. WHAT'S HAPPENING. Have you Cookies and Javascript enabled???";
    cookieFactory.checkCookie();
    $log.debug('using Error ctrl');
});