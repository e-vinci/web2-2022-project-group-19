const jwt = require('jsonwebtoken');
const path = require('node:path');
const { parse, serialize } = require('../utils/json');
const escape = require('escape-html');

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
  let isAdmin = userFound.isAdmin;
  const token = jwt.sign(
    { username }, // session data added to the payload (payload : part 2 of a JWT)
    jwtSecret, // secret used for the signature (signature part 3 of a JWT)
    { expiresIn: lifetimeJwt }, // lifetime of the JWT (added to the JWT payload)
  );

  const authenticatedUser = {
    username,
    token,
    isAdmin
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

function readAllUsers() {
  const users = parse(jsonDbPath);

  return users;
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



function getNextId() {
  const users = parse(jsonDbPath, defaultUsers);
  const lastItemIndex = users?.length !== 0 ? users.length - 1 : undefined;
  if (lastItemIndex === undefined) return 1;
  const lastId = users[lastItemIndex]?.id;
  const nextId = lastId + 1;
  return nextId;
}

module.exports = {
  login,
  register,
  readOneUserFromUsername,
  updateStatusUser,
  deleteOneUser,
  readAllUsers,
};

