myApp.controller('historyController', ['$scope', '$location', 'worksheetService', function($scope, $location, worksheetService) {
       $scope.pageModel = {
            username: "",
            password: "",
            authenticated: false,
            showValidationMessage: false,
            showLoginMessage: false
        }
        
       
       $scope.pageModel.currentStep = worksheetService.currentStep;
       
        worksheetService.getCurrentUser(function () {
            //console.log("here with user: " + user.displayName);
            if (!user) {
                $scope.pageModel.authenticated = true;
                //$scope.apply();
            }            
        });
        
        $scope.userSignout = function() {
            $scope.showLoading();
            worksheetService.signOut(function() {
                $scope.pageModel.authenticated = false;
                $scope.hideLoading();
            }, function() {
                $scope.hideLoading();
            });
        };
        
        $scope.userSignin = function() {
            //console.log("hello");
            if ($scope.$invalid || !$scope.pageModel.username || ($scope.pageModel.username.length === 0 ||
               $scope.pageModel.password.length === 0))
            {
                $scope.pageModel.showValidationMessage = true;
                return;
            }
            //console.log("hello");
            $scope.pageModel.showValidationMessage = false;
            $scope.showLoading();
            
            //try
            //{
                worksheetService.el.Users.login($scope.pageModel.username,
                    $scope.pageModel.password,
                    function (data) {
                        //console.log(JSON.stringify(data));
                        if (data && data.result) {
                            worksheetService.setAccessToken(data.result.access_token);
                            console.log("Fresh token: " + worksheetService.getAccessToken());
                            $scope.hideLoading();
                            //console.log("logged in!");
                            //window.location.hash="home";
                            $location.hash("home");
                        }
                        else {
                            $scope.hideLoading();
                            $scope.pageModel.showLoginMessage = true;
                        }
                    },
                    function(error){
                        //console.log("error:");
                        //console.log(JSON.stringify(error));
                        $scope.hideLoading();
                        $scope.pageModel.showLoginMessage = true;
                });
                
            //}
            //catch() {
                //$scope.hideLoading();
                //$scope.pageModel.showLoginMessage = true;
            //}
        };
        
        $scope.showLoading = function() {
            var opts = {
                  lines: 13, // The number of lines to draw
                  length: 8, // The length of each line
                  width: 4, // The line thickness
                  radius: 14, // The radius of the inner circle
                  corners: 1, // Corner roundness (0..1)
                  rotate: 0, // The rotation offset
                  direction: 1, // 1: clockwise, -1: counterclockwise
                  color: '#000', // #rgb or #rrggbb or array of colors
                  speed: 0.6, // Rounds per second
                  trail: 34, // Afterglow percentage
                  shadow: false, // Whether to render a shadow
                  hwaccel: false, // Whether to use hardware acceleration
                  className: 'spinner', // The CSS class to assign to the spinner
                  zIndex: 2e9, // The z-index (defaults to 2000000000)
                  top: '50%', // Top position relative to parent
                  left: '50%' // Left position relative to parent
                };
                var target = $("#spinner");
                $scope.spinner = new Spinner(opts).spin(target);
        };
        
        $scope.hideLoading = function() {
            //console.log("he");
            if ($scope.spinner) {
                //console.log("ho");
                $scope.spinner.stop();
            }
        };
        
    }]);