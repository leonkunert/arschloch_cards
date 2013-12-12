var app = angular.module("app", []);

app.controller("AppCtrl", function ($http) {
    var app = this;

    // Getting all Tables
    $http.get("http://localhost:3003/v1/tables")
        .success(function (data) {
            app.tables = data;
        });
});