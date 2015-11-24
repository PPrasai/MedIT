angular.module( 'Inventory' ).factory( 'InventoryService', function( $http ) {
	return {
		POSTinv: function( product ) {
			return $http({
				method: 'POST',
				url: 'inv',
				data: product
			}).then( function( result ) {
				return result.data;
			}, function( err ) {
				console.log( err );
			})
		},

		GETinv: function( id ) {
			if( ! id ) {
				return $http({
					method: 'GET',
					url: 'inv'
				}).then( function( result ) {
					return result.data;
				},
				function( err ) {
					console.log( err ); 
				})
			}

			else {
				return $http({
					method: 'GET',
					url: 'inv/'+ id
				}).then( function( result ) {
					return result.data;
				},
				function( err ) {
					console.log( err ); 
				})
			}
		},

		PUTinv: function( selected ) {
			return $http({
				method: 'PUT',
				url: 'inv/'+ selected._id,
				data: selected
			}).then( function( result ) {
				return result.data;
			}, function( err ) {
				console.log( err );
			});
		}
	};
});