const { sequelize } = require("../db/connection");
const { DataTypes } = require("sequelize");

const Users = sequelize.define("Users", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = { Users };
