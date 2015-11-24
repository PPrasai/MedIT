angular.module( 'Billing' ).factory( 'BillingService', function( $http ) {
	return {
		GETinv: function( product ) {
			return $http({
				method: 'GET',
				url: 'inv',
				data: product
			}).then( function( result ) {
				return result.data;
			}, function( err ) {
				console.log( err );
			})
		}
	}
});