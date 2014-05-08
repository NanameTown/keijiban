var mongoose = require("mongoose");

var db = mongoose.connect("localhost");

module.exports = {
	Board:require("./board")(db)

}