var express = require("express");
var app = express(); 
var port = 3000;
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");

app.get("/", function(req, res){
   res.render("landing");
});

app.get("/campgrounds", function(req, res){
   var campgrounds = [
            {name: "Salmon Creek", image: "https://live.staticflickr.com/3266/2745091274_edcd0176ff_m.jpg"},
            {name: "Granite Hill", image: "https://live.staticflickr.com/3225/2745087816_aa0899f878_m.jpg"},
            {name: "Mountain Goats Rest", image: "https://live.staticflickr.com/2482/3729900700_5e06c7293a_m.jpg"}
       ];
       
       res.render("campgrounds", {campgrounds: campgrounds});
});

app.post("/campgrounds", function(req, res){
  res.send('You hit the post route')
  // get data from form and add to campgrounds array
  // redirect back to campgrounds page

});

app.get("/campgrounds/new", function(req, res){
    res.render("new.ejs");
});

app.listen(port, () => console.log('Gator app listening on port 3000!'));

// app.listen(process.env.PORT, process.env.IP, function(){
//    console.log("The YelpCamp server has started");
// });