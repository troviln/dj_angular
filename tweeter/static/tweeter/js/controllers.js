var tweeterControllers = angular.module('tweeterApp.controllers', []);

tweeterControllers.controller('TweetCtrl', function TweetCtrl($scope, Tweet) {
  $scope.tweets = {};

  Tweet.query(function (response) {
    $scope.tweets = response;
  });

  $scope.submitTweet = function(text_in) {
    var tweet = new Tweet({text: text_in});
    tweet.$save(function(){
      $scope.tweets.unshift(tweet);
    })
    $scope.text_in = null;
    $scope.personForm.$setPristine();

  }



  $scope.deleteTweet = function(id) {
    Tweet.delete({id: id}, function(){

      Tweet.query(function (response) {
        $scope.tweets = response; });
    });
  }


});

tweeterControllers.controller('UserCtrl', function UserCtrl($scope, Tweet, User, AuthUser) {
  $scope.tweets = {};
  id = AuthUser.id;
  User.get({id:id}, function(response) {
    $scope.user = response;
    $scope.tweets = response.tweets;
  });

  $scope.deleteTweet = function(id) {
    Tweet.delete({id: id}, function(){
      id = AuthUser.id;
      User.get({id:id}, function(response) {
        $scope.tweets = response.tweets;
  });
    });}

   $scope.submitTweet = function(text) {
    var tweet = new Tweet({text: text});
    tweet.$save(function(){
      $scope.tweets.unshift(tweet);
    })
  }
});

