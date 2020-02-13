var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Berber = require("./models/berber");
var seedDB = require("./seeds");
var Comment = require("./models/comment");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var User = require("./models/user")

var commentRoutes = require("./routes/comments");
var berberRoutes = require("./routes/berberler");
var indexRoutes = require ("./routes/index");

var port=3000;
// mongoose .connect('mongodb://localhost:27017/berber_v1', {
// useUnifiedTopology: true,
// useNewUrlParser: true,
// })
// .then(() => console.log('DB Connected!'))
// .catch(err => {
//      console.log(`DB Connection Error: ${err.message}`);
// });
mongoose.connect( "mongodb+srv://sknrk:emre2780323@cluster0-tkorh.mongodb.net/test?retryWrites=true&w=majorityCopy",
{ useNewUrlParser: true, useUnifiedTopology: true },
() => { console.log("we are connected")}).catch(err => console.log(err));

app.use(bodyParser.urlencoded({extended : true}));
app.set("view engine","ejs");
app.use(express.static(__dirname + "/public"));
seedDB();

app.use(require("express-session")({
  secret : "Once again Rusty wins cutest dog",
  resave : false,
  saveUninitialized : false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
  res.locals.currentUser = req.user;
  next();
});

app.use(indexRoutes);
app.use("/berberler",berberRoutes);
app.use("/berberler/:id/comments",commentRoutes);

app.listen(process.env.PORT || 5000, process.env.IP, function(){
    console.log(`Example app listening on port ${port}!`);
});
