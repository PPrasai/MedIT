angular.module( 'Inventory' ).controller( 'InventoryController', ['$scope', 'InventoryService', function( $scope, InventoryService ) {
	$scope.appTitle = 'CIMS';
	$scope.selected = null;
	$scope.depletedAmount = 0;
	$scope.purchases = {
		payment_due: 0,
		rate: 0.0,
		qty: 0
	};

	$scope.new_product_dialog = function() {
		$('#dialog_new_product').dialog();
	};

	$scope.recalculate = function() {
		$scope.purchases.payment_due = ( $scope.purchases.rate * $scope.purchases.qty ) - $scope.purchases.payment_amount;
		console.log( $scope.purchases.payment_due );
		console.log( $scope.purchases );
	};

	$scope.productList = null; 

	var productListPre = InventoryService.GETinv();
	
	productListPre.then( function( result ) {
		$scope.productList = result;
		for (var i = $scope.productList.length - 1; i >= 0; i--) {
			$scope.productList[i].qty = $scope.productList[i].qty || 0;
		};
	});

	$scope.newProduct = {
		'name': null,
		'bonus': {
			'bonus_condition': null,
			'bonus_amt': null
		} 
	};

	$scope.setSelected = function( element ) {
		$scope.selected = element.item;
		$scope.depletedAmount = $scope.selected.qty;
	}

	$scope.paymentTypeChange = function() {

		if( $scope.purchases.payment_type == 'full' ) {
			$scope.purchases.payment_due = 0;
			$scope.purchases.payment_amount = $scope.purchases.rate * $scope.purchases.qty;
			$('#payment-amount').attr( 'disabled', 'true' );
		}

		if( $scope.purchases.payment_type == 'part' ) {
			$('#payment-amount').attr( 'disabled', 'false' );	
		}

		if( $scope.purchases.payment_type == 'cr' ) {
			$scope.purchases.payment_due = $scope.purchases.rate * $scope.purchases.qty;
			$scope.purchases.payment_amount = 0;
			$('#payment-amount').attr( 'disabled', 'true' );
		}
	};

	$scope.confirmNewProduct = function() {
		InventoryService.POSTinv( $scope.newProduct );
		location.reload( true );
		$('#dialog_new_product').dialog();
	}

	$scope.confirmChangeName = function() {
		var changeConfirm = InventoryService.PUTinv( $scope.selected );
		changeConfirm.then( function( result ) {
			console.log( result );
			$('.changeName').modal( 'hide' );
		});
	}

	$scope.confirmDepleteProduct = function() {

		if( $scope.depletedAmount > $scope.selected.qty ) {
			alert( 'Depleted amount must be less than the existing amount.' );
		}

		else {
			var depleteConfirm = InventoryService.PUTinv( $scope.selected );
			depleteConfirm.then( function( result ) {
				console.log( result );
				$('.depleteProduct').modal( 'hide' );
			});
		}
	}

	$scope.confirmBuyNewProduct = function() {
		$scope.selected.purchases.push( $scope.purchases );
		$scope.selected.qty += $scope.purchases.qty;
		var buyConfirm = InventoryService.PUTinv( $scope.selected );
		buyConfirm.then( function( result ) {
			console.log( result );
			$('.buyNewProduct').modal( 'hide' );
		});
	}
}]);