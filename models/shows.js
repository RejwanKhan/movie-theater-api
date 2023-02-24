const { sequelize } = require("../db/connection");
const { DataTypes } = require("sequelize");

const Shows = sequelize.define("Shows", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  rating: {
    type: DataTypes.NUMBER,
    allowNull: false,
  },
  genre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
});

module.exports = { Shows };
