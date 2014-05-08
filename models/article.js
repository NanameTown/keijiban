var mongoose = require("mongoose");

module.exports = function(url){
	var db = mongoose.connect(url);
};

var Schema = mongoose.Schema;

var BoardPost = new Schema({
	name:{ type:String }
});

exports.BoardPost = mongoose.model('Board', BoardPost);
