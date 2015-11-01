var express = require( 'express' ),
	morgan = require( 'morgan' ),
	bodyParser = require( 'body-parser' ),
	methodOverride = require( 'method-override' ),
	compress = require( 'compression' ),
	session = require( 'express-session' ),
	path = require( 'path' );

module.exports = function() {
	var app = express();

	if( process.env.NODE_ENV === 'development' ) {
		app.use( morgan( 'dev' ) );
	}
	else if( process.env.NODE_ENV === 'production' ) {
		app.use( compress() ); 
	}

	app.use( bodyParser.urlencoded({
		extended: true
	}));
	app.use( bodyParser.json() );

	app.use( methodOverride() );

	app.use( express.static( __dirname + '../../public' ) );

	require( '../app/routes/inv.server.route' )( app );
	require( '../app/routes/index.server.route' )( app );
	require( '../app/routes/mr.server.route')( app );
	return app;
}