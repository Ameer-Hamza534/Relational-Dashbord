const { Sequelize } = require("sequelize");
const sequelize = new Sequelize("node-complete", "root", "mySQL@21", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;
