app.controller("loginCtrl", ["$scope", "httpFactory", "$state", function($scope, httpFactory, $state) {
	$scope.login = {};
	$scope.login.chk = true;
	$scope.addCookie = function(name, value, days, path) {
		var name = escape(name);
		var days = 5;
		var value = escape(value);
		var expires = new Date();
		expires.setTime(expires.getTime() + days * 3600000 * 24);
		path = path == "" ? "" : ";path=" + path;
		var _expires = (typeof days) == "string" ? "" : ";expires=" + expires.toUTCString();
		document.cookie = name + "=" + value + _expires + path;
	}
	$scope.getCookieValue = function(name) {
		var name = escape(name);
		var allcookies = document.cookie;
		name += "=";
		var pos = allcookies.indexOf(name);
		if(pos != -1) {
			var start = pos + name.length;
			var end = allcookies.indexOf(";", start);
			if(end == -1) end = allcookies.length;
			var value = allcookies.substring(start, end);
			return(value);
		} else {
			return "";
		}
	};
	$scope.loginOnload = function() {
		var userNameValue = $scope.getCookieValue("userName");
		$scope.login.user_name = userNameValue;
		var userPassValue = $scope.getCookieValue("userPass");
		$scope.login.user_pwd = userPassValue;
		var userRemPwd = $scope.getCookieValue("rem_pwd");
		$scope.login.chk = (userRemPwd = true);
	};
	$scope.deleteCookie = function(name, path) {
		var name = escape(name);
		var expires = new Date(0);
		path = path == "" ? "" : ";path=" + path;
		document.cookie = name + "=" + ";expires=" + expires.toUTCString() + path;
	};
	//点击登录
	$scope.changeLogin = function() {
		var userName = $scope.login.user_name;
		var rem_pwd = $scope.login.chk;
		var userPass = $scope.login.user_pwd;
		//定义login中data的值为json对象
		$scope.login_data = JSON.stringify({
			'user_name': $scope.login.user_name,
			'user_pwd': $scope.login.user_pwd
		});
		httpFactory.login($scope.login_data).then(function(data) {
			if(data.Status == 0) {
				$state.go("main.main-inp");
				if(rem_pwd) {
					//添加cookie  
					$scope.addCookie("userName", userName, 5, "/");
					$scope.addCookie("userPass", userPass, 5, "/");
					$scope.addCookie("rem_pwd", rem_pwd, 5, "/");

				} else {
					$scope.deleteCookie("userPass");
					$scope.login.user_pwd = "";
					$scope.addCookie("rem_pwd", rem_pwd, 5, "/");

				}
			}
		})

	}
}])