const express = require("express");
const app = express();
const { dataCreate } = require("../db/bulkCreateData");
const ShowRouter = require("../Routes/Shows");
const UserRouter = require("../Routes/Users");

dataCreate();
app.use(express.json());
app.use("/shows", ShowRouter);
app.use("/users", UserRouter);
const PORT = 3000;

app.listen(PORT, () =>
  console.log(`The Express Server is Running on PORT:${PORT}`)
);
