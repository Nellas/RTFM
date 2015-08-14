var app = angular.module('rtfmApp', ['firebase', 'ngRoute']);

app.constant('fb', {
    url: 'https://lukertfm.firebaseio.com'
});

app.config(function($routeProvider) {

    $routeProvider
        .when('/threads', {
            templateUrl: 'js/threads/threads.html',
            controller: 'threadsCtrl',
            resolve: {
                threadsRef: function(threadsService) {
                    return threadsService.getThreads();
                }
            }
        })

        .when('/threads/:threadId', {
            templateUrl: '/js/thread/thread.html',
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
            redirectTo: '/threads'
        })
});