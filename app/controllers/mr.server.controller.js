var MR = require( 'mongoose' ).model( 'MR' ),
	config = require( '../../config/config' );

exports.list = function( req, res, next ) {
	MR.find( {}, function( err, mr) {
		if( err ) {
			return next( err );
		}
		else {
			res.json( mr );
		}
	});
};

exports.create = function( req, res, next ) {
	var mr = new MR( req.body );

	mr.save( function( err ) {
		if( err ) {
			return next( err );
		}
		else {
			res.json({
				'status': 'OK',
				'message': 'MR successfully saved.'
			});
		}
	});
};

exports.read = function( req, res ) {
	res.json( req.mr );
};

exports.findById = function( req, res, next, id ) {
	MR.findOne({
		_id: id
	}, function( err, mr ) {
		if( err ) {
			return next( err );
		}
		else {
			req.mr = mr;
			next();
		}
	})
};

exports.update = function( req, res, next ) {
	MR.findByIdAndUpdate( req.mr.id, req.body, function( err, mr ) {
		if( err ) {
			return next( err );
		}
		else {
			res.json( mr );
		}
	});
};

exports.delete = function( req, res, next ) {
	req.mr.remove( function ( err ) {
		if( err ) {
			return next( err );
		}
		else {
			res.json( req.mr ); 
		}
	});
};