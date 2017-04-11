(function () {

	'use strict';

	angular
		.module('mapperApp.components.post', [])
		.controller('postAddController', postAddController)
		.controller('postAllController', postAllController)
		.controller('postSingleController', postSingleController);

	postAddController.$inject = ['$scope', '$location', '$localStorage', '$log', 'growl', 'authService'];
	postAllController.$inject = ['$scope', '$location','growl', 'authService'];
	postSingleController.$inject = ['$scope', '$routeParams', '$location', 'growl', 'authService'];

	function postAddController($scope, $location, $localStorage, $log, growl, authService) {

		$scope.markers = [];
		$scope.map = {center: {latitude: 33.738045, longitude: 73.084488 }, zoom: 8 };
		$scope.options = {scrollwheel: false};
		$scope.lat = 33.738045;
		$scope.lng = 73.084488;
		$scope.marker = {
			id: 0,
			coords: {
				latitude: 33.738045,
				longitude: 73.084488
			},
			options: { draggable: true },
			events: {
				dragend: function (marker, eventName, args) {
					$scope.lat = marker.getPosition().lat();
					$scope.lng = marker.getPosition().lng();
					$log.log($scope.lat);
					$log.log($scope.lng);

					$scope.marker.options = {
						draggable: true,
						labelContent: "lat: " + $scope.marker.coords.latitude + ' ' + 'lon: ' + $scope.marker.coords.longitude,
						labelAnchor: "100 0",
						labelClass: "marker-labels"
					};
				}
			}
		};

		var vm = this;
		vm.post = {};

		vm.onAdd = function () {
			vm.post.lat = $scope.lat;
			vm.post.lng = $scope.lng;
			vm.post.user_id = $localStorage.user.id;

			authService.addPost(vm.post)
				.then(function (post) {
					growl.success('Post is added successfully',{title: 'Success!', ttl: 3000});
					$location.path('/posts');
				})
				.catch(function (err) {
					console.log(err);
					growl.error('Error in adding post',{title: 'Error!', ttl: 3000});
				});
		};
		vm.onGo = function () {
			$location.path('/posts');
		};
	}

	function postAllController($scope, $location, growl, authService) {

		var vm = this;
		$scope.posts = [];

		$scope.map = {
			center: {
				latitude: 33.738045,
				longitude: 73.084488
			},
			zoom: 8,
			bounds: {
				northeast: {
					latitude: 37.0837,
					longitude: 74.6906
				},
				southwest: {
					latitude: 23.6948,
					longitude: 68.1331
				}
			}
		};
		$scope.options = {
			scrollwheel: false
		};

		authService.allPost()
			.then(function (obj) {
				$scope.posts = obj.data.data;

				var createPostMarker = function(data, idKey) {

					if (idKey == null) {
						idKey = "id";
					}
					var ret = {
						latitude: data.lat,
						longitude: data.lng,
						//title: data.title,
						options: {
							title: data.title,
							labelContent: "lat: " + data.lat + ' ' + 'lon: ' + data.lng,
							labelAnchor: '22 0',
							labelClass: 'marker-labels',
							labelVisible: true
						}
					};
					ret[idKey] = data.id;
					return ret;
				};
				var markers = [];
				_.forEach($scope.posts, function (data) {
					markers.push(createPostMarker(data));
				})

				$scope.postsMarkers = markers;

			})
			.catch(function (err) {
				console.log(err);
				growl.error('Error in fetching posts',{title: 'Error!', ttl: 3000});
			});

		vm.onGo = function () {
			$location.path('/postsAdd');
		};

		vm.deletePost = function (id) {
			authService.deletePost(id)
				.then(function () {

					authService.allPost()
						.then(function (obj) {
							$scope.posts = obj.data.data;

							var createPostMarker = function(data, idKey) {

								if (idKey == null) {
									idKey = "id";
								}
								var ret = {
									latitude: data.lat,
									longitude: data.lng,
									//title: data.title,
									options: {
										title: data.title,
										labelContent: "lat: " + data.lat + ' ' + 'lon: ' + data.lng,
										labelAnchor: '22 0',
										labelClass: 'marker-labels',
										labelVisible: true
									}
								};
								ret[idKey] = data.id;
								return ret;
							};
							var markers = [];
							_.forEach($scope.posts, function (data) {
								markers.push(createPostMarker(data));
							})

							$scope.postsMarkers = markers;

						})
						.catch(function (err) {
							console.log(err);
							growl.error('Error in fetching posts',{title: 'Error!', ttl: 3000});
						});


				})
				.catch(function (err) {
					console.log(err);
					growl.error('Error in deleting post',{title: 'Error!', ttl: 3000});
				});
		};



	}

	function postSingleController($scope, $routeParams, $location, growl, authService) {

		var vm = this;
		vm.post = {};

		$scope.map = {center: {latitude: 33.738045, longitude: 73.084488 }, zoom: 8 };
		$scope.options = {scrollwheel: false};

		authService.singlePost($routeParams.id)
			.then(function (obj) {
				vm.post = obj.data.data;

				$scope.marker = {
					id: 0,
					coords: {
						latitude: obj.data.data.lat,
						longitude: obj.data.data.lng
					}
				};
			})
			.catch(function (err) {
				console.log(err);
				growl.error('Error in displaying post',{title: 'Error!', ttl: 3000});
			});

		vm.onGo = function () {
			$location.path('/posts');
		};

		vm.onSinglePost = function (id) {
			$location.path('/posts/'+id);
		};

	}

})();
