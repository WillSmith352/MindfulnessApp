myApp.controller('registerController', ['$scope', 'worksheetService', function($scope, worksheetService) {
        $scope.pageModel = {
            email: "",
            password: "",
            password2: "",
            showValidationMsg: false,
            showPasswordMsg: false
        }
        
        $scope.handleError = function(data) {
            //console.log("Error: " + JSON.stringify(data));
            var msg = "An unknown error has occurred. Please try again.";
            
            if (data && data.message) {
                $scope.pageModel.errorMessage = data.message;
            }
        };
        
        $scope.register = function() {
            
            //console.log("here with email: " + $scope.pageModel.email);
            
            worksheetService.signOut();
            
            if ($scope.pageModel.email.length === 0 ||
               $scope.pageModel.password.length === 0 ||
               $scope.pageModel.password2.length === 0)
            {
                $scope.pageModel.showValidationMsg = true;
                return;
            }
            
            //check password
            if ($scope.pageModel.password.length < 8) {
                $scope.pageModel.showPasswordMsg2 = true;
                return;
            }
            
            if ($scope.pageModel.password !== $scope.pageModel.password2) {
                $scope.pageModel.showPasswordMsg = true;
                return;
            }
            
            var username = $scope.pageModel.email;
            var password = $scope.pageModel.password;
            var user = {
                "DisplayName": $scope.pageModel.email,
                "Email": $scope.pageModel.email
            }
            
            //disable button?
            
            worksheetService.el.Users.register(username,
                password,
                user,
                function (data) {
                    if (data && data.result) {
                        //var accountId = data.result.Id;
                        worksheetService.setAccessToken(data.result.access_token);
                        console.log("registered!");
                        console.log(JSON.stringify(data));
                        window.location.href="#home";
                        return;
                    }
                    $scope.handleError({message: "Received an invalid response from the server during register process."});
                },
                function(error){
                    //console.log(JSON.stringify(error));
                    $scope.handleError(error);
                });
            
            //enable button
            
        };
           
    }]);
    