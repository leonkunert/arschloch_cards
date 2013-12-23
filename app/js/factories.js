angular.module('arschloch.factories', [])

// Player Factory
.factory('playerFactory', ['$http', function ($http) {
    // Getting all Players
    playerFactory = {};

    playerFactory.getPlayers = function () {
        return $http.get("http://localhost:3003/v1/players");
    };

    playerFactory.getPlayer = function (playerId) {
        return $http.get("http://localhost:3003/v1/player/" + playerId);
    };

    playerFactory.addPlayer = function (playerName) {
        return $http.post("http://localhost:3003/v1/add/player", {"playerName": playerName, "authKey": "dsd"});
    };

    playerFactory.updatePlayer = function (playerId, playerName) {
        return $http.put("http://localhost:3003/v1/up/player/" + playerId, {"playerName": playerName, "authKey": "dsd"});
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

    tableFactory.getTable = function (tableId) {
        return $http.get("http://localhost:3003/v1/table/" + tableId);
    };

    tableFactory.joinTable = function (tableId, playerId) {
        return $http.put("http://localhost:3003/v1/up/table/" + tableId + "/" + playerId);
    };

    tableFactory.addTable = function (maxPlayers) {
        return $http.post("http://localhost:3003/v1/add/table", {"maxPlayers": maxPlayers, "authKey": "dsd"});
    };

    return tableFactory;
}])

// Cookie Factory
.factory('cookieFactory', ['$http', 'playerFactory', function ($http, playerFactory) {
    cookieFactory = {};

    // Set Cookies
    cookieFactory.setCookie = function (cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toGMTString();
        document.cookie = cname + "=" + cvalue + "; " + expires;
        console.log(document.cookie);
    };

    cookieFactory.setPlayerName = function (playerName, exdays) {
        // Set Username Cookie
        cookieFactory.setCookie('playerName', playerName, exdays);

        // If no id is found add Player to DB
        if (!cookieFactory.getCookie('_id')) {
            console.log('no id_');
            playerFactory.addPlayer(playerName)
                .success(function (data) {
                    console.log(data);
                    cookieFactory.setCookie('_id', data._id, exdays);
                });
        } else {
            // If id is found update Player in DB
            console.log('Found id_');
            var _id = cookieFactory.getCookie('_id');
            playerFactory.updatePlayer(playerName, _id)
                .success(function (data) {
                    console.log(data);
                    cookieFactory.setCookie('_id', data._id, exdays);
                });
        }
    };

    // Get Cookies
    cookieFactory.getCookie = function (cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i].trim();
            if (c.indexOf(name) === 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    };

    // Check for Cookies
    cookieFactory.checkCookie = function () {
        if (!document.cookie) {
            return false;
        } else {
            return true;
        }
    };

    return cookieFactory;
}]);