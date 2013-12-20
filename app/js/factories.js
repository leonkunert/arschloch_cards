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

    tableFactory.rmTable = function (tableId) {
        return $http.post("http://localhost:3003/v1/rm/table/id/" + tableId);
    };

    return tableFactory;
}])

// Cookie Factory
.factory('cookieFactory', ['$http', function ($http) {
    cookieFactory = {};

    // Set Cookies
    cookieFactory.setCookie = function (cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime()+(exdays*24*60*60*1000));
        var expires = "expires="+d.toGMTString();
        document.cookie = cname + "=" + cvalue + "; " + expires;
    }

    // Get Cookies
    cookieFactory.getCookie = function (cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for(var i=0; i<ca.length; i++) {
            var c = ca[i].trim();
            if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
        }
        return "";
    }

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