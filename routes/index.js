module.exports = function(){

	this.get("/",function(req,res){
	
		res.render("index",{ title:"一覧"});
	
	});
	this.post("/",function(req,res){
		res.render("index",{});
	
	});

	this.get("/new",function(req,res){

		res.render("index", {});
	
	});
	var posts = [];

	this.post("/new",function(req,res){
		if(req.body.name && req.body.title && req.body.remark){
			posts.push(req.body.name);
			console.log(req.body.name);
			res.render("index",{name:posts});
		}else{
			
		}
	
	});

};