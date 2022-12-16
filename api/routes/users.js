const express = require('express');
const { readOneUserFromID } = require('../models/users');

const router = express.Router();

/* GET users listing. */
router.get('/', (req, res) => {
  res.json({ users: [{ name: 'e-baron' }] });
});

router.get('/readOneUserFromID/:id', (req,res) => {
  const user = readOneUserFromID(req.params.id);
  return res.json(user);
});

module.exports = router;
