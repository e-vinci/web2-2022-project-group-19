const jwt = require('jsonwebtoken');
const path = require('node:path');
const bcrypt = require('bcrypt');
const { parse, serialize } = require('../utils/json');
const escape = require('escape-html');

const saltRounds = 10;



const jwtSecret = 'ilovemypizza!';
const lifetimeJwt = 24 * 60 * 60 * 1000; // in ms : 24 * 60 * 60 * 1000 = 24h

const jsonDbPath = path.join(__dirname, '/../data/users.json');

const defaultUsers = [
  {
    id: 1,
    username: 'admin',
    password: bcrypt.hashSync('admin', saltRounds),
    isAdmin: true,
  },
];

async function login(username, password) {
  const userFound = readOneUserFromUsername(username);
  let isAdmin = userFound?.isAdmin ? true : false;

  if (!userFound) return undefined;
  // if (userFound.password !== password) return undefined;

  const passwordMatch = await bcrypt.compare(password, userFound.password);
  console.log(passwordMatch)
  if (!passwordMatch) return undefined;

  const token = jwt.sign(
    { username }, // session data added to the payload (payload : part 2 of a JWT)
    jwtSecret, // secret used for the signature (signature part 3 of a JWT)
    { expiresIn: lifetimeJwt }, // lifetime of the JWT (added to the JWT payload)
  );

  const authenticatedUser = {
    id: userFound.id,
    username,
    token,
    isAdmin,
  };

  return authenticatedUser;
}

function register(username, password) {
  const userFound = readOneUserFromUsername(username);
  if (userFound) return undefined;
  let isAdmin = userFound?.isAdmin ? true : false;

  createOneUser(username, password);

  const token = jwt.sign(
    { username }, // session data added to the payload (payload : part 2 of a JWT)
    jwtSecret, // secret used for the signature (signature part 3 of a JWT)
    { expiresIn: lifetimeJwt }, // lifetime of the JWT (added to the JWT payload)
  );

  const authenticatedUser = {
    username,
    token,
    isAdmin,
  };

  return authenticatedUser;
}

function readOneUserFromUsername(username) {
  const users = parse(jsonDbPath, defaultUsers);
  const indexOfUserFound = users.findIndex((user) => user.username === username);
  if (indexOfUserFound < 0) return undefined;

  return users[indexOfUserFound];
}

function readOneUserFromID(id) {
  const users = parse(jsonDbPath, defaultUsers);
  // eslint-disable-next-line radix
  const user = users.find((value) => value.id === parseInt(id));
  return user?.username;
}

async function createOneUser(username, password) {
  const users = parse(jsonDbPath, defaultUsers);
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const createdUser = {
    id: getNextId(),
    username,
    password: hashedPassword,
  };

  users.push(createdUser);

  serialize(jsonDbPath, users);

  return createdUser;
}

function getNextId() {
  const users = parse(jsonDbPath, defaultUsers);
  const lastItemIndex = users?.length !== 0 ? users.length - 1 : undefined;
  if (lastItemIndex === undefined) return 1;
  const lastId = users[lastItemIndex]?.id;
  const nextId = lastId + 1;
  return nextId;
}


/**
 * Update a item in the DB and return the updated item
 * @param {number} id - id of the item to be updated
 * @param {object} body - it contains all the data to be updated
 * @returns {object} the updated item or undefined if the update operation failed
 */
async function updateOne(username, body) {
  const users = parse(jsonDbPath, defaultUsers);
  const foundIndex = users.findIndex((item) => item.username == username);
  if (foundIndex < 0) return;
  const usernameExist = users.findIndex((item) => item.username == body.username);
  if (usernameExist != -1) return;
  const updateditem = { ...users[foundIndex], ...body };
  // replace the item found at index : (or use splice)
  console.log(users[foundIndex])
  users[foundIndex] = updateditem;
  serialize(jsonDbPath, users);

  const objet = {
    username: users[foundIndex].username,
  }
  return objet;
}

async function updatePassword(username, body) {
  const users = parse(jsonDbPath, defaultUsers);
  const foundIndex = users.findIndex((item) => item.username == username);
  if (foundIndex < 0) return;
  console.log("haha" + users[foundIndex].password);

  const newItem = {
    ...users[foundIndex],
    password: body.nPassword,
  }
  users[foundIndex] = newItem;
  serialize(jsonDbPath, users);
  const objet = {
    username: users[foundIndex].username,
  }
  return objet;

}

function deleteOneUser(id) {
  const idAsNumber = parseInt(id, 10);
  const users = parse(jsonDbPath);
  const foundIndex = users.findIndex((user) => user.id === idAsNumber);
  if (foundIndex < 0) return undefined;
  const deletedUsers = users.splice(foundIndex, 1);
  const deletedUser = deletedUsers[0];
  serialize(jsonDbPath, users);

  return deletedUser;
}


function updateStatusUser(id, propertiesToUpdate) {
  const usersPropertiesToBeUpdated = { ...propertiesToUpdate };
  const idAsNumber = parseInt(id, 10);
  const users = parse(jsonDbPath);
  const foundIndex = users.findIndex((user) => user.id === idAsNumber);
  if (foundIndex < 0) return undefined;

  if (usersPropertiesToBeUpdated?.status)
    usersPropertiesToBeUpdated.status = escape(propertiesToUpdate.title);

  const updatedUser = { ...users[foundIndex], ...usersPropertiesToBeUpdated };

  users[foundIndex] = updatedUser;

  serialize(jsonDbPath, users);

  return updatedUser;
}

function readAllUsers() {
  const users = parse(jsonDbPath);

  return users;
}
module.exports = {
  login,
  register,
  readOneUserFromUsername,
  updateOne,
  updatePassword,
  deleteOneUser,
  updateStatusUser,
  readOneUserFromID,
  readAllUsers,

};

