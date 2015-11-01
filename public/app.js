var primaryModuleName = 'CIMS',
	primaryModuleInjects = [ 'ngRoute', 'Inventory', 'Billing', 'MR' ],
	primaryModule = angular.module( primaryModuleName, primaryModuleInjects );

angular.element( document ).ready( function() {
	angular.bootstrap( document, [primaryModuleName] );
	console.log( 'Main app module bootstrap complete' );
});