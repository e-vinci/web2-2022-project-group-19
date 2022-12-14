const jwt = require('jsonwebtoken');
const path = require('node:path');
const { parse, serialize } = require('../utils/json');

const jwtSecret = 'ilovemypizza!';
const lifetimeJwt = 24 * 60 * 60 * 1000; // in ms : 24 * 60 * 60 * 1000 = 24h

const jsonDbPath = path.join(__dirname, '/../data/users.json');

const defaultUsers = [
  {
    id: 1,
    username: 'admin',
    password: 'admin',
  },
];

function login(username, password) {
  const userFound = readOneUserFromUsername(username);
  if (!userFound) return undefined;
  if (userFound.password !== password) return undefined;

  const token = jwt.sign(
    { username }, // session data added to the payload (payload : part 2 of a JWT)
    jwtSecret, // secret used for the signature (signature part 3 of a JWT)
    { expiresIn: lifetimeJwt }, // lifetime of the JWT (added to the JWT payload)
  );

  const authenticatedUser = {
    username,
    token,
  };

  return authenticatedUser;
}

function register(username, password) {
  const userFound = readOneUserFromUsername(username);
  if (userFound) return undefined;

  createOneUser(username, password);

  const token = jwt.sign(
    { username }, // session data added to the payload (payload : part 2 of a JWT)
    jwtSecret, // secret used for the signature (signature part 3 of a JWT)
    { expiresIn: lifetimeJwt }, // lifetime of the JWT (added to the JWT payload)
  );

  const authenticatedUser = {
    username,
    token,
  };

  return authenticatedUser;
}

function readOneUserFromUsername(username) {
  const users = parse(jsonDbPath, defaultUsers);
  const indexOfUserFound = users.findIndex((user) => user.username === username);
  if (indexOfUserFound < 0) return undefined;

  return users[indexOfUserFound];
}

function createOneUser(username, password) {
  const users = parse(jsonDbPath, defaultUsers);

  const createdUser = {
    id: getNextId(),
    username,
    password,
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

function getAllUsers() {
  const users = parse(jsonDbPath);

  return users;
}

async function deleteOneUser(usernameToDelete){

  const users = parse(jsonDbPath, defaultUsers);
  
  // find the user id
  const indexOfUserToDeleteFound = users.findIndex((user) => user.usernameToDelete === usernameToDelete);

  // verify that the user exist
  if (indexOfUserToDeleteFound < 0) return undefined;

  // verify if user is admin : if yes, we can't delete him (send error message, not undefined) TODO/TOVERIFY
  if (checkIfAdmin(usernameToDelete) === true) return undefined;

  return delete users[indexOfUserToDeleteFound];
}

async function checkIfAdmin(username){

  const users = parse(jsonDbPath, defaultUsers);
  
  const indexOfUserCheckIfAdmin = users.findIndex((user) => user.username === username);

  return users[indexOfUserCheckIfAdmin].isAdmin;
  
}


module.exports = {
  login,
  register,
  readOneUserFromUsername,
  createOneUser,
  getNextId,
  getAllUsers,
  deleteOneUser,
};

