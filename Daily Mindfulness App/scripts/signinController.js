myApp.controller('signinController', ['$scope', '$location', 'worksheetService', function ($scope, $location, worksheetService) {
  $scope.pageModel = {
    username: "",
    password: "",
    authenticated: false,
    showValidationMessage: false,
    showLoginMessage: false
  }

  worksheetService.getCurrentUser(function (data) {
    //console.log("here with user: " + user.displayName);
    if (data) {
      $scope.pageModel.authenticated = true;
      //$scope.$apply();
    }
  });

  $scope.userSignout = function () {
    worksheetService.showLoading();
    worksheetService.signOut(function () {
      $scope.pageModel.authenticated = false;
      worksheetService.hideLoading();
      $scope.$apply();
    }, function () {
      worksheetService.hideLoading();
    });
  };

  $scope.userSignin = function () {
    if ($scope.$invalid || !$scope.pageModel.username || ($scope.pageModel.username.length === 0 || $scope.pageModel.password.length === 0)) {
      $scope.pageModel.showValidationMessage = true;
      return;
    }

    $scope.pageModel.showValidationMessage = false;

    worksheetService.isWorksheet = false;
    worksheetService.showLoading();

    //try
    //{
    worksheetService.el.Users.login($scope.pageModel.username,
        $scope.pageModel.password,
        function (data) {
          //console.log(JSON.stringify(data));
          if (data && data.result) {
            console.log("Fresh token: " + worksheetService.getAccessToken());
            worksheetService.setAccessToken(data.result.access_token);
            //worksheetService.currentUser = data.result;
            
            //pre-cache user-info
            worksheetService.getCurrentUser(function(){}, function(){});
            
            worksheetService.hideLoading();
            $scope.pageModel.authenticated = true;
            //console.log("logged in!");
            //window.location.hash="home";
            //$location.hash("home");
          }
          else {
            worksheetService.hideLoading();
            $scope.pageModel.showLoginMessage = true;
          }
          $scope.$apply();
        },
        function (error) {
          //console.log("error:");
          //console.log(JSON.stringify(error));
          worksheetService.hideLoading();
          $scope.pageModel.showLoginMessage = true;
          $scope.$apply();
        });

    //}
    //catch() {
    //$scope.hideLoading();
    //$scope.pageModel.showLoginMessage = true;
    //}
  };

  $scope.showLoading = function () {
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
    $scope.spinner = new Spinner(opts);
    $scope.spinner.spin(target);
  };

  $scope.hideLoading = function () {
    //console.log("he");
    if ($scope.spinner) {
      //console.log("ho");
      $scope.spinner.stop();
    }
  };

}]);