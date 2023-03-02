const express = require("express");
const router = express.Router();
// import Controllers
const AdminController = require("../Controllers/AdminController");

// display index page at default / URL
router.get("/", AdminController.index);

// display sign up page
router.get("/signup-page", AdminController.signUpPage);
// --------------- SIGN UP --------------------
router.post("/signup", AdminController.signUp);

// display login page
router.get("/login", AdminController.loginPage);
// --------------- LOG-IN --------------------
router.post("/login", AdminController.login)
router.get("/logout", AdminController.logout);

// display dashboard page
router.get("/dashboard", AdminController.dashboard);

// display admin detail page
router.get("/admin-page", AdminController.adminPage);

module.exports = router;
