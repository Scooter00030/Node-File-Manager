var express = require("express");

var app = express();

app.get("/rand", function(req, res){
	res.send(Math.floor(Math.random() * 10) + 1);
	res.send(rand.toString());
});

app.use(express.static('public'));

app.use(function(req, res, next){
	res.status(404);
	res.write("404 file not found");
	res.end(); 
});

app.listen(8000, function(){
	console.log("server started on port 8000");
});

