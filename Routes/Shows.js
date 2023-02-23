const { Router } = require("express");
const { check, validationResult } = require("express-validator");
const { Shows } = require("../models/shows");
const router = Router();

router.get("/", async (req, res) => {
  const allShows = await Shows.findAll();
  res.status(201).send(allShows);
});

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

module.exports = router;
