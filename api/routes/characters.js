const express = require('express');
const path = require('path');

const router = express.Router();
const {
  readAllCharacters,
  readOneCharacter,
  filterCharactersByVotes,
  filterChararactersByComments,
  addOneCharacter,
  search,

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

router.get('/filterCharacters/votes', (req, res) => {
  const characters = filterCharactersByVotes();
  return res.json(characters);
})

router.get('/filterCharacters/comments', (req, res) => {
  const characters = filterChararactersByComments();
  return res.json(characters);
})

router.get("/search/:search", function (req, res) {
  const characters = search(req.params.search);

  return res.json(characters);
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
