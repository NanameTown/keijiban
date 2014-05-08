var mongoose = require("mongoose");

module.exports = function(url){

	var db = mongoose.connect(url);

};

var UserSchema = mongoose.Schema({
	id:{
		type: String,
		index:{unique:true},
		required:true
	},
	name: {
		type: String,
		required:true
	}
});

var User = mongoose.model('User',UserSchema);

exports.create = function(id,name,callback){
	
	var user = new User({
		id:id,
		name:name
	});

	user.save(function(err,user){
		if(err){
			console.error(err);
		}
		callback && callback(err,user);
	});
};

exports.read = function(id,callback){
	User.findOne(function(err,users){
		if(err){
			console.error(err);
		}
		callback(err,users);
	});
};

exports.update = function(id,name,callback){
	User.findOne({id:id},function(err,user){
		if(err){
			console.error(err);
		}
		user.name = name;
		user.save(function(err,user){
			if(err){
				console.error(err);
			}
			callback && callback(err,user);
		});
	});
};

exports.delete = function(id,callback){
	User.findOne({id:id},function(err,user){
		if(err){
			console.errer(err);
		}
		user.remove(function(err){
			if(err){
				console.error(err);
			}
			callback && callback(err);
		});
	});
};
