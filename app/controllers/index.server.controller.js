var path = require( 'path' );

exports.render = function( req, res ) {
	res.sendFile( path.join( __dirname + '../../../public/index.html' ));
};
