(function () {

	'use strict';

	angular
		.module('mapperApp.config', [])
		.config(appConfig)
		.run(routeStart);

	function appConfig($routeProvider, $httpProvider) {

		$routeProvider
			.when('/', {
				templateUrl: '/js/app/components/auth/auth.login.view.html',
				controller: 'authLoginController',
				controllerAs: 'authLoginCtrl',
				restrictions: {
					ensureAuthenticated: false,
					loginRedirect: true
				}
			})
			.when('/login', {
				templateUrl: '/js/app/components/auth/auth.login.view.html',
				controller: 'authLoginController',
				controllerAs: 'authLoginCtrl',
				restrictions: {
					ensureAuthenticated: false,
					loginRedirect: true
				}
			})
			.when('/register', {
				templateUrl: '/js/app/components/auth/auth.register.view.html',
				controller: 'authRegisterController',
				controllerAs: 'authRegisterCtrl',
				restrictions: {
					ensureAuthenticated: false,
					loginRedirect: false
				}
			})
			.when('/postsAdd', {
				templateUrl: '/js/app/components/post/post.add.view.html',
				controller: 'postAddController',
				controllerAs: 'postAddCtrl',
				restrictions: {
					ensureAuthenticated: true,
					loginRedirect: false
				}
			})
			.when('/posts', {
				templateUrl: '/js/app/components/post/post.all.view.html',
				controller: 'postAllController',
				controllerAs: 'postAllCtrl',
				restrictions: {
					ensureAuthenticated: true,
					loginRedirect: false
				}
			})
			.when('/posts/:id', {
				templateUrl: '/js/app/components/post/post.single.view.html',
				controller: 'postSingleController',
				controllerAs: 'postSingleCtrl',
				restrictions: {
					ensureAuthenticated: true,
					loginRedirect: false
				}
			})
			.when('/logout', {
				template: '',
				controller: 'authLogoutController',
				restrictions: {
					ensureAuthenticated: false,
					loginRedirect: false
				}
			})
			.otherwise({
				redirectTo: '/'
			});

		// for including token in every request if present
		$httpProvider.interceptors.push('authInterceptorFactory');

	}

	function routeStart($rootScope, $localStorage, $location, $route) {
		$rootScope.$on('$routeChangeStart', function (event, next, current) {
			if (next.restrictions.ensureAuthenticated) {
				if (!$localStorage.token) {
					$location.path('/login');
				}
			}
			if (next.restrictions.loginRedirect) {
				if ($localStorage.token) {
					$location.path('/posts');
				}
			}
		});
	}

})();
