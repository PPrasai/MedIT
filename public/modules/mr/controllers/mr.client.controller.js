angular.module( 'MR' ).controller( 'MRController', ['$scope', 'MRService', function( $scope, MRService ) {
	$scope.moduleTitle = 'Medical Representatives';
	$scope.MRList = null;
	var MRs = MRService.GETMR();

	MRs.then( function( result ) {
		$scope.MRList = result;
		console.log( $scope.MRList );
	});

}]);