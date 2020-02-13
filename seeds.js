var mongoose = require("mongoose");
var Berber = require("./models/berber");
var Comment = require ("./models/comment");

var data= [
  {
    name : "Imajı Berber",
    image : "https://s3.eu-central-1.amazonaws.com/kr-s1-4/710999596fca97a0514f016d50da7b4969c5beb8e.jpg",
    description: "Bacon ipsum dolor amet venison tail cupim biltong prosciutto burgdoggen buffalo bresaola ham hock salami kielbasa tongue drumstick. Cow short ribs rump leberkas corned beef cupim pancetta. Doner frankfurter tri-tip tail, ribeye ham t-bone drumstick. Swine pork belly turducken, drumstick alcatra ground round pastrami cupim bresaola. Salami chuck pork chop chislic tenderloin doner. Jerky chislic beef andouille shank, chicken biltong hamburger. Cow shank doner chicken meatloaf.",
  },
  {
    name : "DR John Barber's",
    image : "https://s3.eu-central-1.amazonaws.com/kr-s1-4/8782395485acad2a9ff748da6977bffbe35173ea4.jpeg",
    description: "Ham ham hock tail, pork chop kevin cow alcatra frankfurter kielbasa salami meatball. Shankle brisket ribeye andouille swine cupim filet mignon strip steak pork boudin pork belly capicola cow. Jowl frankfurter sausage, sirloin boudin shank drumstick venison spare ribs. Tongue spare ribs short ribs, biltong prosciutto ground round porchetta doner jowl cow sausage pastrami cupim turducken. Ham ribeye short ribs, strip steak pastrami andouille biltong shankle swine buffalo.",
  },
  {
    name : "Erdal Kara Gentleman's Barber's Shop",
    image : "https://s3.eu-central-1.amazonaws.com/kr-s1-4/66129802946a6cd75d75d64eb07f2670f06a8627b.jpeg",
    description: "Tenderloin pork loin tri-tip jerky meatloaf salami meatball ham hock fatback swine biltong cow buffalo. T-bone swine prosciutto, salami turducken jerky shank. Short ribs meatball boudin ham hock shankle. Pork loin sausage filet mignon, prosciutto rump jowl fatback ribeye. Beef brisket rump, strip steak jerky capicola short loin andouille shankle leberkas drumstick. Burgdoggen spare ribs ground round, pastrami bacon chuck chicken venison shank cow. Boudin pork belly flank, beef meatball strip steak spare ribs sirloin fatback.",
  }
]

function seedDB(){
  // Berberler kaldir
  Berber.deleteMany({},function(err){
    if (err) {
      console.log(err);
    }
    console.log("removed berbers!");
    // Yeni berberler  ekle
    data.forEach(function(seed){
      Berber.create(seed,function(err,berber){
          if(err){
            console.log(err);
          }
          else {
            console.log("added a berber");
          }
          Comment.create(
            {
              text:"Burası harika bir berber!",
              author : "SaçıYokAli"
            },function(err,comment){
              if(err){
                console.log(err);
              }
              else {
                berber.comments.push(comment);
                berber.save();
                console.log("Yeni yorum yazıldı");
              }
            }
          );
      });
    });
  });
};
module.exports = seedDB;
