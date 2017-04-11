(function () {

	'use strict';

	angular
		.module('mapperApp.services', [])
		.service('authService', authService);

	authService.$inject = ['$http'];

	function authService($http) {

		var baseURL = '/api/v1/';

		this.login = function (user) {
			return $http({
				method: 'POST',
				url: baseURL + 'accounts/login',
				data: user
			});
		};
		this.verifyLogin = function (user) {
			return $http({
				method: 'POST',
				url: baseURL + 'accounts/verifyLogin',
				data: user
			});
		};
		this.register = function (user) {
			return $http({
				method: 'POST',
				url: baseURL + 'accounts/register',
				data: user
			});
		};

		this.addPost = function (post) {
			return $http({
				method: 'POST',
				url: baseURL + 'posts',
				data: post
			});
		};
		this.singlePost = function (id) {
			return $http({
				method: 'GET',
				url: baseURL + 'posts/'+id
			});
		};
		this.allPost = function () {
			return $http({
				method: 'GET',
				url: baseURL + 'posts'
			});
		};
		this.deletePost = function (id) {
			return $http({
				method: 'DELETE',
				url: baseURL + 'posts/'+id
			});
		};
	}

})();
