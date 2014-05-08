var mongoose = require("mongoose");

var db = mongoose.connect("localhost");

var Time = mongoose.Schema({
	fulltime: Date,
	_year: Number,
	_month: String,
	_day: String,
	_hour: String,
	_minute: String
});

var BoardSchema = mongoose.Schema({
	numb: Number,
	name: String,
	title: String,
	remark: String,
	pw: String,
	rekind: String,
	address: String,
	time: [Time]
});

var Board = mongoose.model("Board", BoardSchema);

exports.create = function(name,title,remark,pw,rekind,address,callback){

	var board = new Board({
		name:name,
		title:title,
		remark:remark,
		pw:pw,
		rekind:rekind,
		address:address,
	});

	Board.find({},function(err,res){
		if(err){
			return console.error(err);
		}
		board.numb = res.length+1;
		board.time.push({
			fulltime:new Date(),
			_year:(new Date).getFullYear(),
			_month:ZeroPadding((new Date).getMonth()+1),
			_day:ZeroPadding((new Date).getDate()),
			_hour:ZeroPadding((new Date).getHours()),
			_minute:ZeroPadding((new Date).getMinutes())
		});
		board.save(function(err,board){
			if(err){
				return console.error(err);
			}
			callback && callback(err,board);
		});
	});
};

exports.find = function(numb,callback){

	Board.find({numb:numb.numb},function(err,res){
		if(err){
			return console.error(err);
		}
		callback && callback(err,res);
	});
};

exports.findAll = function(req,callback){

	Board.find({},function(err,res){
		if(err){
			return console.error(err);
		}
		callback && callback(err,res);
	});
};

function ZeroPadding(n){
	return (String(n).length<2?"0"+n:String(n));
}