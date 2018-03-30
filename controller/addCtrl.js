app.controller("addCtrl", ["$scope", "httpFactory", function($scope, httpFactory) {
	httpFactory.add_areas().then(function(data) {
		//将获取到的数据赋值变量add
		$scope.add = data.Data;
		//设置默认车间名和工作台名
		$scope.areas = $scope.add[0];
		$scope.bench = $scope.areas.ListWorkBench[0];
	})
	//点击添加车间，工作台，工具			
	$scope.sent = function() {
		if($scope.tool == undefined | $scope.tool == "" | $scope.Device == undefined | $scope.Device == "") {} else {
			$scope.flag3 = true;
			$scope.add_content = JSON.stringify({
				'WorkShop_Name': $scope.areas.WorkShop_Name,
				'WorkBench_Name': $scope.bench.WorkBench_Name,
				'Tool_Name': $scope.tool,
				'DeviceID': $scope.Device
			});
			httpFactory.add_sent($scope.add_content).then(function(data) {

			})
		}
	}
	$scope.back = function() {
		$scope.tool = "";
		$scope.Device = "";
	}

}])