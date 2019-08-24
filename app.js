var express = require("express"),
    app = express(),
    port = 3000,
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    Campground = require('./models/campground'),
    seedDB    = require('./seeds');

mongoose.connect("mongodb://localhost:27017/yelp_camp", {useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
seedDB();

app.get("/", function(req, res){
   res.render("landing");
});

app.get("/campgrounds", function(req, res){
    // Get All Campgrounds from DB
    Campground.find({}, function(err, allCampgrounds){
      if(err) {
        console.log(err)
      } else {
        res.render("index", {campgrounds: allCampgrounds});
      }
    });
});

app.post("/campgrounds", function(req, res){
  // get data from form and add to campgrounds array
  var name = req.body.name;
  var image = req.body.image;
  var desc = req.body.description;
  var newCampground = { name: name, image: image, description: desc }

  // create a new Campground and save to DB
  Campground.create(newCampground, function(err, newlyCreated){
    if (err) {
      console.log(err);
    } else {
      // redirect back to campgrounds page
      res.redirect("/campgrounds");
    }
  });
});

app.get("/campgrounds/new", function(req, res){
    res.render("new.ejs");
});

// SHOW - shows more info about one campground 
app.get("/campgrounds/:id", function(req, res){
  // Find the campground with provided id
  Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
    if(err) {
      console.log(err)
    } else {
      console.log(foundCampground);
      res.render("show", {campground: foundCampground});
    }
  });
  
  // render show template with that campground
  
});

app.listen(port, () => console.log('Gator app listening on port 3000!'));

// app.listen(process.env.PORT, process.env.IP, function(){
//    console.log("The YelpCamp server has started");
// });