var express = require("express");
var app = express(); 
var port = 3000;

app.get("/", function(req, res){
   res.send("this will be the landing page soon.") 
});

app.listen(port, () => console.log('Gator app listening on port 3000!'));

// app.listen(process.env.PORT, process.env.IP, function(){
//    console.log("The YelpCamp server has started");
// });