angular.module('mindfulMobileApp', [ 'kendo.directives', 'ngSanitize' ])
    .run(['worksheetService', function(worksheetService){
        worksheetService.init();
    }])
    .service('worksheetService', function() {
        this.init = function() {
            //the application DataSources
            //this.worksheetEntryData = new kendo.data.DataSource();
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
            
            //I have no idea if I need to do this or not
            var token = this.getAccessToken();
            if (token && token.length > 0) {
                this.el.accessToken = token;
            }
            
            //Data is now available
            this.loadData();
        };
    
        this.saveResponse = function(pageModel) {
            //console.log();
            this.stepData[this.currentStep.id - 1] = pageModel;
        };
    
        this.createWorksheetEntry = function(data) {
            this.el.data('WorksheetEntry').create(data, function(data) {
                console.log(JSON.stringify(data));
            },
            function(data) {
                console.log(JSON.stringify(data));
            }
        )};
    
        this.updateWorksheetEntry = function(data) {
            this.el.data('WorksheetEntry').updateSingle(data);
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
        
        this.getAccessToken = function() {
            return window.localStorage.getItem("access_token");
        };
    
        this.setAccessToken = function(value) {
            window.localStorage.setItem("access_token", value);
        };
    
        this.signOut = function() {
            this.el.Users.logout(function (data) {
                this.currentUser = null;
                this.setAccessToken("");
            },
            function(error){
                //throw error?
                console.log(error);
                return null;
            });
        };
    
        this.currentUser = null;
        this.getCurrentUser = function(success, failure) {
            if (this.currentUser) {
                success(this.currentUser);
            }
            
            this.el.Users.currentUser(function (data) {
                    console.log("getCurrentUser: " + JSON.stringify(data.result));
                    this.currentUser = data.result;
                    success(data.result);
                    //return data.result;
                },
                function(error){
                    //throw error?
                    //console.log(error);
                    //return null;
                    failure(error);
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
            //var emotionStepData = this.stepData[stepNumber - 1];
            //var emotion = emotionStepData.response;
            //return emotion ? emotion : "";
            
            return "None";
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
    .controller('registerController', ['$scope', 'worksheetService', function($scope, worksheetService) {
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
           
    }])
    .controller('signinController', ['$scope', 'worksheetService', function($scope, worksheetService) {
       $scope.pageModel = {
            username: "",
            password: ""
        }
        
        $scope.signin = function() {
            if ($scope.pageModel.username.length === 0 ||
               $scope.pageModel.password.length === 0)
            {
                $scope.pageModel.showValidationMsg = true;
                return;
            }
            
            worksheetService.el.Users.login($scope.pageModel.username,
                $scope.pageModel.password,
                function (data) {
                    //console.log(JSON.stringify(data));
                    if (data && data.result) {
                        worksheetService.setAccessToken(data.result.access_token);
                        console.log("Fresh token: " + worksheetService.getAccessToken());
                    };
                    //console.log("logged in!");
                    window.location.href="#home";
                },
                function(error){
                    console.log(JSON.stringify(error));
            });
        };
        
    }])
    .controller('homeController', ['$scope', 'worksheetService', function($scope, worksheetService) {
        $scope.worksheetService = worksheetService;
        
        $scope.loadStep = function() {
            console.log("Current step: " + worksheetService.currentStep.id);
            //$scope.stepModel = worksheetService.getStepData(worksheetService.currentStep.id - 1);
            $scope.pageModel.isSubmitted = false;
        };
        
        $scope.mode = "home";
        $scope.pageModel = {};
        $scope.pageModel.isSubmitted = false;
        $scope.pageModel.user = {};
        $scope.pageModel.user.displayName = "None";
        
        $scope.worksheetEntry = {
          activatingEvent: '',
          beliefSystem: '',
          emotionalConsequence: '',
          behavioralConsequence: '',
          dispute1: '',
          dispute2: '',
          dispute3: '',
          dispute4a: '',
          dispute4b: '',
          dispute4c: ''
        }
        
        worksheetService.getCurrentUser(function(data) {
                //console.log("User from svc: " + JSON.stringify(data));
                if (data) {
                    console.log("Have a user: " + data.DisplayName);
                    $scope.pageModel.user.displayName = data.DisplayName;
                    $scope.digest();
                }
                else {
                    console.log("No user");
                }
            }, function(error) {
                console.log("Error: " + error);
        });
        
        //service?
        /*
        $scope.getStatusLink = function() {
            //var user = worksheetService.getCurrentUser();
            if (user && user.displayName.length > 0) {
                //User is signed in
                return "Account";
            }
            return "Sign In";
        };
        $scope.pageModel.statusLink = $scope.getStatusLink();
        */
        
        $scope.loadStep();
        
        //load user response data
        
        
        //Now stuff is loaded for the current step
        
        $scope.showNext = function() { return worksheetService.currentStep.id < worksheetService.worksheetData.data().length; };
        $scope.showPrev = function() { return worksheetService.currentStep.id > 1 && worksheetService.currentStep.id < worksheetService.worksheetData.data().length; };
        $scope.showFinish = function() { return worksheetService.currentStep.id == worksheetService.worksheetData.data().length; };
        
        $scope.goPrevStep = function() {
            worksheetService.saveResponse($scope.pageModel);
            worksheetService.setCurrentStep(worksheetService.currentStep.id - 1);
            $scope.loadStep();
        };
        
        $scope.isValid = function() {
            if (worksheetService.currentStep.id == 4) {
                if ((!$scope.stepModel.body || $scope.stepModel.body.length == 0) &&
                   (!$scope.stepModel.breath || $scope.stepModel.breath.length == 0) &&
                   (!$scope.stepModel.cranium || $scope.stepModel.cranium.length == 0)) {
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
        
        $scope.goNextStep = function() {
            $scope.pageModel.isSubmitted = true;
            
            //validate
            if (!$scope.isValid()) {
                return;
            }
            //worksheetService.saveResponse($scope.pageModel);
            worksheetService.setCurrentStep(worksheetService.currentStep.id + 1);
            $scope.loadStep();
        };
        
        $scope.saveWorksheet = function() {
          //asdf  
          console.log($scope.stepModel);
          worksheetService.saveWorksheetEntry($scope.stepModel);
        };
        
        $scope.startOver = function() {
            //Clear data?
            //worksheetService.clearData();
            worksheetService.loadData();
            
            worksheetService.setCurrentStep(1);
            $scope.loadStep();
        };
        
    }]);
