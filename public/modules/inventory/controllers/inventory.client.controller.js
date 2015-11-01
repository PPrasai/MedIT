angular.module( 'Inventory' ).controller( 'InventoryController', ['$scope', 'InventoryService', function( $scope, InventoryService ) {
	$scope.appTitle = 'CIMS';

	$scope.new_product_dialog = function() {
		$('#dialog_new_product').dialog();
	}

	$scope.productList = null; 

	var productListPre = InventoryService.GETinv();
	
	productListPre.then( function( result ) {
		$scope.productList = result;
	});

	$scope.newProduct = {
		'name': null,
		'bonus': {
			'bonus_condition': null,
			'bonus_amt': null
		} 
	};

	$scope.confirmNewProduct = function() {
		InventoryService.POSTinv( $scope.newProduct );
		location.reload( true );
		$('#dialog_new_product').dialog();
	}
}]);
