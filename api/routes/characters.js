/* eslint-disable no-prototype-builtins */
const express = require('express');
const path = require('path');
const router = express.Router();

const {
  readAllCharacters,
  readOneCharacter,
  addOneCharacter,
  search

} = require('../models/character');


// Read all the characters 
router.get('/', (req, res) => {
  const characters = readAllCharacters();
  return res.json(characters);
});

router.get("/:search", function (req, res) {
  const characters = search(req.params.search);

  return res.json(characters);
});

// Read one character
router.get('/:id', (req, res) => {
  // eslint-disable-next-line no-console
  console.log(`GET /characters/${req.params.id}`);

  const foundCharacter = readOneCharacter(req.params.id);
  return res.json(foundCharacter);
});


router.post('/addCharacter', (req, res) => {

  let characterData = req.body

  const file = req.files.image;
  const fileName = Date.now().toString(36) + path.extname(file.name);;
  const imagePath = "./uploads/" + fileName;

  characterData.image = 'http://localhost:' + req.socket.localPort + '/uploads/' + fileName

  file.mv(imagePath, (err) => {
    if (err) {
      return res.status(500).send(err);
    }
    const newCharacter = addOneCharacter(characterData);

    return res.json(newCharacter);
  });

});



module.exports = router;
