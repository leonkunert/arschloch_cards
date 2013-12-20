'use strict';
// Declare app level module which depends on and services
angular.module('arschloch', [
    'ngRoute',
    'ngCookies',
    'arschloch.controllers',
    'arschloch.factories'
])

// Config for Routes
.config(
    ['$routeProvider', '$locationProvider',
    function ($routeProvider, $locationProvider) {

    $routeProvider
        .when('/', {templateUrl: '/partials/overview.html', controller: 'OverviewCtrl'})
        .when('/table/:tableId', {templateUrl: '/partials/table.html', controller: 'TableCtrl'})
        .when('/add/table', {templateUrl: '/partials/addTable.html', controller: 'addTableCtrl'})
        .when('/add/player', {templateUrl: '/partials/addPlayer.html', controller: 'addPlayerCtrl'})
        .when('/com/table/:tableId', {templateUrl: '/partials/addPlayerToTable.html', controller: 'addPlayerToTableCtrl'})
        .when('/register', {templateUrl: '/partials/register.html', controller: 'registerCtrl'})
        .when('/error', {templateUrl: '/partials/error.html', controller: 'errorCtrl'})

        .otherwise({redirectTo: '/error'});
    $locationProvider.html5Mode(true);
}])

// Config for Logs
.config(function ($logProvider) {
    $logProvider.debugEnabled(true);
});