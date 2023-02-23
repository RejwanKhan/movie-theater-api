const { Router } = require("express");
const { check, validationResult } = require("express-validator");
const { Users } = require("../models/users");
const router = Router();

router.get("/", async (req, res) => {
  const allUsers = await Users.findAll();
  res.status(201).send(allUsers);
});

module.exports = router;
