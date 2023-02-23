const { sequelize } = require("../db/connection");
const { DataTypes } = require("sequelize");

const Shows = new sequelize.define("Shows", {
  show: DataTypes.STRING,
  rating: DataTypes.NUMBER,
});

module.exports = { Shows };
