const express = require('express');

const router = express.Router();

const {generateImage} = require( '../models/openaiModel');


let prompt = "";

router.post('/', async(req,res) => {
 // eslint-disable-next-line no-prototype-builtins
    if (!req.body || (req.body.hasOwnProperty('prompt') && req.body.name === 0))
        return res.status(400).end();

    prompt = req.body;
    console.log("from routes backend prompt", prompt)
   
    return res.json(prompt);
  
});

router.get('/images', async (req, res) => {
  // eslint-disable-next-line no-prototype-builtins

  console.log('from routes backend prompt 2', prompt);

  const generatedImages = generateImage(prompt);
    console.log(generatedImages);
  return res.json(generatedImages);
});

module.exports = router;

