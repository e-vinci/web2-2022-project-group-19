/* eslint-disable no-prototype-builtins */
const express = require('express');

// const fs = require('fs');

// const formidable = require('formidable');

const router = express.Router();
// const { json } = require('express');

const multer = require('multer');

const storage = multer.memoryStorage();

// eslint-disable-next-line object-shorthand
const upload = multer({ storage: storage });

const sharp = require('sharp');

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

router.post('/addCharacter', upload.single('image'), (req, res) => {
  // const form = formidable({ multiples: true });
  // form.parse(req, (err, fields, files) => {
    // console.log('fields: ', fields);
    // console.log('files: ', files);
    // res.send({ success: true });
  // });

  // eslint-disable-next-line no-console
  console.log('POST /characters');
  
  
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
    (req.body.hasOwnProperty('height') && req.body.height.length === 0) ||
    (req.body.hasOwnProperty('weight') && req.body.weight.length === 0)
  )
    return res.status(400).end();
  const characterData = req.body;
  
  sharp(req.file)
    .toFormat('jpeg')
    .resize(480,640)
    .toBuffer()
    .then((data) => {
      const imageData = Buffer.from(data).toString('base64');
      const imageJsonMd = JSON.stringify({ image: imageData });
      characterData.md = imageJsonMd;
    });
  sharp(req.file)
     .toFormat('jpeg')
     .resize(480, 640)
     .toBuffer()
     .then((data) => {
       const imageData = Buffer.from(data).toString('base64');
       const imageJsonLg = JSON.stringify({ image: imageData });
       characterData.lg = imageJsonLg;
     });

  // characterData.md = imageJsonMd;
  // characterData.lg = imageJsonLg;

  const newCharacter = addOneCharacter(characterData);

  return res.json(newCharacter);
  
});


module.exports = router;
