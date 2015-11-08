var app = angular.module('scredscoreApp', []);
app.controller("mainController", function ($scope, $http) {
    $http.get('/scores.json').then(function (result) {
        $scope.days = result.data.map(function (i) {
            var mom =
            i._id.date = moment(i._id.date, "YYYY-M-D").format('YYYY-MM-DD');
            return i;
        });
    }, function (err) {
        console.log("Error:", err);
    });
});
