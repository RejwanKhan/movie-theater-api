const { sequelize } = require("../db/connection");
const { DataTypes } = require("sequelize");

const Users = new sequelize.define("Shows", {
  name: DataTypes.STRING,
  email: DataTypes.STRING,
});

module.exports = { Users };
