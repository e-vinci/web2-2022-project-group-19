const express = require('express');

const router = express.Router();
const {
  readAllCharacters,
  
} = require('../models/character');

// Read all the characters 
router.get('/', (req, res) => {
  const characters = readAllCharacters();
  return res.json(characters);
});

module.exports = router;
