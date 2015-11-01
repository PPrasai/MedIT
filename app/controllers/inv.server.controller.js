var Item =  require( 'mongoose' ).model( 'Item' ),
	config = require( '../../config/config' );

exports.list = function( req, res, next ) {

	Item.find( {}, function( err, items ) {
		if( err ) {
			return next( err );
		}
		else {
			res.json( items );
		}
	});
};

exports.create = function( req, res, next ) {

	var item = new Item( req.body );

	item.save( function( err ) {
		if( err ) {
			return next( err );
		}
		else {
			res.json({
				'status': 'OK',
				'message': 'Item successfully saved.'
			});
		}
	});
};

exports.read = function( req, res ) {
	res.json( req.item );
};

exports.findById = function( req, res, next, id ) {
	Item.findOne({
		_id: id
	}, function( err, item ) {
		if( err ) {
			return next( err );
		}
		else {
			req.item = item;
			next();
		}
	})
};

exports.udpate = function( req, res, next ) {

	Item.findByIdAndUpdate( req.item.id, req.body, function( err, item ) {
		if( err ) {
			return next( err );
		}
		else {
			res.json( item );
		}
	});
};

exports.delete = function( req, res, next ) {

	req.item.remove( function( err ) {
		if( err ) {
			return next( err );
		}
		else {
			res.json( req.item );
		}
	});
};

exports.qty = function( req, res, next, id ) {
	Item.findOne({
		_id: id
	}, function( err, item ) {
		if( err ) {
			return next( err );
		}
		else {
			req.item = item.qty;
			next();
		}
	})
}