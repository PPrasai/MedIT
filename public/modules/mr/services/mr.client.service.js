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
					method: 'GET',
					url: 'mr/'+ id 
				}).then( function( result ) {
					return result.data;
				}, function( err ) {
					console.log( err );
				});
			}
		},

		POSTMR: function( newMR ) {
			return $http({
				method: 'POST',
				url: 'mr',
				data: newMR
			}).then( function( result ) {
				return result.data;
			}, function( err ) {
				console.log( err );
			});
		},

		PUTMR: function( selectedMR ) {
			return $http({
				method: 'PUT',
				url: 'mr/'+ selectedMR._id,
				data: selectedMR
			}).then( function( result ) {
				return result.data;
			}, function( err ) {
				console.log( err );
			});
		}
	}
});