const Sequelize = require("sequelize");
const sql = require("../util/database");

const DashboardUser = sql.define("DashboardUser", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  bio_section: {
    type: Sequelize.STRING,
  },
  age: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  fitness_goal: {
    type: Sequelize.STRING,
  },
  fitness_Idol: {
    type: Sequelize.STRING,
  },
  gender: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = DashboardUser;
