/*var app = new kendo.mobile.Application(document.body, {
    skin: "flat",
    layout: "default"
});*/
//var app = new kendo.mobile.Application();
var myApp = angular.module('mindfulMobileApp', [ 'kendo.directives', 'ngSanitize', 'ngRoute' ])
    .run(['worksheetService', function(worksheetService){
            worksheetService.init();
    }])
        
    .config(['$locationProvider',
      function($locationProvider) {
        $locationProvider.html5Mode({
          enabled: true,
          requireBase: false
        });
    }])

    .controller('testController', ['$scope', 'worksheetService', function($scope, worksheetService) {
        $scope.worksheetService = worksheetService;
    }])

    .directive('spinIndicator', ['worksheetService', function(worksheetService) {
        return {
            link: function(scope, element) {
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
                //var target = document.getElementById("foo");
                //worksheetService.spinner = new Spinner(opts).spin(target);
                //worksheetService.spinner = new Spinner(opts).spin(element);
                var foo = new Spinner(opts).spin(element);

            }
        }
    }]);