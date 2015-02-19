angular.module('mindfulMobileApp', [ 'kendo.directives', 'ngSanitize' ])
    .run(['worksheetService', function(worksheetService){
        worksheetService.init();
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
                    hint: "Explain briefly what event or action occurred to trigger your response.",
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
                    description: "What is your Belief that leads you to one of the Responses (C) listed in the next step?",
                    hint: "",
                    textbox: false,
                    textarea: true,
                    emotional: false,
                    behavioral: false,
                    dispute: false,
                    disputeb: false
                },
                {
                    id: 3,
                    title: "Consequence - Emotional",
                    letter: "C1",
                    description: "What were the Emotional consequences? Select just one.",
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
                    description: "Please also describe the physical sensations in the Breath, Body and Cranium.",
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
                    dispute: true,        //Dispute 1
                    dispute2: false,
                    dispute3: false,
                    dispute4a: false,
                    dispute4b: false,
                    dispute4c: false
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
                    dispute2: true,        //Dispute 2
                    dispute3: false,
                    dispute4a: false,
                    dispute4b: false,
                    dispute4c: false
                },
                {
                    id: 7,
                    title: "Dispute the Belief System",
                    letter: "D3",
                    description: "Dispute the belief system by asking: What if the Belief had never entered my mind, then what would the emotional consequences have been?",
                    hint: "",
                    textbox: false,
                    textarea: true,
                    emotional: false,
                    behavioral: false,
                    dispute: false,
                    dispute2: false,
                    dispute3: true,
                    dispute4a: false,
                    dispute4b: false,
                    dispute4c: false
                },
                {
                    id: 8,
                    title: "Dispute the Belief System",
                    letter: "D4a",
                    description: "Dispute the belief system by asking: What if my Belief was 100% factual up until this moment? What would the emotional consequences have been?",
                    hint: "",
                    textbox: false,
                    textarea: false,
                    emotional: false,
                    behavioral: false,
                    dispute: false,
                    dispute2: false,
                    dispute3: false,
                    dispute4a: true,
                    dispute4b: false,
                    dispute4c: false
                },
                {
                    id: 9,
                    title: "Dispute the Belief System",
                    letter: "D4b",
                    description: "Dispute the belief system by asking: What if my Belief was 100% factual up until this moment? What would the emotional consequences have been?",
                    hint: "",
                    textbox: false,
                    textarea: true,
                    emotional: false,
                    behavioral: false,
                    dispute: false,
                    dispute2: false,
                    dispute3: false,
                    dispute4a: false,
                    dispute4b: true,
                    dispute4c: false
                },
                {
                    id: 10,
                    title: "Dispute the Belief System",
                    letter: "D4c",
                    description: "What if my Belief was 100% factual up until this moment? What would the emotional consequences have been?",
                    hint: "",
                    textbox: false,
                    textarea: true,
                    emotional: false,
                    behavioral: false,
                    dispute: false,
                    dispute2: false,
                    dispute3: false,
                    dispute4a: false,
                    dispute4b: false,
                    dispute4c: true
                },
                {
                    id: 11,
                    title: "Effective, Elegant, and Efficient Change in Emotion & Behavior",
                    letter: "E",
                    description: "This aspect can often look something like a positive affirmation.<br><br>This is an experiential change in the former emotional and physiological consequences and begins to build new, healthy neural pathways in the brain.",
                    hint: "I feel better and less angry, dpressed, anxious, or guilty when I notice or become aware that...",
                    textbox: false,
                    textarea: true,
                    emotional: false,
                    behavioral: false,
                    dispute: false,
                    dispute2: false,
                    dispute3: false,
                    dispute4a: false,
                    dispute4b: false,
                    dispute4c: false
                },
                {
                    id: 12,
                    title: "Worksheet Complete",
                    letter: "",
                    description: "You are all set! Your data has been saved to your History.",
                    hint: "",
                    textbox: false,
                    textarea: false,
                    emotional: false,
                    behavioral: false,
                    dispute: false,
                    dispute2: false,
                    dispute3: false,
                    dispute4a: false,
                    dispute4b: false,
                    dispute4c: false,
                    complete: true
                }],
                schema: {
                    model: { id: "id" }
                }
            });
            this.worksheetData.read();
            this.emotionsData = [
                {
                    "name": "Anger / Irritability",
                    "key": "anger",
                    "d1": "Why shouldn't...this way?"
                },
                {
                    "name": "Depression / Sadness",
                    "key": "depression",
                    "d1": "Are my needs really not being met?"
                },
                            {
                    "name": "Anxiety",
                    "key": "anxiety",
                    "d1": "Is it really that bad?"
                },
                {
                    "name": "Guilt",
                    "key": "guilt",
                    "d1": "Did I really do something wrong and am I worthless?"
                }
            ];
            
            this.currentStep = null;
            this.stepData = [];
            
            //Start at step 1
            this.setCurrentStep(1);

            var applicationSettings = {
                apiKey: 'EKv2hddSm1LbhrRX'
            };
            this.apiKey = applicationSettings.apiKey;
            
            // initialize Backend Services SDK
            this.el = new Everlive({
              apiKey: this.apiKey
            });
            
            //Data is now available
            this.loadData();
        };
        
        this.saveStep = function(pageModel) {
            this.stepData[this.currentStep.id - 1] = pageModel;
        };
        
        this.apiKey = "";
        this.el = null;
    
        this.loadData = function() {
            //take what we have saved and push it into stepData
            this.stepData = [];
            this.stepData.push({ response: null, breath: null, body: null, cranium: null });
            this.stepData.push({ response: null, breath: null, body: null, cranium: null });
            this.stepData.push({ response: null, breath: null, body: null, cranium: null });
            this.stepData.push({ response: null, breath: null, body: null, cranium: null });
            this.stepData.push({ response: null, breath: null, body: null, cranium: null });
            this.stepData.push({ response: null, breath: null, body: null, cranium: null });
            this.stepData.push({ response: null, breath: null, body: null, cranium: null });
            this.stepData.push({ response: null, breath: null, body: null, cranium: null });
            this.stepData.push({ response: null, breath: null, body: null, cranium: null });
            this.stepData.push({ response: null, breath: null, body: null, cranium: null });
            this.stepData.push({ response: null, breath: null, body: null, cranium: null });
            this.stepData.push({ response: null, breath: null, body: null, cranium: null });
            this.stepData.push({ response: null, breath: null, body: null, cranium: null });
            //this.stepData.push({ textarea: "", textbox: "", emotion: "", physical: "", dispute: "" });
            //this.stepData.push({ textarea: "", textbox: "", emotion: "", physical: "", dispute: "" });
            //this.stepData.push({ textarea: "", textbox: "", emotion: "", physical: "", dispute: "" });
            //this.stepData.push({ textarea: "", textbox: "", emotion: "", physical: "", dispute: "" });
            //this.stepData.push({ textarea: "", textbox: "", emotion: "", physical: "", dispute: "" });
            //this.stepData.push({ textarea: "", textbox: "", emotion: "", physical: "", dispute: "" });
            //this.stepData.push({ textarea: "", textbox: "", emotion: "", physical: "", dispute: "" });
            //this.stepData.push({ textarea: "", textbox: "", emotion: "", physical: "", dispute: "" });
            //this.stepData.push({ textarea: "", textbox: "", emotion: "", physical: "", dispute: "" });
            //this.stepData.push({ textarea: "", textbox: "", emotion: "", physical: "", dispute: "" });
            //this.stepData.push({ textarea: "", textbox: "", emotion: "", physical: "", dispute: "" });
            //this.stepData.push({ textarea: "", textbox: "", emotion: "", physical: "", dispute: "" });
            //this.stepData.push({ textarea: "", textbox: "", emotion: "", physical: "", dispute: "" });
            
        };
        
        this.currentUser = null;
        this.getCurrentUser = function() {
            
            if (this.currentUser != null) {
                return this.currentUser;
            }
            
            var el = new Everlive(this.apiKey);
            el.Users.currentUser()
                .then(function (data) {
                    return data;
                },
                function(error){
                    //throw error?
                    console.log(error);
                    return null;
                });
        };
        
        this.getStepData = function(idx) {
            return this.stepData[idx];
        };
        
        this.setCurrentStep = function(id) {
            this.currentStep = this.worksheetData.get(id);
        };
        
        this.getEmotion = function(emotion) {
            var stepNumber = 3;
            var emotionStepData = this.stepData[stepNumber - 1];
            var emotion = emotionStepData.response;
            return emotion ? emotion : "";
        };
        
        this.getDisputeFromEmotion = function() {
            var emotion = this.getEmotion();
            //console.log(emotion);
            var d = "(Nothing)";
            
            for (var i = 0; i < this.emotionsData.length; i++) {
                if (this.emotionsData[i].key == emotion.toLowerCase()) {
                    d = this.emotionsData[i].d1;
                }
            }
            return d;
        };
            
    })
    .controller('aboutController', ['$scope', 'worksheetService', function($scope, worksheetService) {
        //nothing
    }])
    .controller('homeController', ['$scope', 'worksheetService', function($scope, worksheetService) {
        $scope.worksheetService = worksheetService;
        
        $scope.loadStep = function() {
            $scope.pageModel = worksheetService.getStepData(worksheetService.currentStep.id - 1);
            $scope.isSubmitted = false;
        };
        
        $scope.mode = "home";
        //$scope.emotion = "";
        $scope.isSubmitted = false;
        
        //service?
        $scope.getStatusLink = function() {
            var user = worksheetService.getCurrentUser();
            if (user && user.DisplayName.length > 0) {
                //User is signed in
                return "Account";
            }
            return "Sign In";
        };
        $scope.statusLink = $scope.getStatusLink();
        
        $scope.loadStep();
        
        //Now stuff is loaded for the current step
        
        $scope.showNext = function() { return worksheetService.currentStep.id < worksheetService.worksheetData.data().length; };
        $scope.showPrev = function() { return worksheetService.currentStep.id > 1 && worksheetService.currentStep.id < worksheetService.worksheetData.data().length; };
        
        $scope.goPrevStep = function() {
            worksheetService.saveStep($scope.pageModel);
            worksheetService.setCurrentStep(worksheetService.currentStep.id - 1);
            $scope.loadStep();
        };
        
        $scope.isValid = function() {
            if (worksheetService.currentStep.id == 4) {
                if ((!$scope.pageModel.body || $scope.pageModel.body.length == 0) &&
                   (!$scope.pageModel.breath || $scope.pageModel.breath.length == 0) &&
                   (!$scope.pageModel.cranium || $scope.pageModel.cranium.length == 0)) {
                    return false;
                }
            }
            else {
                if (!$scope.pageModel.response || $scope.pageModel.response.length < 1) {
                    return false;
                }
            }
            return true;
        }
        
        $scope.goNextStep = function() {
            $scope.isSubmitted = true;
            
            //validate
            if (!$scope.isValid()) {
                return;
            }
            worksheetService.saveStep($scope.pageModel);
            worksheetService.setCurrentStep(worksheetService.currentStep.id + 1);
            $scope.loadStep();
        };
        
        $scope.startOver = function() {
            //Clear data?
            //worksheetService.clearData();
            worksheetService.loadData();
            
            worksheetService.setCurrentStep(1);
            $scope.loadStep();
        };
        
    }]);
