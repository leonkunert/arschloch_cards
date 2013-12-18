angular.module('arschloch.factories', [])

// Player Factory
.factory('playerFactory', ['$http', function ($http) {
    // Getting all Players
    playerFactory = {};

    playerFactory.getPlayers = function () {
        return $http.get("http://localhost:3003/v1/players");
    };

    return playerFactory;
}])

// Player Factory
.factory('tableFactory', ['$http', function ($http) {
    // Getting all Players
    tableFactory = {};

    tableFactory.getTables = function () {
        return $http.get("http://localhost:3003/v1/tables");
    };

    return tableFactory;
}]);