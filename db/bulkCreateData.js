const { sequelize } = require("./connection");
const { Shows } = require("../models/shows");
const { Users } = require("../models/users");

//BULK CREATE DATA

// SHOWS AND USERS HAS A ONE TO MANY RELATIONSHIP WITH A USER BEING ABLE TO WATCH MANY SHOWS, AND MANY SHOWS CAN BE WATCHED BY MANY USERS

const dataCreate = async () => {
  //BULK CREATE SHOWS
  await sequelize.sync({ force: true });

  await Shows.bulkCreate([
    { show: "Arcane", rating: 10 },
    { show: "Queen's Gambit", rating: 9 },
    { show: "Adventure Time", rating: 6 },
    { show: "Ed, Edd & Eddy", rating: 4 },
    { show: "SpongeBob SquarePants", rating: 7 },
    { show: "Prison Break", rating: 3 },
  ]);

  //   BULK CREATE USERS

  await Users.bulkCreate([
    { name: "Rejwan", password: "testing123" },
    { name: "Diogo", password: "password123" },
    { name: "John", password: "morada123" },
    { name: "Fatima", password: "practice123" },
  ]);
};
// dataCreate();
module.exports = { dataCreate };
