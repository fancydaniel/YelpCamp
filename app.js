var express = require("express"),
    app = express(),
    port = 3000,
    bodyParser = require('body-parser'),
    mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/yelp_camp", {useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

// SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create(
//   {
//     name: "Sierra Slope",
//     image: "https://farm6.staticflickr.com/5770/21041850120_576276328d_m.jpg",
//     description: "This is a campground located in the Eastern Sierras in California."
//   }, function(err, campground){
//       if(err) {
//         console.log(err);
//       } else {
//         console.log("NEWLY CREATED CAMPGROUND!");
//         console.log(campground);
//       }
//     }
//   );

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
  Campground.findById(req.params.id, function(err, foundCampground){
    if(err) {
      console.log(err)
    } else {
      res.render("show", {campground: foundCampground});
    }
  });
  
  // render show template with that campground
  
});

app.listen(port, () => console.log('Gator app listening on port 3000!'));

// app.listen(process.env.PORT, process.env.IP, function(){
//    console.log("The YelpCamp server has started");
// });