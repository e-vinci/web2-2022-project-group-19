const express = require('express');
const { readOneUserFromID } = require('../models/users');

const router = express.Router();


const {
  updateOne,
  updatePassword,

} = require('../models/users');

/* GET users listing. */
router.get('/', (req, res) => {
  res.json({ users: [{ name: 'e-baron' }] });
});


router.put('/updateUsername/:username', async function (req, res) {
  // return res.json(req.body)
  // const body = req?.body?.nUserName?.length !== 0 ? req.body.nUserName : undefined;
  const userData = await updateOne(req.params.username, req.body);
  console.log("user uaha" + userData)
  if (!userData) return res.sendStatus(401);
  return res.json(userData);
});

router.put('/updatePassword/:username', async function (req, res) {
  // if (!req.body ||
  //   (req.body.hasOwnProperty("nPassword") && req.body.nPassword.length === 0) ||
  //   (req.body.hasOwnProperty("oldPassword") && req.body.oldPassword.length === 0)) return res.sendStatus(400);

  const userData = await updatePassword(req.params.username, req.body);
  console.log("user uaha" + userData)
  if (!userData) return res.sendStatus(401);
  return res.json(userData);
});


module.exports = router;
