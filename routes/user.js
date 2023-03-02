const path = require("path");
const express = require("express");
const router = express.Router();
// import Controller
const UserController = require("../Controllers/UserController");

// render users at user page
router.get("/user", UserController.user);

// create user
router.get("/add-user", UserController.addUser);

// store users in database 
router.post("/add-user", UserController.storeUser);

// edit user
router.get("/edit-user/:userId", UserController.editUser)

// update user
router.post("/edit-user", UserController.updateUser)

// detail
router.get('/user/:userId', UserController.userDetail);

// delete user
router.post("/delete-user", UserController.deleteUser);

module.exports = router;
