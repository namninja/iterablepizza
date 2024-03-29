const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../app/models/user");
const fs = require("fs");

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
  // if user is authenticated in the session, carry on
  if (req.isAuthenticated()) return next();
  // if they aren't redirect them to the home page
  res.redirect("/");
}

// HOME PAGE (with login links)
router.get("/", function(req, res) {
  res.render("index.ejs", { user: req.user }); // load the index.ejs file
});

// =============================================================================
// AUTHENTICATE (FIRST LOGIN) ==================================================
// =============================================================================

// show the login form
router.get("/login", function(req, res) {
  // render the page and pass in any flash data if it exists
  res.render("login.ejs", {
    message: req.flash("loginMessage"),
    user: req.user
  });
});

// process the login form
router.post(
  "/login",
  passport.authenticate("local-login", {
    successRedirect: "/menu", // redirect to the secure profile section
    failureRedirect: "/login", // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
  })
);

// show the signup form
router.get("/signup", function(req, res) {
  // render the page and pass in any flash data if it exists
  res.render("signup.ejs", {
    message: req.flash("signupMessage"),
    user: req.user
  });
});

// process the signup form
router.post(
  "/signup",
  passport.authenticate("local-signup", {
    successRedirect: "/menu", // redirect to the secure profile section
    failureRedirect: "/signup", // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
  })
);

router.get("/menu", function(req, res) {
  
      res.render("menu.ejs", {
            // get the user out of session and pass to template
      });
    
  
});

router.get("/menu/pepperoni", function(req, res) {
  // render the page and pass in any flash data if it exists
  res.render("pepperoni.ejs", {
    message: req.flash("pepperoni"),
  
  });
});
// show the apple-app-site-association file
router.get("/apple-app-site-association", function(req, res) {
  // render the page and pass in any flash data if it exists
  fs.readFile('views/apple-app-site-association', 'utf8', (err, text) => {
    res.end(text);
  })
  
});
router.get("/.well-known/assetlinks.json", function (req, res) {
  // render the page and pass in any flash data if it exists
  fs.readFile('views/.wellknown/assetlinks.json', 'utf8', (err, text) => {
    res.end(text);
  })

});
// LOGOUT ==============================
router.get("/logout", function(req, res) {
  req.logout();
  res.redirect("/");
});

module.exports = router;
