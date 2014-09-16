
var requestFormApp = angular.module('requestFormApp', ['ngRoute']);


requestFormApp.controller('HomeCtrl', function ($scope, $http, $location, dateFilter) {
	var API_PATH = $location.host() == 'localhost' ? 'http://localhost/jotform/git/request_for_banner_designs_form/app/' : 'http://mtrinitaria.com/jotform/request_for_banner_designs_form/app/';
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
  	// console.log($scope.form.sizes.lists, index)
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
  		$scope.form.format.selects.splice($scope.form.format.selects.indexOf(item.name), 1);
  	}
  	/*if ($scope.form.bannerType.selects.indexOf(item.name) != -1) {
  		$scope.form.bannerType.selects.splice($scope.form.bannerType.selects.indexOf(item.name), 1);
  	} else {
  		$scope.form.bannerType.selects.push(item.name);
  	}*/
  	
  }
  $scope.submitted = false;
  $scope.okay = function() {
  	$scope.submitted = false;
  }

  var resetForm = function() {
	  for (var i=0;i < $scope.myform.length; i+=1) {
	    $scope.myform[$scope.myform[i].id] = '';
	  }
	  // reset sizes
	  $scope.form.sizes.lists.length = 0;
	  $scope.form.sizes.lists.push({w:'', h:''});
		// reset formats
	  for (var i=0;i<$scope.form.format.lists.length;i++) {
	  	$scope.form.format.lists[i].selected = false;	
	  }
	  $scope.form.format.selects.length = 0;
  }
  $scope.submitForm = function(form) {
  	var data = {};
  	data.name = $scope.myform.name;
  	data.email = $scope.myform.email;
  	data.contactNumber = $scope.myform.contactNumber;
  	data.bannerType = $scope.myform.bannerType.name;
  	data.format = $scope.form.format.selects;
  	data.sizes = $scope.form.sizes.lists;
  	data.adServer = $scope.myform.adServer.name;
  	data.notes = $scope.myform.notes;
  	data.created = new Date();

  	// validate date
  	if not return
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
    
		// $http.jsonp(API_PATH + 'SaveEntry.php?callback=JSON_CALLBACK&data=data', data).success(function(){
  //     resetForm();
  //     $scope.submitted = true;
  //   });
    $http.jsonp(API_PATH + 'SaveEntry.php', {
      params: {
        callback: 'JSON_CALLBACK',
        format:'json',
        data:data
      }
    }).success(function(){
			resetForm();
			$scope.submitted = true;
		});

  	JFCustomWidget.subscribe("ready", function(){
	    //subscribe to form submit event
	    JFCustomWidget.subscribe("submit", function(){
	      // send value to JotForm
	      JFCustomWidget.sendSubmit(data);
	    });
		});
  }

  $scope.entries = [];
  $scope.find = function() {
    $http.jsonp(API_PATH + 'GetEntries.php', {
      params: {
        callback: 'JSON_CALLBACK',
        format:'json',
        data:{from:0, to:100}
      }
    }).success(function(){
      $scope.entries = res;
    });
		/*$http({
	    url: API_PATH + 'GetEntries.php',
	    method: "JSONP",
	    data:{from:0, to:100}
		}).success(function(res){
			$scope.entries = res;
			console.log(res)
			// resetForm();
			// $scope.submitted = true;
		});*/
  }

	$scope.sort = {
      column: '',
      descending: false
  };    
  $scope.changeSorting = function(column) {
    var sort = $scope.sort;

    if (sort.column === column) {
        sort.descending = !sort.descending;
    } else {
        sort.column = column;
        sort.descending = false;
    }
  };

});




