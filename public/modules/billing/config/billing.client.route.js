angular.module( 'Billing' ).config( ['$routeProvider', function( $routeProvider ) {
	$routeProvider.
		when( '/bill', {
			templateUrl: 'modules/billing/views/billing-view.html',
			controller: 'BillingController'
		});
}]);