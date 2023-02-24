const express = require("express");
const app = express();
const { dataCreate } = require("../db/bulkCreateData");
const session = require("express-session");
const ShowRouter = require("../Routes/Shows");
const UserRouter = require("../Routes/Users");
const router = require("../Routes/Shows");

dataCreate();
app.use(
  session({
    secret: "SDSJSFSAJN232JDOS92KOSJAS",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(express.json());

app.use("/shows", ShowRouter);
app.use("/users", UserRouter);
const PORT = 3000;

app.listen(PORT, () =>
  console.log(`The Express Server is Running on PORT:${PORT}`)
);
