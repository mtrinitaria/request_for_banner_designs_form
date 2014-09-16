// var label = JFCustomWidget.getQueryString('QuestionLabel');
//subscribing ready event and implementing widget related code inside callback function 
//is the best practice while developing widgets
/*JFCustomWidget.subscribe("ready", function(){
    //subscribe to form submit event
    JFCustomWidget.subscribe("submit", function(){
        var msg = {
            //you should valid attribute to data for JotForm
            //to be able to use youw widget as required
            valid: true,
            value: document.getElementById('userInput').value
        }
        // send value to JotForm
        
        JFCustomWidget.sendSubmit(msg);
    });
});*/


var requestFormApp = angular.module('requestFormApp', ['ngRoute']);


requestFormApp.controller('HomeCtrl', function ($scope) {
	$scope.title = 'Home';

	$scope.form = {};
  $scope.myform = [
    { label:'Name', type:'text', id:'name' } ,
    { label:'Email', type:'email', id:'email' } ,
    { label:'Contact #', type:'text', id:'contactNumber' } ,
    { label:'Banner Type', type:'select', lists:[{name:'Flash'}, {name:'HTML 5'}, {name:'Animated GIF'}, {name:'Still Image'}, ], id:'bannerType' } ,
    { label:'Format', type:'checkbox', lists:[{name:'Expanding'}, {name:'Floating'}, {name:'AdMob'}, {name:'Tandem'}, {name:'In-page'}, {name:'Pushdown'}, {name:'Takeover'}, {name:'Lightbox'}], id:'format' } ,
    { label:'Sizes', type:'inputs', lists:[], id:'sizes' } ,
    { label:'Ad Server', type:'select', lists:[{name:'DoubleClick'}, {name:'Sizemek'}, {name:'PointRoll'}, {name:'Medialets'}], id:'adServer' } ,
    { label:'Notes', type:'textarea', id:'notes' } 
  ];
  
  for (var i=0;i < $scope.myform.length; i+=1) {
    $scope.myform[$scope.myform[i].id] = '';
    $scope.form[$scope.myform[i].id] = $scope.myform[i];
  }

  $scope.form.sizes.lists.push({w:'', h:''});

  $scope.addInput = function() {
		$scope.form.sizes.lists.push({w:'', h:''});
  }
  $scope.removeInput = function(index) {
		$scope.form.sizes.lists.splice(index, 1);
  }
  $scope.select = function(item) {
  	item.selected = (item.selected ? false : true);

  	if (!$scope.form.format.selects) {
  		$scope.form.format.selects = [];
  	}
  	if (item.selected) {
  		$scope.form.format.selects.push(item.name);
  	} else {
  		$scope.form.format.selects.splice($scope.form.bannerType.selects.indexOf(item.name), 1);
  	}
  	/*if ($scope.form.bannerType.selects.indexOf(item.name) != -1) {
  		$scope.form.bannerType.selects.splice($scope.form.bannerType.selects.indexOf(item.name), 1);
  	} else {
  		$scope.form.bannerType.selects.push(item.name);
  	}*/
  	
  }

  $scope.submitForm = function(form) {
  	var data = {};
  	data.name = $scope.myform.name;
  	data.email = $scope.myform.email;
  	data.contactNumber = $scope.myform.contactNumber;
  	data.bannerType = $scope.myform.bannerType.name;
  	data.format = $scope.form.format.selects;
  	data.sizes = $scope.form.sizes.lists;
  	data.adServer = $scope.myform.adServer;
  	data.notes = $scope.myform.notes;

  	// validate date
  	// if not return
  	if (!(/(.+)@(.+){2,}\.(.+){2,}/.test(data.email)) /*validate email*/
  		|| data.name.length === 0
  		|| data.contactNumber.length === 0
  		|| data.bannerType.length === 0
  		|| data.format.length === 0
  		|| data.sizes.length === 0
  		|| data.adServer.length === 0
  		) {
  		return;
  	}
  	JFCustomWidget.subscribe("ready", function(){
	    //subscribe to form submit event
	    JFCustomWidget.subscribe("submit", function(){
	      // send value to JotForm
	      JFCustomWidget.sendSubmit(data);
	    });
		});
  }

});




