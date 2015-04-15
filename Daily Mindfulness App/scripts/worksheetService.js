myApp.service('worksheetService', function() {
  this.init = function() {
    //the application DataSources
    //this.worksheetEntryData = new kendo.data.DataSource();
    this.worksheetData = new kendo.data.DataSource({
      data: [{
        id: 1,
        title: "Activating Event",
        letter: "A",
        description: "What happened to trigger this emotional response?",
        hint: "Explain briefly what event or action occurred to trigger your response."
      },
      {
        id: 2,
        title: "Belief System",
        letter: "B",
        description: "What is your Belief that leads you to one of the Responses (C) listed in the next step?",
        hint: ""
      },
      {
        id: 3,
        title: "Consequence - Emotional",
        letter: "C1",
        description: "What were the Emotional consequences? Select just one.",
        hint: ""
      },
      {
        id: 4,
        title: "Consequence - Behavioral",
        letter: "C2",
        description: "Please also describe the physical sensations in the Breath, Body and Cranium.",
        hint: ""
      },
      {
        id: 5,
        title: "Dispute the Belief System",
        letter: "D1",
        description: "Dispute the Belief by asking a question of the <b>Belief System</b> that led to the emotional consequence.",
        hint: ""
      },
      {
        id: 6,
        title: "Dispute the Belief System",
        letter: "D2",
        description: "Dispute the belief system by asking: How much do I believe in this Belief from 0 to 100%?",
        hint: ""
      },
      {
        id: 7,
        title: "Dispute the Belief System",
        letter: "D3",
        description: "Dispute the belief system by asking: What if the Belief had never entered my mind, then what would the emotional consequences have been?",
        hint: ""
      },
      {
        id: 8,
        title: "Dispute the Belief System",
        letter: "D4a",
        description: "Dispute the belief system by asking: What if my Belief was 100% factual up until this moment? What would the emotional consequences have been?",
        hint: ""
      },
      {
        id: 9,
        title: "Dispute the Belief System",
        letter: "D4b",
        description: "Dispute the belief system by asking: What if my Belief was 100% factual up until this moment? What would the emotional consequences have been?",
        hint: ""
      },
      {
        id: 10,
        title: "Dispute the Belief System",
        letter: "D4c",
        description: "What if my Belief was 100% factual up until this moment? What would the emotional consequences have been?",
        hint: ""
      },
      {
        id: 11,
        title: "Effective, Elegant, and Efficient Change in Emotion & Behavior",
        letter: "E",
        description: "This aspect can often look something like a positive affirmation. This is an experiential change in the former emotional and physiological consequences and begins to build new, healthy neural pathways in the brain.",
        hint: "I feel better and less angry, depressed, anxious, or guilty when I notice or become aware that..."
      },
      {
        id: 12,
        title: "Worksheet Complete",
        letter: "",
        description: "You are all set! Your data has been saved to your History.",
        hint: ""
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
    /*
      this.worksheetEntryDataSource = new kendo.data.DataSource({
        type: 'everlive',
        transport: {
          typeName: 'WorksheetEntry'
        },
        schema: {
          model: WorksheetEntryModel
        }
      });
    */
    
    this.currentStep = null;
    this.stepData = [];
    this.currentUser = null;
    this.previousPath = null;
    this.isWorksheet = false;
    
    var applicationSettings = {
      apiKey: 'EKv2hddSm1LbhrRX'
    };
    this.apiKey = applicationSettings.apiKey;

    // initialize Backend Services SDK
    this.el = new Everlive({
      apiKey: this.apiKey
    });

    //I have no idea if I need to do this or not
    /*var token = this.getAccessToken();
    if (token && token.length > 0) {
        this.el.accessToken = token;
    }*/

    //Start at step 1
    this.setCurrentStep(1);
    
    //Data is now available
    this.loadData();
  };

  this.hasNavigated = function() {
    return (this.previousPath && this.previousPath.length > 0);
  }
  
  this.setCurrentPath = function(path) {
    if (this.currentPath) {
      this.previousPath = this.currentPath;
    }
    this.currentPath = path;
  }
  
  this.showBackButton = function() {
    return (this.previousPath && this.previousPath.length > 0) || (this.isWorksheet && this.currentStep && this.currentStep.id && this.currentStep.id > 0);
  };
  
  this.showLoading = function() {
    if (this.spinner) {
        //app.pane.loader.show()
        this.spinner.spin();
    }
  };

  this.hideLoading = function() {
    if (this.spinner) {
      //app.pane.loader.hide()
      this.spinner.stop();
    }
  };

  this.saveResponse = function(pageModel) {
    //console.log();
    this.stepData[this.currentStep.id - 1] = pageModel;
  };

  this.saveWorksheetEntry = function(data) {
    //attach user info to it??
    var user = this.getCurrentUser();
    if (user) {
      data.userId = user.id;
    }
    this.createWorksheetEntry(data);
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

  this.getWorksheetHistory = function(skip, take, success, failure) {
    var userId = '';
    
    if (this.currentUser) {
      userId = this.currentUser.Id;
      //console.log("User:");
      //console.log(this.currentUser);
    }
    
    if (!userId || userId == '') {
      //console.log("no user in query");
      return [];
    }
    
    var data = this.el.data('WorksheetEntry');
    var query = new Everlive.Query();
    query.where().eq('CreatedBy', userId);

    if (skip && skip > 0)
      query.skip(skip);

    if (take && take > 0)
      query.take(take);

    data.get(query)
      .then(function(data){
        success(data);
      },
      function(error){
        failure(error);
      });
  };

  this.apiKey = "";
  this.el = null;

  this.loadData = function() {
    //console.log("init");
  };

  this.getAccessToken = function() {
    var token = window.localStorage.getItem("access_token");
    //console.log("Got token: '" + token + "'");
    return token;
  };

  this.setAccessToken = function(value) {
    //console.log("Setting token: '" + value + "'");
    window.localStorage.setItem("access_token", value);
  };

  this.signOut = function(success, failure) {
    this.el.Users.logout(function (data) {
      this.currentUser = null;
      this.setAccessToken("");
      success();
    },
    function(error){
      //console.log(error);
      failure(error);
    });
  };

  //this.currentUser = null;
  this.getCurrentUser = function(successFn, failureFn) {
    if (this.currentUser) {
      //console.log("returning current user");
      if (successFn) {
        successFn(this.currentUser);
      }
      return;
    }
    var that = this;
    this.el.Users.currentUser(function (data) {
      //console.log("getCurrentUser");
      if (data && data.result) {
        //console.log("id");
        that.setCurrentUser(data.result);
        if (successFn)
          successFn(data.result);
        }
      },
      function(error){
        if (failureFn)  
          failureFn(error);
    });
  };
  
  this.setCurrentUser = function(user) {
    //console.log("bah");
    this.currentUser = user;
  };
  
  this.getStepData = function(idx) {
    return this.stepData[idx];
  };

  this.setCurrentStep = function(id) {
    this.currentStep = this.worksheetData.get(id);
  };        
});