const express = require('express');
const { readOneUserFromID } = require('../models/users');
const { authorize } = require('../utils/auths');

const router = express.Router();


const {
  readAllUsers,
  updateOne,
  updatePassword,
  deleteOneUser,
  updateStatusUser,


} = require('../models/users');

/* GET users listing. */
router.get('/', (req, res) => {
  const users = readAllUsers();
  return res.json(users);
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

router.delete('/:id', authorize, (req, res) => {
  const deletedUser = deleteOneUser(req?.params?.id);

  if (!deletedUser) return res.sendStatus(404);

  return res.json(deletedUser);
});

// Update a status of user identified by its id
router.patch('/:id', authorize, (req, res) => {
  const status = req?.body?.status;


  if (
    !req.body ||
    (status && !status.trim())

  )
    return res.sendStatus(400);


  const updatedUser = updateStatusUser(req?.params?.id, req?.body);

  if (!updatedUser) return res.sendStatus(404);

  return res.json(updatedUser);
});


module.exports = router;
