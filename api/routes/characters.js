const express = require('express');

const router = express.Router();
const {
  readAllCharacters,
  readOneCharacter,
  filterCharactersByVotes,
  filterChararactersByComments,

} = require('../models/character');

// Read all the characters 
router.get('/', (req, res) => {
  const characters = readAllCharacters();
  return res.json(characters);
});

// Read one character
router.get('/:id', (req, res) => {
  const foundCharacter = readOneCharacter(req.params.id);
  return res.json(foundCharacter);
});

router.get('/filterCharacters/votes', (req,res) => {
  const characters = filterCharactersByVotes();
  return res.json(characters);
})

router.get('/filterCharacters/comments', (req,res) =>{
  const characters = filterChararactersByComments();
  return res.json(characters);
} )


module.exports = router;
