var app = angular.module('rtfmApp', ['ngRoute', 'firebase']);

app.constant('fb', {
    url: 'https://lukertfm.firebaseio.com'
});

app.config(function($routeProvider){

    $routeProvider
        .when('/login',{
            templateUrl: 'login.html',
            controller: 'LoginCtrl'
        })
        .when('/dashboard/:userId', {
            templateUrl: 'dashboard.html',
            controller: 'DashboardCtrl',
            resolve: {
                userReference: function(firebaseService, $route){
                    return firebaseService.getUser($route.current.params.userId);
                },
                thingsReference: function(firebaseService, $route){
                    return firebaseService.getThings($route.current.params.userId);
                }
            }
        })

        .when('/threads', {
            templateUrl: 'threads.html',
            controller: 'threadsCtrl',
            resolve: {
                threadsRef: function(threadsService) {
                    return threadsService.getThreads();
                }
            }
        })

        .when('/threads/:threadId', {
            templateUrl: 'thread.html',
            controller: 'threadCtrl',
            resolve: {
                threadRef: function(threadsService, $route) {
                    return threadsService.getThread($route.current.params.threadId);
                },
                commentsRef: function(threadsService, $route) {
                    return threadsService.getComments($route.current.params.threadId);
                }
            }
        })

        .otherwise({
            redirectTo: '/login'
        });
});