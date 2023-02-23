const { sequelize } = require("../db/connection");
const { DataTypes } = require("sequelize");

const Shows = sequelize.define("Shows", {
  show: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  rating: {
    type: DataTypes.NUMBER,
    allowNull: false,
  },
});

module.exports = { Shows };
