var express = require("express");
var app = express();

app.get("/", function(req, res){
	res.send("this will be the landing page soon!");
});

app.listen(process.env.PORT || 3000, process.env.IP, function(){
	console.log("The YelpCamp Server has statred");
});