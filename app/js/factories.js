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

    // Get Username from Cookies
    cookieFactory.getUsernameCookie = function () {
        console.log(window.document.cookie);
        //if checkCookie() ? true : false;
    };

    // Set Username in Cookies
    cookieFactory.setUsernameCookie = function (username) {
        if (!this.checkCookie()) {
            // If Cookies are disabled
            console.log('BAD NEWS: Cookies have to be enabled');
            return false;
        } else {
            var date    = new Date();
            var expires = date.getTime() + (365 * 24 * 60 * 60 * 1000);
            date.setTime(expires);
            window.document.cookie = "username=" + username + "; expires=" + date.toGMTString();
            return true;
        }
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