const express = require('express');
const { getUsers } = require('../models/users');

const router = express.Router();

/* GET users listing. */
router.get('/', (req, res) => {
  res.json({ users: [{ name: 'e-baron' }] });
});

router.get('/getUsers', (req,res) => {
  const users = getUsers();
  return res.json(users);
})

module.exports = router;
