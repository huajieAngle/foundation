app.controller("searchCtrl", ["$scope", "httpFactory", "$interval", function($scope, httpFactory, $interval) {
	console.log("工具状态查询")
	$scope.navData.num = 2;
	//设置初始页码为第一页
	$scope.current_page = 1;
	//获取状态列表
	$scope.big_new_stutas = function() {
		httpFactory.new_stutas($scope.current_page).then(function(data) {
			$scope.new_data = data;
			$scope.new_data_list = $scope.new_data.Req.Data;
			//总页数
			$scope.current_Count = parseInt($scope.new_data.Count / 10) + 1;
			//点击下一页		
		})

	}
	$scope.big_new_stutas();
	//左右点击切换页面
	$scope.right_page = function() {
		if($scope.current_page < $scope.current_Count) {
			$scope.current_page++;
			$scope.big_new_stutas();
		} else {
			$scope.current_page = $scope.current_page;
		}
	}
	$scope.left_page = function() {
		if($scope.current_page == 1) {
			$scope.current_page = $scope.current_page;
		} else {
			$scope.current_page--;
			$scope.big_new_stutas();
		}
	}
	//工具是否丢失状态查询

	//每隔一秒刷新列表
	$interval(function() {
		$scope.big_new_stutas();
		httpFactory.succeed_status().then(function(data) {
			$scope.succeed = data;
		});
		httpFactory.fail_status().then(function(data) {
			$scope.fail = data;
			if($scope.fail.Data > 0) {
				$scope.flag5 = true;
			}
		});
	}, 1000)

}])