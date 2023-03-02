const User = require("../Models/User");

// render all user at users page
exports.user = (req, res, next) => {
  User.findAll()
    .then((users) => {
      res.render("user/user", {
        users: users,
        pageTitle: "User",
        path: "/user",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

// create user
exports.addUser = (req, res, next) => {
  res.render("user/add-user", {
    pageTitle: "Add User",
    path: "/add-user",
    editing: false,
  });
};

// store user in database
exports.storeUser = (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const bio_section = req.body.bio_section;
  const age = req.body.age;
  const fitness_goal = req.body.fitness_goal;
  const fitness_Idol = req.body.fitness_Idol;
  const gender = req.body.gender;
  const imageUrl = req.body.imageUrl;
  User.create({
    name: name,
    email: email,
    bio_section: bio_section,
    age: age,
    fitness_goal: fitness_goal,
    fitness_Idol: fitness_Idol,
    gender: gender,
    imageUrl: imageUrl,
  })
    .then((result) => {
      return res.redirect("/user");
    })
    .catch((err) => {
      console.log(err);
    });
};

// Edit user
exports.editUser = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/users");
  }
  const userId = req.params.userId;
  User.findByPk(userId)
    .then((user) => {
      if (!user) {
        return res.redirect("/users");
      }
      res.render("user/edit-user", {
        pageTitle: "Edit User",
        path: "/edit-user",
        editing: editMode,
        user: user,
      });
    })
    .catch((err) => {
      console.log(err);
      res.redirect("/users");
    });
};

// Update User
exports.updateUser = (req, res, next) => {
  const userId = req.body.userId;
  const updatedName = req.body.name;
  const updatedEmail = req.body.email;
  const updatedBioSection = req.body.bio_section;
  const updatedAge = req.body.age;
  const updatedFitnessGoal = req.body.fitness_goal;
  const updatedFitnessIdol = req.body.fitness_Idol;
  const updatedGender = req.body.gender;
  const updatedImageUrl =req.body.imageUrl;
    User.findByPk(userId)
    .then((user) => {
      user.name = updatedName;
      user.email = updatedEmail;
      user.bio_section = updatedBioSection;
      user.age = updatedAge;
      user.fitness_goal = updatedFitnessGoal
      user.fitness_Idol = updatedFitnessIdol
      user.gender = updatedGender
      user.imageUrl = updatedImageUrl
      return user.save();
    })
    .then((result) => {
      console.log("User Update successfully");
      res.redirect("/user");
    })
    .catch((err) => console.log(err));
};

// User Details
exports.userDetail = (req, res, next) => {
  const userId = req.params.userId;
    User.findAll({ where: { Id: userId } })
    .then((users) => {
      res.render("user/detail-user", {
        user: users[0],
        pageTitle: "User Detail",
        path: "/user",
      });
    })
    .catch((err) => console.log(err));
};

// delete user
exports.deleteUser = (req, res, next) => {
  const userId = req.body.userId;
  User.destroy({ where: { id: userId } })
    .then((result) => {
      res.redirect("/user");
    })
    .catch((err) => {
      console.log(err);
    });
};
