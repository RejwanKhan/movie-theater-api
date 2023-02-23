const { Router } = require("express");
const { check, validationResult } = require("express-validator");
const { Users } = require("../models/users");
const { Shows } = require("../models/shows");
const router = Router();

router.get("/", async (req, res) => {
  const allUsers = await Users.findAll();
  res.status(201).send(allUsers);
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await Users.findByPk(Number(id));
    console.log(user);
    if (user.name) {
      res.status(201).send(user);
    }
  } catch (err) {
    res.status(404).send({ err: err.message });
  }
});

router.get("/:id/watch/", async (req, res) => {
  const { id } = req.params;
  const user = await Users.findByPk(Number(id), { include: { model: Shows } });
  console.log(JSON.stringify(user, null, 2));
  if (user) {
    res.status(201).send(user);
  } else {
    res.status(404).send({ err: "Could not find user" });
  }
});

module.exports = router;
