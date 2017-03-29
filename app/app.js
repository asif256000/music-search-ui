'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('GreedyGame',['ui.router','ui.bootstrap','ngStorage'])

    .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

      $urlRouterProvider.otherwise("/");

      $stateProvider
          .state('main',{
            url: '/',
            templateUrl: "pages/songSearchModule/view/songSearchTemplate.html",
            controller: "searchCtrl"
          })


    }])