const { Router } = require("express");
const { check, validationResult } = require("express-validator");
const { Shows } = require("../models/shows");
const { Users } = require("../models/users");
const router = Router();

//This will send a response of all the shows that exist in the database
router.get("/", async (req, res) => {
  const allShows = await Shows.findAll();
  res.status(201).send(allShows);
});

//This will send a response of all the shows that are associated with a genre such as Action or Cartoon
router.get("/sortBy", async (req, res) => {
  let { genre } = req.query;
  if (genre === undefined) {
    res.send("Please type in a genre");
  }
  try {
    if (typeof genre === "string") {
      genre = genre.charAt(0).toUpperCase() + genre.slice(1);

      const show = await Shows.findAll({ where: { genre: genre } });
      if (show.length >= 1) {
        res.send(show);
      } else {
        res.status(404).send("Could not find Genre");
      }
    }
  } catch (err) {
    res.status(404).send({ error: err });
  }
});

//Gets Show based on the id of the show, what the user types in the url as the paramater
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const show = await Shows.findByPk(Number(id));
    if (!show) {
      res.status(404).send("Could not find show");
    } else {
      res.status(201).send(show);
    }
  } catch (err) {
    res.status(404).send({ err: "Type in a Number" });
  }
});

//Updating Shows

// IT MAKES SENSE FOR USER TO NOT BE OPTIONAL SINCE A USER CAN ONLY WATCH IT AND RATE IT, hence it is needed for both updating Status or Rating
router.put(
  "/:id",
  [
    check("status").trim().not().optional().isEmpty().isBoolean(),
    check("name").trim().not().isEmpty(),
    check("rating").trim().not().optional().isEmpty().isNumeric(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(500).send({ errors: errors.array() });
    } else {
      const { name, status, rating } = req.body;
      if (name && status) {
        const { id } = req.params;
        let show = await Shows.findByPk(Number(id));
        if (rating) {
          show = await show.update({ status: status, rating: rating });
        } else {
          show = await show.update({ status: status });
        }
        const user = await Users.findOne({ where: { name: name } });
        user.addShow(show);
        res.status(201).send("Updated status of show");
      }
    }
  }
);

//DELETE ONE SHOW
router.delete("/:id", async (req, res) => {
  try {
    let { id } = req.params;
    id = Number(id);
    const show = await Shows.findByPk(id);
    if (show) {
      await Shows.destroy({ where: { id: id } });
      res.send("deleted");
    } else {
      res.status(404).send("Could not find Show");
    }
  } catch (err) {
    res.status(500).send("Show could not be found");
    //If User types a word in the paramaters this will be the response instead
  }
});

module.exports = router;
