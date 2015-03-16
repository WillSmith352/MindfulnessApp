myApp.controller('worksheetController', ['$scope', 'worksheetService', function ($scope, worksheetService) {
  $scope.worksheetService = worksheetService;

  $scope.loadStep = function () {
    //console.log("Current step: " + worksheetService.currentStep.id);
    //$scope.stepModel = worksheetService.getStepData(worksheetService.currentStep.id - 1);
    $scope.pageModel.isSubmitted = false;
  };

  $scope.mode = "home";
  $scope.pageModel = {};
  $scope.pageModel.isSubmitted = false;
  $scope.pageModel.user = {};
  $scope.pageModel.authenticated = false;
  $scope.pageModel.displayName = "None";

  $scope.stepModel = {
    ActivatingEvent: '',
    BeliefSystem: '',
    EmotionalConsequence: '',
    BehavioralConsequence: '',
    Dispute1: '',
    Dispute2: '',
    Dispute3: '',
    Dispute4a: '',
    Dispute4b: '',
    Dispute4c: '',
    EmotionalConsequence: ''
  };

  worksheetService.isWorksheet = true;
  
  worksheetService.getCurrentUser(function (data) {
    if (data) {
      $scope.pageModel.displayName = data.DisplayName;
      $scope.pageModel.authenticated = true;
      //$scope.$apply();
    }
    else {
      //console.log("No user");
    }
  }, function (error) {
    console.log("Error: " + error);
  });

  $scope.loadStep();

  //load user response data?
  

  //Now stuff is loaded for the current step
  $scope.getDisputeFromEmotion = function () {
    var emotion = $scope.stepModel.EmotionalConsequence;
    //console.log(emotion);
    var d = "(Nothing)";

    for (var i = 0; i < worksheetService.emotionsData.length; i++) {
      if (worksheetService.emotionsData[i].key == emotion.toLowerCase()) {
        d = worksheetService.emotionsData[i].d1;
      }
    }
    return d;
  };

  $scope.showNext = function () { return worksheetService.currentStep.id < worksheetService.worksheetData.data().length - 1; };
  $scope.showPrev = function () { return worksheetService.currentStep.id > 1 && worksheetService.currentStep.id < worksheetService.worksheetData.data().length; };
  $scope.showFinish = function () { return worksheetService.currentStep.id == worksheetService.worksheetData.data().length - 1; };

  $scope.goPrevStep = function () {
    worksheetService.saveResponse($scope.pageModel);
    worksheetService.setCurrentStep(worksheetService.currentStep.id - 1);
    $scope.loadStep();
  };

  $scope.isValid = function () {
    if (worksheetService.currentStep.id == 3) {
      if (!$scope.stepModel.EmotionalConsequence || $scope.stepModel.EmotionalConsequence.length == 0) {
        return false;
      }
    }
    if (worksheetService.currentStep.id == 4) {
      if ((!$scope.pageModel.body || $scope.pageModel.body.length == 0) &&
         (!$scope.pageModel.breath || $scope.pageModel.breath.length == 0) &&
         (!$scope.pageModel.cranium || $scope.pageModel.cranium.length == 0)) {
        return false;
      }
    }
    else {
      //if (!$scope.stepModel.response || $scope.stepModel.response.length < 1) {
      //    return false;
      //}
    }
    return true;
  }

  $scope.goNextStep = function () {
    $scope.pageModel.isSubmitted = true;

    //validate
    if (!$scope.isValid()) {
      return;
    }
    //worksheetService.saveResponse($scope.pageModel);
    worksheetService.setCurrentStep(worksheetService.currentStep.id + 1);
    $scope.loadStep();
  };

  $scope.saveWorksheet = function () {
    //validate?

    //fix a few things
    var behavior = "";
    if ($scope.pageModel.body && $scope.pageModel.body.length > 0) {
      behavior += $scope.pageModel.body;
    }

    if ($scope.pageModel.breath && $scope.pageModel.breath.length > 0) {
      behavior += $scope.pageModel.breath;
    }

    if ($scope.pageModel.cranium && $scope.pageModel.cranium.length > 0) {
      behavior += $scope.pageModel.cranium;
    }

    $scope.stepModel.BehavioralConsequence = behavior;

    //console.log($scope.stepModel);
    worksheetService.saveWorksheetEntry($scope.stepModel);

    worksheetService.setCurrentStep(worksheetService.currentStep.id + 1);
  };

  $scope.startOver = function () {
    //Clear data?
    //worksheetService.clearData();
    worksheetService.loadData();

    worksheetService.setCurrentStep(1);
    $scope.loadStep();
  };

  $scope.spinner = {};

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
    var target = document.getElementById("body");
    //worksheetService.spinner = new Spinner(opts).spin(target);
    $scope.spinner = new Spinner(opts).spin(element);
  };

  $scope.hideLoading = function () {
    if ($scope.spinner) {
      $scope.spinner.stop();
    }
  };

}]);