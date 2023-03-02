const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../util/database");
const validate = require("express-validator");

const Admin = sequelize.define("Admin", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    unique: {
      args: true,
      msg: "Email must be unique",
    },
    validate: {
      isEmail: {
        args: true,
        msg: "Invalid email format",
      },
      notEmpty: {
        args: true,
        msg: "Cannot be blank",
      },
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Admin;
