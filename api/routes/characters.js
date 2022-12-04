const express = require('express');

const router = express.Router();
const {
  readAllCharacters,
  search,

} = require('../models/character');

// Read all the characters 
router.get('/', (req, res) => {
  const characters = readAllCharacters();
  return res.json(characters);
});


// GET /characters/{search} : Get all characters who matches with a search
router.get("/:search", function (req, res) {
  const characters = search(req.params.search);

  return res.json(characters);
});

// juste pour le add

module.exports = router;
