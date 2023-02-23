const { sequelize } = require("./connection");
const { Shows } = require("../models/shows");
const { Users } = require("../models/users");

//BULK CREATE DATA

// SHOWS AND USERS HAS A ONE TO MANY RELATIONSHIP WITH A USER BEING ABLE TO WATCH MANY SHOWS, AND MANY SHOWS CAN BE WATCHED BY MANY USERS
Users.hasMany(Shows);
Shows.belongsTo(Users);

const dataCreate = async () => {
  //BULK CREATE SHOWS
  await sequelize.sync({ force: true });

  await Shows.bulkCreate([
    { show: "Arcane", rating: 10, genre: "Animated" },
    { show: "Queen's Gambit", rating: 9, genre: "Strategy" },
    { show: "Adventure Time", rating: 6, genre: "Cartoon" },
    { show: "Ed, Edd & Eddy", rating: 4, genre: "Cartoon" },
    { show: "SpongeBob SquarePants", rating: 7, genre: "Cartoon" },
    { show: "Prison Break", rating: 3, genre: "Action" },
  ]);

  //   BULK CREATE USERS

  await Users.bulkCreate([
    { name: "Rejwan", password: "testing123" },
    { name: "Diogo", password: "password123" },
    { name: "John", password: "morada123" },
    { name: "Fatima", password: "practice123" },
  ]);

  //MAKING ASSOCIATION BETWEEN USERS AND SHOW
  const firstUser = await Users.findByPk(1);
  const secondUser = await Users.findByPk(2);
  const thirdUser = await Users.findByPk(3);
  const fourthUser = await Users.findByPk(4);

  firstUser.addShow(2);
  firstUser.addShow(5);

  secondUser.addShow(3);

  thirdUser.addShow(1);
  thirdUser.addShow(6);

  fourthUser.addShow(4);
};
// dataCreate();
module.exports = { dataCreate };