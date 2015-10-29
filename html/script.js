var app = angular.module('scredscoreApp', []);
app.controller("mainController", function ($scope, $http) {
  $http.get('/scores.json').then(function (result) {
    $scope.days = result.data;
    console.log($scope.days);
  }, function (err) {
    console.log("Error:", err);
  });
});
