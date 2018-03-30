app.controller("inpCtrl", ["$scope", "httpFactory", function($scope, httpFactory) {
	$scope.factory = httpFactory;
	$scope.navData.num = 1;
	$scope.num = 1;
	//定义一个空数组用来存放工具的id
	$scope.check_box = [];
	//翻页
	$scope.nextPage = function() {
		if($scope.num < $scope.page) {
			$scope.num++;
			$scope.list_all();

		} else {
			$scope.num = $scope.num;
			alert("已经是最后一页了");
		}

	}
	$scope.lastPage = function() {
		$scope.num = $scope.page;
		$scope.list_all();
		$scope._chang_tab()
	}
	$scope._chang_tab = function() {
		$scope.changTab = function(item) {
			$scope.num = item;
			$scope.list_all();
		}
	}
	$scope._chang_tab()
	$scope.list_all = function() {
		httpFactory.lists($scope.num).then(function(data) {
			$scope.lists = data.Req.Data;
			$scope.Count = data.Count;
			$scope.page = parseInt($scope.Count / 15) + 1;
			$scope.ppg = [];
			for(var i = 1; i <= $scope.page; i++) {
				if(i <= $scope.page) {
					$scope.ppg.push(i);
				} else {
					$scope.ppg.push(0);
				}
			}
		})
	}
	$scope.list_all();
	//逐个删除：
	$scope.deleteItem = function(item) {
		$scope.tool_id = item.Tools_ID;
		httpFactory.delete($scope.tool_id).then(function(data) {
			$scope.list_all();
		})
	}
	//批量删除push数组
	$scope.arr_deleteAll = function() {
		$scope.changeSelect = function(item) {
			$scope.tool_id = item.Tools_ID;
			$scope.check_box.push($scope.tool_id);
			httpFactory.deleteAll($scope.check_box).then(function(data) {})
		}
	}
	$scope.arr_deleteAll();
	//删除按钮，逐个选中，进行删除
	$scope.deleteAll = function() {
		$scope.list_all();
		$scope.arr_deleteAll();
	}
	//查询
	$scope.search_on = function() {
		$scope.ser = JSON.stringify({
			'Tool_Name': $scope.search_con
		});
		httpFactory.search($scope.ser).then(function(data) {
			$scope.lists = data.Data;
			$scope.flag = true;
		})
	}
	//点击修改/保存
	//	$scope.current=false;
	$scope.revison = function(index) {
		$scope.current = index;
		$scope.isBlue = false;
		console.log(index)
	}
	$scope.save = function(item) {
		$scope.current = "no";
		$scope.chang_inp = JSON.stringify({
			'Tools_ID': item.Tools_ID,
			'Tool_Name': item.Tool_Name,
			'DeviceID': item.DeviceID
		});
		httpFactory.revision($scope.chang_inp).then(function(data) {
			console.log($scope.chang_inp);
		})
	}
}])