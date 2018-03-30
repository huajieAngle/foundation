// Foundation JavaScript
// Documentation can be found at: http://foundation.zurb.com/docs
var app=angular.module("myApp",["ui.router","ngAnimate"])
			.controller("mainCtrl",["$scope",function($scope){
//				console.log("控制器被调用");
				$scope.navData={};
				$scope.navData.num=1;
	
			}])
.config(["$stateProvider","$urlRouterProvider",function($stateProvider,$urlRouterProvider){
				$stateProvider
				.state({
					"name":"login",
					"url":"/login",
					templateUrl:"templates/login.html"
					})
				.state({
					"name":"main",
					"url":"/main",
					templateUrl:"templates/main.html"
				})
				.state({
					"name":"main.main-inp",
					"url":"/main-inp",
					templateUrl:"templates/main-inp.html"
				})
				.state({
					"name":"main.main-search",
					"url":"/main-search",
					templateUrl:"templates/main-search.html"
				})
				.state({
					"name":"main.main-add",
					"url":"/main-add",
					templateUrl:"templates/main-add.html"
				})
					$urlRouterProvider.otherwise("/login")				
			}])
