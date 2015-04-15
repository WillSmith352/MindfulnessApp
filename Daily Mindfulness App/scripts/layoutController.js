myApp.controller('layoutController', ['$scope', '$location', 'worksheetService', function ($scope, $location, worksheetService) {
  $scope.pageModel = {};
  $scope.worksheetService = worksheetService;
  
  $scope.goBack = function() {
    //Either go to the prior step or to the previous path
    if (worksheetService.isWorksheet) {
      if (worksheetService.currentStep && worksheetService.currentStep.id && worksheetService.currentStep.id > 1) {
        worksheetService.setCurrentStep(worksheetService.currentStep.id - 1);
        //console.log("here");
        return;
      }
    }

    if (worksheetService.hasNavigated()) {
      if (worksheetService.previousPath.indexOf("#") >= 0) {
        console.log("hash");
        $location.hash(worksheetService.previousPath.substring(1));
        return;
      }
      else {
        console.log("nav to: " + worksheetService.previousPath);
        //$location.path(worksheetService.previousPath);
        var router = new kendo.Router();
        router.start();
        router.navigate(worksheetService.previousPath);
        //window.location.href = worksheetService.previousPath;
        return;
      }
    }

    console.log("bar");
  };
  
  $scope.getStatusLink = function() {
    worksheetService.getCurrentUser(function(user) {
      if (user && user.displayName && user.displayName.length > 0) {
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
  
  $scope.showBackButton = function() {
    return worksheetService.showBackButton();
  };
  
}]);
