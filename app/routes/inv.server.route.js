module.exports = function( app ) {
	var inv = require( '../controllers/inv.server.controller' );

	app.route( '/inv/' ).get( inv.list ).post( inv.create );

	app.route( '/inv/:prodId' )
		.get( inv.read )
		.put( inv.udpate )
		.delete( inv.delete );

	app.route( '/qty/' ).get( inv.qty );

	app.param( 'prodId', inv.findById );
};