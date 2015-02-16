angular.module('mindfulMobileApp', [ 'kendo.directives', 'ngSanitize' ])
    .run(['worksheetService', function(worksheetService){
        worksheetService.init();
        worksheetService.setCurrentStep(1);
        worksheetService.loadData();
    }])
    .service('worksheetService', function() {
        this.init = function() {
            //the application DataSources
            this.worksheetData = new kendo.data.DataSource({
                data: [{
                    id: 1,
                    title: "Activating Event",
                    letter: "A",
                    description: "What happened to trigger this emotional response?",
                    hint: "",
                    textbox: false,
                    textarea: true,
                    emotional: false,
                    behavioral: false,
                    dispute: false,
                    disputeb: false
                },
                {
                    id: 2,
                    title: "Belief System",
                    letter: "B",
                    description: "What is your belief that leads you to the Response (C) listed in the next step?",
                    hint: "",
                    textbox: true,
                    textarea: false,
                    emotional: false,
                    behavioral: false,
                    dispute: false,
                    disputeb: false
                },
                {
                    id: 3,
                    title: "C1",
                    letter: "Consequence - Emotional",
                    description: "",
                    hint: "",
                    textbox: false,
                    textarea: false,
                    emotional: true,
                    behavioral: false,
                    dispute: false,
                    disputeb: false
                },
                {
                    id: 4,
                    title: "Consequence - Behavioral",
                    letter: "C2",
                    description: "",
                    hint: "",
                    textbox: false,
                    textarea: false,
                    emotional: false,
                    behavioral: true,
                    dispute: false,
                    disputeb: false
                },
                {
                    id: 5,
                    title: "Dispute the Belief System",
                    letter: "D1",
                    description: "Dispute the Belief by asking a question of the <b>Belief System</b> that led to the emotional consequence.",
                    hint: "",
                    textbox: false,
                    textarea: false,
                    emotional: false,
                    behavioral: false,
                    dispute: true
                },
                {
                    id: 6,
                    title: "Dispute the Belief System",
                    letter: "D2",
                    description: "Dispute the belief system by asking: How much do I believe in this Belief from 0 to 100%?",
                    hint: "",
                    textbox: false,
                    textarea: false,
                    emotional: false,
                    behavioral: false,
                    dispute: false,
                    disputeb: true
                },
                {
                    id: 7,
                    title: "Dispute the Belief System",
                    letter: "D3",
                    description: "Dispute the belief system by asking: What if my Belief was 100% factual up until this moment? What would the emotional consequences have been?",
                    hint: "",
                    textbox: false,
                    textarea: true,
                    emotional: false,
                    behavioral: false,
                    dispute: false,
                    disputeb: false
                },
                {
                    id: 8,
                    title: "D3",
                    letter: "",
                    description: "",
                    hint: "",
                    textbox: false,
                    textarea: true,
                    emotional: false,
                    behavioral: false,
                    dispute: false,
                    disputeb: false
                }],
                schema: {
                    model: { id: "id" }
                }
            });
            this.worksheetData.read();
            this.emotionsData = [
                {
                    "name": "Anger / Irritability",
                    "d1": "Why shouldn't...this way?"
                },
                {
                    "name": "Depression / Sadness",
                    "d1": "Are my needs really not being met?"
                },
                            {
                    "name": "Anxiety",
                    "d1": "Is it really that bad?"
                },
                {
                    "name": "Guilt",
                    "d1": "Did I really do something wrong and am I worthless?"
                }
            ];
            //observable array that will be used to store products that user has selected
            //this.added = new kendo.data.ObservableArray([]);
            this.currentStep = null;
            this.stepData = [];
        };
        
        this.saveStep = function(pageModel) {
            this.stepData[this.currentStep.id - 1] = pageModel;
        };
        
        this.loadData = function() {
            //take what we have saved and push it into stepData
            this.stepData = [];
            this.stepData.push({ textarea: "", textbox: "", emotion: "", physical: "", dispute: "" });
            this.stepData.push({ textarea: "", textbox: "", emotion: "", physical: "", dispute: "" });
            this.stepData.push({ textarea: "", textbox: "", emotion: "", physical: "", dispute: "" });
            this.stepData.push({ textarea: "", textbox: "", emotion: "", physical: "", dispute: "" });
            this.stepData.push({ textarea: "", textbox: "", emotion: "", physical: "", dispute: "" });
            this.stepData.push({ textarea: "", textbox: "", emotion: "", physical: "", dispute: "" });
            this.stepData.push({ textarea: "", textbox: "", emotion: "", physical: "", dispute: "" });
        };
        
        this.getStepData = function(idx) {
            return this.stepData[idx];
        };
        
        this.setCurrentStep = function(id) {
            this.currentStep = this.worksheetData.get(id);
        };
        
    })
    .controller('homeController', ['$scope', 'worksheetService', function($scope, worksheetService) {
        $scope.worksheetService = worksheetService;
        
        $scope.loadStep = function() {
            $scope.pageModel = worksheetService.getStepData(worksheetService.currentStep.id - 1);
        };
        
        $scope.loadStep();
        
        $scope.showNext = function() { return worksheetService.currentStep.id < 7; };
        $scope.showPrev = function() { return worksheetService.currentStep.id > 1; };
        
        $scope.goPrevStep = function() {
            worksheetService.saveStep($scope.pageModel);
            worksheetService.setCurrentStep(worksheetService.currentStep.id - 1);
            $scope.loadStep();
        };
        
        $scope.goNextStep = function() {
            worksheetService.saveStep($scope.pageModel);
            worksheetService.setCurrentStep(worksheetService.currentStep.id + 1);
            $scope.loadStep();
        };
        
    }]);
