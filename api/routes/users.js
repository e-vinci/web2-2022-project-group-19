const express = require('express');

const router = express.Router();
const { authorize } = require('../utils/auths');

const {
  readAllUsers,
  deleteOneUser,
  updateStatusUser,

} = require('../models/users');

// /* GET users listing. */
// router.get('/', (req, res) => {
//   res.json({ users: [{ name: 'e-baron' }] });
// });



router.get('/', (req, res) => {
  const users = readAllUsers();
  return res.json(users);
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
