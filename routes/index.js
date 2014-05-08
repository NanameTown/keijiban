var Board = require("../models");

function XSS(str){
	return str.replace(/&/g,"&amp;")
		.replace(/</g,"&lt;")
		.replace(/>/g,"&gt;")
		.replace(/"/g,"&quot;")
		.replace(/'/g,"&#x27;")
}

function NewLine(remark){
	return remark.replace(/\r\n/g,"<br>");
}

function QuoteSymbol(quote){
	return "> " + quote.replace(/<br>/g,"\r\n> ");
}

module.exports = function(){
	
	this.get("/",function(req,res){

		Board.findAll({},function(err,item){
			res.render("index",{ item:item });
		});
	
	});

	/*
	this.post("/",function(req,res){
		res.render("index",{});
	
	});*/

	this.get("/log/:id",function(req,res){
		Board.find({numb:req.params.id},function(err,item){
			res.render("log",{
				item:item,
				quote:QuoteSymbol(item[0].remark),
				quote_flag:(req.query.hen==1?true:false)
			});
		});
	});

	this.get("/new",function(req,res){
		res.render("new",{});
	
	});
	
	this.post("/new",function(req,res){
		var name = XSS(req.body.name);
		var title = XSS(req.body.title);
		var remark = NewLine(XSS(req.body.remark));
		var pw = req.body.pw;
		var rekind = req.body.select;
		var address = req.headers["x-forwarded-for"] || req.connection.remoteAddress;

		if(name && title && remark){
			Board.create(name,title,remark,pw,rekind,address,function(err,board){
				if(err){
					return console.log(err);
				}
				console.log(board);
			});

			res.redirect("/");
		}else{
			res.redirect("/new");
		}
	
	});
};