var express = require("express");
var hogan = require("hogan-express");
var http = require("http");
var path = require("path");
var MongoStore = require("connect-mongo")(express);
var routes = require("./routes");

var app = express();

app.configure(function(){

	app.set("port", process.env.PORT || 3000);
	app.set("views", path.resolve(__dirname, "views"));
	app.set("view engine", "html");
	app.set("layout","layout");
	app.engine("html",hogan);
	app.use(express.logger("dev"));
	app.use(express.json());
	app.use(express.urlencoded());
	app.use(express.methodOverride());
	app.use(express.cookieParser("your secret here"));
	app.use(express.session({
		secret:"cookie:secret",
		store: new MongoStore({
			db:"session"
		})
	}));
	app.use(app.router);
	app.use(express.static(path.join(__dirname, "static")));

});

app.configure("development",function(){

	app.use(express.errorHandler());

});

routes.call(app);

http.createServer(app).listen(app.get("port"),function(){

	console.log("Express server started.");

});