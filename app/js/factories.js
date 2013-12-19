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
}])

// Cookie Factory
.factory('cookieFactory', ['$http', function ($http) {
    cookieFactory = {};

    cookieFactory.getUsernameCookie = function () {
        console.log(window.document.cookie);
        if (!document.cookie) {
            alert('BAD NEWS: Cookies have to be enabled');
            return false;
        } else {
            return window.document.cookie;
        }
    };

    cookieFactory.setUsernameCookie = function (username) {
        if (!document.cookie) {
            // If Cookies are disabled
            alert('BAD NEWS: Cookies have to be enabled');
            return false;
        } else {
            var date    = new Date();
            var expires = date.getTime() + (365 * 24 * 60 * 60 * 1000);
            date.setTime(expires);
            window.document.cookie = "username=" + username + "; expires=" + date.toGMTString();
            return true;
        }
    };

    return cookieFactory;
}]);