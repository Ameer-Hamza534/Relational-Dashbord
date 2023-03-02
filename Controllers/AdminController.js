const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");
const { validationResult, Result } = require("express-validator");
const session = require("express-session");
const flash = require('connect-flash');
const Author = require("../Models/Author")
const Book = require("../Models/Book")

// render index page
exports.index = (req, res, next) => {
  res.render("admin/index", {
    pageTitle: "welcome",
    path: "/",
  });
};

// render login page
exports.loginPage = (req, res, next) => {
  res.render("admin/login", {
    success: req.flash("success"),
    error: req.flash("error"),
    pageTitle: "Login",
    path: "admin/login",
  });
};

// render SIGN UP page
exports.signUpPage = (req, res, next) => {
  res.render("admin/signup", {
    error: req.flash("error"),
    pageTitle: "Sign Up",
    path: "/signup-page",
  });
};

// render Dashboard
exports.dashboard = async (req, res, next) => {
  if (!req.session.isLoggedIn) {
    return res.redirect("/login");
  }
  const authors = await Author.findAll()
  const books = await Book.findAll()
  res.render("admin/dashboard", {
    authors: authors,
    books: books,
    pageTitle: "Relational Dashboard",
    path: "/dashboard",
  });
};

// render admin detail page
exports.adminPage = (req, res, next) => {
  Admin.findAll()
    .then((admin) => {
      res.render("admin/admin-page", {
        pageTitle: "Admin",
        admin: admin,
        path: "/admin-page",
      });
    })
    .catch((err) => {});
};

// sign up authentication
exports.signUp = (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  if (password !== confirmPassword) {
    req.flash("error", "password does not match");
    return res.redirect("/signup-page");
  }
  Admin.findOne({ where: { email: email } })
    .then((adminDoc) => {
      if (adminDoc) {
        res.redirect("/signup-page?error=admin-exists");
      }
      return bcrypt.hash(password, 12).then((hashedPassword) => {
        const admin = new Admin({
          name: name,
          email: email,
          password: hashedPassword,
        });
        req.flash('success', 'Admin account created successfully');
        return admin.save();
      });
    })
    .then((result) => {
      res.redirect("/login");
    })
    .catch((err) => {
      console.log(err);
    });
};

// LOGIN AUTHENTICATION
exports.login = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  Admin.findOne({ where: { email: email } })
    .then((admin) => {
      if (!admin) {
        req.flash("error", "Please enter valid email or password");
        return res.redirect("/login");
      }
      bcrypt
        .compare(password, admin.password)
        .then((isPasswordCorrect) => {
          if (isPasswordCorrect) {
            req.session.isLoggedIn = true;
            req.session.admin = admin;
            req.session.save((err) => {
              console.log(err);
            });
            return res.redirect("/dashboard");
          }
          req.flash("error", "Incorrect Email Or Password")
          res.redirect("/login");
          next();
        })
        .catch((err) => {
          console.log(err);
          req.flash("error", "An error occurred. Please try again.");
          res.redirect("/login");
          next();
        });
    })
    .catch((err) => {
      console.log(err);
      req.flash("error", "An error occurred. Please try again.");
      res.redirect("/login");
      next();
    });
};

// destroy
exports.logout = (req, res, next) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
};
