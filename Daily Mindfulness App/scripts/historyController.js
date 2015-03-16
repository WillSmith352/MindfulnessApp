myApp.controller('historyController', ['$scope', '$location', 'worksheetService', function ($scope, $location, worksheetService) {
  $scope.pageModel = {
    authenticated: false
  }

  worksheetService.isWorksheet = false;
  
  $scope.pageModel.currentStep = worksheetService.currentStep;

  //get last 25 for now
  $scope.worksheetData = [];
  worksheetService.getWorksheetHistory(0, 25, function(data) {
    //console.log("got query data");
    //console.log(data);
    $scope.worksheetData = data.result;
    $scope.$apply();
  });
  
  worksheetService.getCurrentUser(function (user) {
    //console.log("here with user: " + user.displayName);
    if (user) {
      $scope.pageModel.authenticated = true;
      //$scope.$apply();
    }
  });
}]);