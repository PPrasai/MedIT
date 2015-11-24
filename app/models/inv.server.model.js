var mongoose = require( 'mongoose' ),
	Schema = mongoose.Schema;

var ItemSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	purchases: [{
			date: Date,
			invoice_id: String,
			qty: Number,
			rate: Number,
			batch: String,
			mrp: Number,
			expires_in: Date,
			payment_type: String,
			payment_amount: Number,
			payment_due: Number,
			payment_due_date: Date
	}],
	sales: [{
			pharmacy_id: String,
			date: Date,
			invoice_id: String,
			qty: Number,
			rate: Number,
			mrp: Number,
			bonus_amt: Number,
			batch: String,
			expires_in: Date,
			payment_type: String,
			payment_amount: Number,
			payment_due: Number,
			payment_due_date: Date
	}],
	bonus: {
		bonus_condition: Number,
		bonus_amt: Number
	},
	qty: {
		type: Number,
		default: 0
	}
});

mongoose.model( 'Item', ItemSchema );