myApp.controller('homeController', ['$scope', '$location', 'worksheetService', function ($scope, $location, worksheetService) {
  $scope.pageModel = {};
  $scope.pageModel.authenticated = false;
  $scope.pageModel.user = {};
  $scope.pageModel.displayName = "None";

  worksheetService.isWorksheet = false;
  worksheetService.setCurrentPath("#home");
  
  worksheetService.getCurrentUser(function (data) {
    if (data) {
      console.log("good");
      $scope.pageModel.authenticated = true;
      $scope.pageModel.displayName = data.DisplayName;
    }
    else {
      console.log("No user");
    }
  }, function (error) {
    console.log("Error: " + error);
  });

  //Is there any way to get this to work?
  //$scope.application = kendo.mobile.Appplication;

  $scope.goWorksheet = function () {
    $location.path("views/worksheet.html");
  };

  $scope.goSignin = function () {
    app.navigate("views/signin.html");
  };

}]);
