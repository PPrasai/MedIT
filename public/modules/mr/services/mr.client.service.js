angular.module( 'MR' ).factory( 'MRService', function( $http ) {
	return {
		GETMR: function( id ) {
				
			if( ! id ) {
				return $http({
					method: 'GET',
					url: 'mr'
					}).then( function( result ) {
						return result.data;
					}, function( err ) {
						console.log( err );
				})
			}

			else {
				return $http({
					method: 'POST',
					url: 'mr/'+ id 
				}).then( function( result ) {
					return result.data;
				}, function( err ) {
					console.log( err );
				});
			}
		}
	}
});