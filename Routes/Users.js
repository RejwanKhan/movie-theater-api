const { Router } = require("express");
const { check, validationResult } = require("express-validator");
const { Users } = require("../models/users");
const { Shows } = require("../models/shows");
const router = Router();

//This will send a response of  all the user in the database
router.get("/", async (req, res) => {
  const allUsers = await Users.findAll();
  res.status(201).send(allUsers);
});

//Making a signUp page to create a user
router.post(
  "/signUp",
  [
    check("name").trim().not().isEmpty().isLength({ min: 4, max: 15 }),
    check("password").trim().not().isEmpty().isLength({ min: 3, max: 15 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(500).send(errors.array());
    } else {
      try {
        const user = await Users.create(req.body);
        res.status(201).send("User has been created");
      } catch (err) {
        res.status(500).send({ err: "User could not be created" });
      }
    }
  }
);

//Login Page
router.post("/login", async (req, res) => {
  const { name, password } = req.body;
  const user = await Users.findOne({ where: { name: name } });

  if (req.session.user) {
    return res.send("You are already logged in!");
  }
  if (user && password === user.password) {
    req.session.user = user;
    res.status(200).send("You have logged in!");
  } else {
    res.status(500).send("name or password is invalid");
  }
});

//This will send a response of a user with a particular id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await Users.findByPk(Number(id));
    if (user.name) {
      res.status(201).send(user);
    }
  } catch (err) {
    res.status(404).send({ err: err.message });
  }
});

//This will send a response of all the shows that the user (associated with the route paramater) has watched
router.get("/:id/watch/", async (req, res) => {
  const { id } = req.params;
  const user = await Users.findByPk(Number(id), { include: { model: Shows } });

  if (user) {
    res.status(201).send(user);
  } else {
    res.status(404).send({ err: "Could not find user" });
  }
});

module.exports = router;
