var express = require('express');
var router = express.Router();

router.post("/login", function(req,res) {
   console.log("POST LOGIN", req.body.username, req.body.password );
   if(authenticate( req.body.username, req.body.password )) {
      req.session.isLoggedIn = true;
      console.log('inlog OK');
      res.redirect("/#/quizOverview");
   } else {
      console.log("Wachtwoord of gebruikersnaam verkeerd");
   }

});

router.get("/login", checkAuthentication, function(req,res) {
   console.log("GET GEHEIM");
});


function checkAuthentication(req,res,next) {
   if( req.session && req.session.isLoggedIn === true ) {
      console.log("checkAuthentication OK");
   } else {
      console.log("checkAuthentication FAILED");
   }

}

function authenticate( uname, passwd) {
   return uname==="admin" && passwd === "123";
}

module.exports = router;
