var myApp = angular.module('myApp', []);
myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {
  
var refresh = function() {
  $http.get('/trips').success(function(response) {
    $scope.trips = response;
    $scope.trip = "";
  });
};

refresh();

$scope.addTrip = function() {
  $http.post('/trips', $scope.trip).success(function(response) {
    refresh();
  });
};

$scope.remove = function(id) {
  console.log(id);
  $http.delete('/trips/' + id).success(function(response) {
    refresh();
  });
};

$scope.edit = function(id) {
  console.log(id);
  $http.get('/trips/' + id).success(function(response) {
    $scope.trip = response;
  });
}; 

$scope.update = function() {
  console.log($scope.trip._id);
  $http.put('/trips/' + $scope.trip._id, $scope.trip).success(function(response) {
    refresh();
  })
};

$scope.getRemaining = function(trip){
	var remainder =  parseInt(trip.budget) - (parseInt(trip.airfareCost) + parseInt(trip.lodgingCost) + parseInt(trip.miscCost));
	return remainder;
}

$scope.deselect = function() {
  $scope.trip = "";
}

}]);﻿




