var express = require("express");
var router = express.Router();
var Berber = require("../models/berber.js");
var Comment = require("../models/comment.js");



router.get("/",function(req,res){
  Berber.find({},function(err,allBerberler){
    if(err){
      console.log(err);
    }
    else {
      res.render("berberler/index",{berberler :allBerberler});
    }
  })
});



router.post("/",isLoggedIn,function(req,res){
  // var newcamp = {name:req.body.name , image: req.body.image};
  var name = req.body.name;
  var image = req.body.image;
  var desc = req.body.description;
  var newBerber = {name:name , image : image,description : desc};
  Berber.create(newBerber,function(err,newlyCreated){
    if(err){
      console.log(err);
    }
    else {
      res.redirect("berberler");
    }
  });
});

router.get("/new",isLoggedIn,function(req,res){
  res.render("berberler/new");
});

router.get("/:id",function(req,res){
  Berber.findById(req.params.id).populate("comments").exec(function(err,foundBerber){
    if(err){
      console.log(err);
    }
    else {
      res.render("berberler/show",{berber:foundBerber});
    }
  });
});

function isLoggedIn(req,res,next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/login");
}

module.exports = router;
