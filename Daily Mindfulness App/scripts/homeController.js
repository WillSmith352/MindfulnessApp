myApp.controller('homeController', ['$scope', '$location', 'worksheetService', function($scope, $location, worksheetService) {

    $scope.pageModel = {};
    $scope.pageModel.authenticated = false;
    $scope.pageModel.user = {};
    $scope.pageModel.displayName = "None";

    worksheetService.getCurrentUser(function(data) {
            if (data) {
                console.log("good");
                $scope.apply(function() {
                    $scope.pageModel.authenticated = false;
                    $scope.pageModel.displayName = data.DisplayName;
                });                
            }
            else {
                console.log("No user");
            }
        }, function(error) {
            console.log("Error: " + error);
    });
    
    //$scope.application = kendo.mobile.appplication;
    
    $scope.goWorksheet = function() {
        //$location.hash("views/worksheet.html");
        $location.path("views/worksheet.html");
        //location.href = "views/worksheet.html";
        //app.navigate("views/worksheet.html");
    };
    
    $scope.goSignin = function() {
        app.navigate("views/signin.html");
    };
    
}]);
