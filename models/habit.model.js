

var mongoose = require("mongoose");




var habitSchema = new mongoose.Schema({
	title: String,
	description: String,
	createDate: Date,
	endDate: Date,
	daysStatusData:[
       {
       	 day: Number,
       	 status: String
       }
	],
	author: {
		id:{
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		}
	},
	block: Boolean

});



module.exports = mongoose.model("Habit", habitSchema);