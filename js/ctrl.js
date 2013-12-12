var app = angular.module("app", []);

app.controller("AppCtrl", function($http) {
    var app = this;

    // Getting all Tables
    $http.get("http://localhost:3003/v1/tables")
        .success(function(data) {
            console.log(data);
            app.tables = data;
        });

    // Getting all Players
    $http.get("http://localhost:3003/v1/players")
        .success(function(data) {
            console.log(data);
            app.players = data;
        })
});