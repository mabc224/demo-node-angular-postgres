(function () {

	'use strict';

	angular
		.module('mapperApp.factory', [])
		.factory('authInterceptorFactory', authInterceptorFactory);

	authInterceptorFactory.$inject = ['$q', '$location', '$localStorage', 'growl'];

	function authInterceptorFactory($q, $location, $localStorage, growl) {

		return {
			// Add authorization token to headers
			request: function (config) {
				config.headers = config.headers || {};
				config.headers['Accept'] = 'application/json';
				config.headers['Content-Type']= 'application/json'
				if ($localStorage.token) {
					config.headers.Authorization = 'Bearer ' + $localStorage.token;
				}
				return config;
			},

			// Intercept 401s and redirect you to login
			responseError: function(response) {
				if (response.status === 401 || response.status === 403) {
					$localStorage.$reset();
					growl.error('You are trying to access restricted content',{title: 'Error!', ttl: 3000});
				}
				return $q.reject(response);
			}
		};
	}

})();
