const express = require("express");
const User = require("../models/user");
const router = express.Router();

router.get("/signup", (req, res) => {
  res.render("user/signup.ejs", { user: new User(), signup: true });
});

router.get("/signin", (req, res) => {
  res.render("user/signin.ejs", { user: new User(), signup: false });
});

module.exports = router;
