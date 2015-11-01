module.exports = function( app ) {
	var mr = require( '../controllers/mr.server.controller' );

	app.route( '/mr/' ).get( mr.list ).post( mr.create );

	app.route( '/mr/:mrId' )
		.get( mr.read )
		.put( mr.update )
		.delete( mr.delete );

	app.param( 'mrId', mr.findById );
}