angular.module( 'Inventory' ).config(['$routeProvider', function( $routeProvider ) {
	$routeProvider.
		when( '/inv', {
			templateUrl: 'modules/inventory/views/inventory-view.html',
			controller: 'InventoryController'
		});
}]);