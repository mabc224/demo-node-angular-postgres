(function () {

	'use strict';

	angular
		.module('mapperApp.components.auth', [])
		.controller('authLoginController', authLoginController)
		.controller('authRegisterController', authRegisterController)
		.controller('authLogoutController', authLogoutController);

	authLoginController.$inject = ['$location', '$localStorage', 'growl', 'authService'];
	authRegisterController.$inject = ['$location', 'growl', 'authService'];
	authLogoutController.$inject = ['$scope', '$location', '$localStorage', '$http', 'growl'];

	function authLoginController($location, $localStorage, growl, authService) {

		var vm = this;
		vm.user = {};
		vm.code = {};
		vm.onLogin = function () {
			authService.login(vm.user)
				.then(function (user) {
					$localStorage.$reset();
					$localStorage.user = user.data.data;
					console.log($localStorage.user);
					growl.success('User has login successfully and verification code is sent to mobile for confirmation',{title: 'Success!', ttl: 3000});
				})
				.catch(function (err) {
					console.log(err);
				});
		};
		vm.onGo = function () {
			$location.path('/register');
		};

		vm.onVerifyLogin = function () {

			var n = $localStorage.user;
			var dataObject = {username: n.username, code: vm.code.verify_phone };

			authService.verifyLogin(dataObject)
				.then(function (user) {
					$localStorage.token = user.data.data.token;
					$location.path('/posts');
				})
				.catch(function (err) {
					console.log(err);
					growl.success('There is an error while confirming your request',{title: 'Error!', ttl: 3000});
				});
		};
	}

	function authRegisterController($location, growl, authService) {

		var vm = this;
		vm.user = {};
		vm.onRegister = function () {

			//growl.warning("Override global ttl setting", {ttl: 3000});
			authService.register(vm.user)
				.then(function (user) {
					growl.success('User registered successfully',{title: 'Success!', ttl: 3000});
					$location.path('/login');
				})
				.catch(function (err) {
					console.log(err);
					growl.error('Error while registering user',{title: 'Error!', ttl: 3000});
				});
		};
		vm.onGo = function () {
			$location.path('/login');
		};
	}

	function authLogoutController($scope, $location, $localStorage, $http, growl) {

			$localStorage.$reset();
			growl.info('You are logout now',{title: 'Info!', ttl: 3000});
			$location.path('/login');

	}
})();
