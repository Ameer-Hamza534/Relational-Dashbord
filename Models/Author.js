const { Sequelize, DataTypes } = require("sequelize");
const sql = require("../util/database");

const Author = sql.define("Author", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false },
});

module.exports = Author;
