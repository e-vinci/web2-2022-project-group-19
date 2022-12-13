const express = require('express');
const fs = require('fs');

const router = express.Router();
const {
  readAllCharacters,
  readOneCharacter,
  addOneCharacter,
  
} = require('../models/character');

// Read all the characters 
router.get('/', (req, res) => {
  const characters = readAllCharacters();
  return res.json(characters);
});

// Read one character
router.get('/:id', (req, res) => {
  // eslint-disable-next-line no-console
  console.log(`GET /characters/${req.params.id}`);

  const foundCharacter = readOneCharacter(req.params.id);

  // if (!foundCharacter) return res.sendStatus(404).end();

  return res.json(foundCharacter);
});

router.post('/addCharacter', (req, res) => {
  // eslint-disable-next-line no-console
  console.log('POST /characters');
  const image = req.body.lg;
  if (
    !req.body ||
    (req.body.hasOwnProperty('name') && req.body.name === 0) ||
    (req.body.hasOwnProperty('intelligence') && req.body.intelligence === 0) ||
    (req.body.hasOwnProperty('strength') && req.body.strength.length === 0) ||
    (req.body.hasOwnProperty('speed') && req.body.speed.length === 0) ||
    (req.body.hasOwnProperty('durability') && req.body.durability.length === 0) ||
    (req.body.hasOwnProperty('power') && req.body.power.length === 0) ||
    (req.body.hasOwnProperty('combat') && req.body.combat.length === 0) ||
    (req.body.hasOwnProperty('genre') && req.body.genre.length === 0) ||
    (req.body.hasOwnProperty('race') && req.body.race.length === 0) ||
    (req.body.hasOwnProperty('height') && req.body. height.length === 0) ||
    (req.body.hasOwnProperty('weight') && req.body. weight.length === 0) 
   
  )
    
  fs.writeFile('/path/to/image.jpg', image, (err) => {
    if (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    } else {
     
      res.send('Image uploaded successfully');
    }
  });

  return res.status(400).end();

  const jeu = addOneCharacter(req.body);

  return res.json(jeu);
});


module.exports = router;
