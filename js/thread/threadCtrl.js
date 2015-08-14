var app = angular.module('rtfmApp').controller('threadCtrl', function($scope, threadRef, $firebaseObject, commentsRef, $firebaseArray) {

    var thread = $firebaseObject(threadRef);

    thread.$bindTo($scope, 'thread');

    //setInterval(function(){
    //    console.log($scope.thread);
    //}, 1000);

    $scope.comments = $firebaseArray(commentsRef);

    $scope.createComment = function(username, text) {
        $scope.comments.$add({
            username: username,
            text: text
        })
    };





});