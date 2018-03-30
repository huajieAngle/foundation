app.factory("httpFactory", ["$http", "$state", function($http, $state) {
	var promise;
	var header;
	header = {
		'Authorization': 'JianYuGongJuAdmin'
	};
	var domain = "192.168.0.8";
	var apiUrl = "http://" + domain + "/api/";
	var apiVersion = "v1/";
	var prefix = apiUrl + apiVersion; //http://127.0.0.1:8020/api/v1/
	var service = {
		login: function(options) {
			promise = $http({
				method: 'post',
				url: prefix + "User/LoginUser",
				data: options,
				contentType: 'application/json',
			}).then(function(response) {
				return response.data;
			});
			return promise;
		},
		lists: function(num) {			
			promise = $http({
				method: 'get',
				url: prefix + "Tools/GetList?takenId=" + num + "&takeCount=15",
				headers: header,
			}).then(function(response) {
				return response.data;
			});
			return promise;

		},
		//逐个删除
		delete: function(tool_id) {
			promise = $http({
				method: 'get',
				url: prefix + "Tools/Del?tools_ID=" + tool_id,
				headers: header,
			}).then(function(response) {
				return response.data;
			});
			return promise;

		},
		//批量删除
		deleteAll: function(options) {
			promise = $http({
				method: 'post',
				url: prefix + "Tools/DelList",
				data: options,
				headers: header,
			}).then(function(response) {
				return response.data;
			});
			return promise;

		},
		//查询
		search: function(options) {
			promise = $http({
				method: 'post',
				url: prefix + "Tools/GetSelectWhere",
				data:options,
				headers: header,
			}).then(function(response) {
				return response.data;
			});
			return promise;

		},
		//添加车间
		add_areas: function(options) {
			promise = $http({
				method: 'get',
				url: prefix + "Tools/GetWorkBench",
				headers: header,
			}).then(function(response) {
				return response.data;
			});
			return promise;
		},
		//点击添加车间，工作台，工具
		add_sent: function(options) {
			promise = $http({
				method: 'post',
				url: prefix + "Tools/Add",
				data: options,
				headers: header,
			}).then(function(response) {
				return response.data;
			});
			return promise;
		},
		//查询页面设置页码
		new_stutas: function(options) {
			promise = $http({
				method: 'get',
				url: prefix + "RealTime/GetRealTimeTools?takenId=" + options +"&takeCount=9",
				headers: header,
			}).then(function(response) {
				return response.data;
			});
			return promise;
		},
		succeed_status: function() {
			promise = $http({
				method: 'get',
				url: prefix + "RealTime/GetOKSte",
				headers: header,
			}).then(function(response) {
				return response.data;
			});
			return promise;
		},
		fail_status: function() {
			promise = $http({
				method: 'get',
				url: prefix + "RealTime/GetLoseSte",
				headers: header,
			}).then(function(response) {
				return response.data;
			});
			return promise;
		},
		revision: function(options) {
			promise = $http({
				method: 'post',
				url: prefix + "Tools/Update",
				data:options,
				headers: header,
			}).then(function(response) {
				return response.data;
			});
			return promise;
		},
		nn: function() {
			alert(1)
		}
	}
	return service;

}])
