var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var PostingSchema = new Schema({
	title: {
		type: String,
		required: true
	},
	link: {
		type: String,
		required: true
	},
	company: {
		type: String,
		required: false
	},
	location: {
		type: String,
		required: false
	},
	summary: {
		type: String,
		required: false
	},
	note: {
		type: Schema.Types.ObjectId,
		ref: "Note"
	}
});

var Posting = mongoose.model("Posting", PostingSchema);

module.exports = Posting;