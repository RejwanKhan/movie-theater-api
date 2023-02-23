const express = require("express");
const app = express();
const { dataCreate } = require("../db/bulkCreateData");

dataCreate();
app.use(express.json());
const PORT = 3000;

app.listen(PORT, () =>
  console.log(`The Express Server is Running on PORT:${PORT}`)
);
