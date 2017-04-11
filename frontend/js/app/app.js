(function () {

	'use strict';

	angular
		.module('mapperApp', [
			'ngRoute',
			'angular-growl',
			'uiGmapgoogle-maps',
			'ngStorage',
			'mapperApp.config',
			'mapperApp.components.auth',
			'mapperApp.components.post',
			'mapperApp.services',
			'mapperApp.factory'
		])

})();
