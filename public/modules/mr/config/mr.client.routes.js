angular.module( 'MR' ).config( ['$routeProvider', function( $routeProvider ) {
	$routeProvider.
		when( '/mr', {
			templateUrl: 'modules/mr/views/mr-view.html',
			controller: 'MRController'
		});
}]);