myApp.controller('layoutController', ['$scope', '$location', 'worksheetService', function ($scope, $location, worksheetService) {
  $scope.pageModel = {};
  $scope.worksheetService = worksheetService;
  this.goBack = function() {
    //Either go to the prior step or to the previous path
    if (worksheetService.isWorksheet) {
      if (worksheetService.currentStep && worksheetService.currentStep.id && worksheetService.currentStep.id > 0) {
        worksheetService.setCurrentStep(worksheetService.currentStep.id - 1);
        return;
      }
    }

    if (worksheetService.hasNavigated()) {
      console.log("nav to: " + worksheetService.previousPath);
      $location.path(worksheetService.previousPath);
    }
    else {
      //??
    }
  };
  
  $scope.getStatusLink = function() {
    worksheetService.getCurrentUser(function(user) {
      if (user && user.displayName.length > 0) {
        $scope.pageModel.statusLink = "Account";
      }
      $scope.pageModel.statusLink = "Sign In";
    },
    function(error) {
      //error
    });
  };
  $scope.pageModel.statusLink = "";
  $scope.getStatusLink();
}]);
