var mongoose = require("mongoose");

module.exports = function(url){

	var db = mongoose.connect(url);

});