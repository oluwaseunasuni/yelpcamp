var express 	= require("express"),
	app 		= express(),
	bodyParser 	= require("body-parser"),
	mongoose 	= require("mongoose")

//database connection
mongoose.connect("mongodb://localhost/yelp_camp", { useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

// var campgrounds = [
//         {name: "Salmon Creek", image: "https://farm9.staticflickr.com/8442/7962474612_bf2baf67c0.jpg"},
//         {name: "Granite Hill", image: "https://farm1.staticflickr.com/60/215827008_6489cd30c3.jpg"},
//         {name: "Mountain Goat's Rest", image: "https://farm7.staticflickr.com/6057/6234565071_4d20668bbd.jpg"},
// ];

app.get("/", function(req, res){
	res.render("landing");
});

app.get("/campgrounds", function(req, res){
	//Get all campgrounds from the DB
	Campground.find({}, function(err, allCampgrounds){
		if(err){
			console.log(err);
		} else {
			res.render("campgrounds", {campgrounds:allCampgrounds});	
		}
	});
	
});


// SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
	name: String,
	image: String
});

//compiles schema into a model
var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create(
// 	{
// 		name: "Salmon Creek",
// 		image: "https://farm9.staticflickr.com/8442/7962474612_bf2baf67c0.jpg"
// 	}, function(err, campground){
// 		if(err){
// 			consoleole.log(err);
// 		} else {
// 			console.log("NEWLY CREATED CAMPGROUND: ");
// 			console.log(campground);
// 		}
// 	});

// Campground.create(
// 	{
// 		name: "Granite Hill",
// 		image: "https://farm1.staticflickr.com/60/215827008_6489cd30c3.jpg"
// 	}, function(err, campground){
// 		if(err){
// 			consoleole.log(err);
// 		} else {
// 			console.log("NEWLY CREATED CAMPGROUND: ");
// 			console.log(campground);
// 		}
// 	});

// Campground.create(
// 	{
// 		name: "Mountain Goat's Rest",
// 		image: "https://farm9.staticflickr.com/8442/7962474612_bf2baf67c0.jpg"
// 	}, function(err, campground){
// 		if(err){
// 			consoleole.log(err);
// 		} else {
// 			console.log("NEWLY CREATED CAMPGROUND: ");
// 			console.log(campground);
// 		}
// 	});

// Campground.create(
// 	{
// 		name: "Salmon Creek",
// 		image: "https://farm1.staticflickr.com/60/215827008_6489cd30c3.jpg"
// 	}, function(err, campground){
// 		if(err){
// 			consoleole.log(err);
// 		} else {
// 			console.log("NEWLY CREATED CAMPGROUND: ");
// 			console.log(campground);
// 		}
// 	});

// Campground.create(
// 	{
// 		name: "Mountain Goat's Rest",
// 		image: "https://farm7.staticflickr.com/6057/6234565071_4d20668bbd.jpg"
// 	}, function(err, campground){
// 		if(err){
// 			consoleole.log(err);
// 		} else {
// 			console.log("NEWLY CREATED CAMPGROUND: ");
// 			console.log(campground);
// 		}
// 	});

//collects data via the forms
app.post("/campgrounds", function(req, res){
	var name = req.body.name;
	var image = req.body.image;
	var newCampground = {name: name, image: image};
	// Create a new campground and save to DB
	Campground.create(newCampground, function(err, newlyCreated){
		if(err){
			console.log(err);
		} else {
			//redirect back to campgrounds page
			res.redirect("/campgrounds");
		}
	});	
});

//shows form that would send data to the campground post route
app.get("/campgrounds/new", function(req, res){
	res.render("new.ejs");
});


app.listen(process.env.PORT || 3000, process.env.IP, function(){
	console.log("The YelpCamp Server has statred");
});

