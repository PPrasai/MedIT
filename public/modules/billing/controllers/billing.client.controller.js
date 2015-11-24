angular.module( 'Billing' ).controller( 'BillingController', [ '$scope', 'InventoryService', 'MRService', function( $scope, InventoryService, MRService ) {
	$scope.moduleTitle = 'Billing Module';
	$scope.ProductList = null;
	$scope.PharmacyList = [];
	$scope.batchList = [];
	$scope.allInvoices = [];
	$scope.newInvoice = {
		invoice_id: null
	};
	$scope.cart = [];
	$scope.displayCart = [];
	$scope.newItemBatchList = [];
	$scope.updateData = [];
	$scope.newItemInCart = {
		_id: null,
		name: null,
		qty: null,
		batch: null,
		expiry: null,
		rate: null,
		mrp: null,
		bonus: 0
	};
	
	var inv = InventoryService.GETinv();
	var pharma = MRService.GETMR();
	
	inv.then( function( result ) {
		$scope.ProductList = result;
		for (var i = result.length - 1; i >= 0; i--) {
			for (var j = result[i].purchases.length - 1; j >= 0; j--) {
				$scope.batchList.push( {batch: result[i].purchases[j].batch} );
			};
			for (var k = result[i].sales.length - 1; k >= 0; k--) {
				$scope.allInvoices.push( result[i].sales[k] );
			};
		};

		$scope.$watch( 'newItemInCart._id', function( val ) {
			$scope.newItemBatchList = [];
			for (var i = $scope.ProductList.length - 1; i >= 0; i--) {
				if( $scope.ProductList[i]._id == val ) {
					$scope.newItemInCart.name = $scope.ProductList[i].name;
					for (var j = $scope.ProductList[i].purchases.length - 1; j >= 0; j--) {
						$scope.newItemBatchList.push( $scope.ProductList[i].purchases[j].batch );
					};
				}
			};
		});

		$scope.$watch( 'newItemInCart.batch', function( val ) {
			for (var i = $scope.ProductList.length - 1; i >= 0; i--) {
				if( $scope.ProductList[i]._id == $scope.newItemInCart._id ) {
					for (var j = $scope.ProductList[i].purchases.length - 1; j >= 0; j--) {
						if( $scope.ProductList[i].purchases[j].batch == val.trim() ) {
							$scope.newItemInCart.expiry = $scope.ProductList[i].purchases[j].expires_in;
							$scope.newItemInCart.mrp = $scope.ProductList[i].purchases[j].mrp;
						}
					};
				}
			};
		});

		$scope.$watch( 'newItemInCart.qty', function( val ) {
			for (var i = $scope.ProductList.length - 1; i >= 0; i--) {
				if( $scope.ProductList[i]._id == $scope.newItemInCart._id ) {
					console.log( $scope.ProductList[i].bonus );
					if ( val > $scope.ProductList[i].bonus.bonus_condition ) {
						$scope.newItemInCart.bonus = parseInt( val / $scope.ProductList[i].bonus.bonus_condition ) * $scope.ProductList[i].bonus.bonus_amt;
					};
				}
			};
		});
	});

	pharma.then( function( result ) {
		for (var i = result.length - 1; i >= 0; i--) {
			for (var j = result[i].firms.length - 1; j >= 0; j--) {
				$scope.PharmacyList.push( result[i].firms[j].pharmaName );
			};
		};
	});

	$scope.createNewInvocie = function() {
		if( $scope.newInvoice.invoice_id == null || $scope.newInvoice.invoice_id == '' ) {
			alert( 'Invoice ID not entered.' );
			return false;
		}
		if( $scope.newInvoice.date == null || $scope.newInvoice.date == '' ) {
			$scope.newInvoice.date = new Date();
		}
		if( $scope.newInvoice.pharma == null || $scope.newInvoice.pharma == '' ) {
			alert( 'Pharmacy not selected' );
			return false;
		}

		$('.newInvoiceModal').modal( 'show' );
	}

	$scope.newItemModalShow = function() {
		$('.newInvoiceModal').modal( 'hide' );
		$('.addNewProduct').modal( 'show' );
	};

	$scope.checkout = function () {
		for (var i = $scope.updateData.length - 1; i >= 0; i--) {
			InventoryService.PUTinv( $scope.updateData[i] ).then( function( result ) {
				console.log( 'Done.' );
				$('.newInvoiceModal').modal( 'hide' );
				$('.successModal').modal( 'show' );		
			});
		};
	};

	$scope.success = function() {
		$('.successModal').modal( 'hide' );
	};

	$scope.addToCart = function() {
		$('.addNewProduct').modal( 'hide' ); 
		$scope.cart.push( $scope.newItemInCart );

		for (var i = $scope.ProductList.length - 1; i >= 0; i--) {
			for (var j = $scope.cart.length - 1; j >= 0; j--) {
				if( $scope.ProductList[i]._id == $scope.cart[j]._id ) {
					$scope.ProductList[i].qty -= ( $scope.cart[j].qty + $scope.cart[j].bonus );
					$scope.ProductList[i].sales.push( {
						date: $scope.newInvoice.date,
						invoice_id: $scope.newInvoice.invoice_id,
						qty: $scope.cart[j].qty,
						rate: $scope.cart[j].rate,
						mrp: $scope.cart[j].mrp,
						bonus_amt: $scope.cart[j].bonus || 0,
						batch: $scope.cart[j].batch.trim(),
						expires_in: $scope.cart[j].expiry
					});
					$scope.updateData.push( $scope.ProductList[i] );
					$scope.displayCart.push( $scope.cart[j] );
					$scope.cart = [];
					console.log( $scope.updateData );
				}
			};
		};

		$scope.newItemInCart = {};
		$('.newInvoiceModal').modal( 'show' );
	}
}]);