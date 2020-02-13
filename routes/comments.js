var express = require("express");
var router = express.Router({mergeParams:"True"});
var Berber = require("../models/berber.js");
var Comment = require("../models/comment.js");


router.get("/new",isLoggedIn,function(req,res){
  Berber.findById(req.params.id,function(err,berber){
    if(err){
      console.log(err);
    }
    else {
      res.render("comments/new",{berber : berber});
    }
  });
});
router.post("/",isLoggedIn,function(req,res){
  Berber.findById(req.params.id,function(err,berber){
    if(err){
      console.log(err);
      res.redirect("/berberler");
    }
    else {
      Comment.create(req.body.comment,function(err,comment){
        if(err){
          console.log(err);
        }
        else {
          berber.comments.push(comment);
          berber.save();
          res.redirect("/berberler/"+berber._id);
        }
      });
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
