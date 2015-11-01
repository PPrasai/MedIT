var mongoose = require( 'mongoose' ),
	Schema = mongoose.Schema;

var MRSchema = new Schema({
	info: {
		name: String,
		contact: Number,
		address: String,
		target: Number,
		targetWindow: Number,
		employedSince: Date
	},
	bonus: [{
		date: Date,
		bonusAmt: Number
	}],
	firms: [{
		pharmaName: String,
		contractedSince: Date,
		address: String,
		contact: Number
	}],
	docs: [{
		docName: String,
		docContact: Number,
		docAddress: String,
		docPharma: String
	}]
});

mongoose.model( 'MR', MRSchema );