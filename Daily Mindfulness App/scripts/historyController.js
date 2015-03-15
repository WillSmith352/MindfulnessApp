myApp.controller('historyController', ['$scope', '$location', 'worksheetService', function($scope, $location, worksheetService) {
   $scope.pageModel = {
        authenticated: false
    }

    $scope.pageModel.currentStep = worksheetService.currentStep;

    worksheetService.getCurrentUser(function (user) {
        //console.log("here with user: " + user.displayName);
        if (!user) {
            $scope.pageModel.authenticated = true;
            $scope.$apply();
        }            
    });
}]);