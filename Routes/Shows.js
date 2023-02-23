const { Router } = require("express");
const { check, validationResult } = require("express-validator");
const { Shows } = require("../models/shows");
const router = Router();

router.get("/", async (req, res) => {
  const allShows = await Shows.findAll();
  res.status(201).send(allShows);
});

module.exports = router;
