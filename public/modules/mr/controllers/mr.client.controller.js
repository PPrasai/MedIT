angular.module( 'MR' ).controller( 'MRController', ['$scope', 'MRService', function( $scope, MRService ) {
	$scope.moduleTitle = 'Medical Representatives';
	$scope.MRList = null;
	$scope.newMR = null;
	$scope.selectedMR = null;
	$scope.newPharmacy = null;

	var MRs = MRService.GETMR();

	MRs.then( function( result ) {
		$scope.MRList = result;
		console.log( $scope.MRList );
	});

	$scope.confirmNewMR = function() {
		var newMRResult = MRService.POSTMR( $scope.newMR );
		newMRResult.then( function( result ) {
			console.log( result );
			location.reload( true );
		});
	};

	$scope.openMRDetailsModal = function( element ) {
		$scope.selectedMR = element.mr;
		$('.MRDetails').modal( 'show' );
	};

	$scope.confirmNewPharmacy = function() {
		$scope.selectedMR.firms.push( $scope.newPharmacy );
		var newPharmacyResult = MRService.PUTMR( $scope.selectedMR );
		newPharmacyResult.then( function( result ) {
			console.log( result );
			location.reload( true );
		});
	};

}]);