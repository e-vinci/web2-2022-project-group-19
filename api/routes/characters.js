const express = require('express');

const router = express.Router();
const {
  readAllCharacters,
  readOneCharacter,

} = require('../models/character');

// Read all the characters 
router.get('/', (req, res) => {
  const characters = readAllCharacters();
  return res.json(characters);
});

// Read one character
router.get('/:id', (req, res) => {
  console.log(`GET /characters/${req.params.id}`);

  const foundCharacter = readOneCharacter(req.params.id);

  // if (!foundCharacter) return res.sendStatus(404).end();

  return res.json(foundCharacter);
});


module.exports = router;
