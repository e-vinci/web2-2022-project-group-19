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
  console.log("Hello")
  console.log(`GET /characters/${req.params.id}`);

  const foundCharacter = readOneCharacter(req.params.id);

  // if (!foundCharacter) return res.sendStatus(404).end();

  return res.json(foundCharacter);
});

router.get('/filterCharacters/votes', (req,res) => {
  const characters = filterCharactersByVotes();
  return res.json(characters);
})

router.get('/filterCharacters/comments', (req,res) =>{
  console.log("Before");
  const characters = filterChararactersByComments();
  console.log("After");
  return res.json(characters);
} )


module.exports = router;
