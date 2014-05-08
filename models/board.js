module.exports = function(mongoose,db){
	var BoardSchema = mongoose.Schema({
		numb: Number,
		name: String,
		title: String,
		remark: String,
		pw: String,
		rekind: String,
		address: String,
		time: {
			type: Date,default: Date.now
		}
	});

	BoardSchema.statics.create = function(name,title,remark,pw,rekind,address,callback){

		var board = new this({
			name:name,
			title:title,
			remark:remark,
			pw:pw,
			rekind:rekind,
			address:address,
		});

		this.find({},function(err,res){
			if(err){
				return console.error(err);
			}
			board.numb = res.length+1;
			board.save(function(err,board){
				if(err){
					return console.error(err);
				}
				callback && callback(err,board);
			});
		});
	};

	BoardSchema.statics.find = function(numb,callback){

		this.find({numb:numb.numb},function(err,res){
			if(err){
				return console.error(err);
			}
			callback && callback(err,res);
		});
	};

	BoardSchema.statics.findAll = function(req,callback){

		this.find({},function(err,res){
			if(err){
				return console.error(err);
			}
			callback && callback(err,res);
		});
	};

	return mongoose.model("Board", BoardSchema);
};