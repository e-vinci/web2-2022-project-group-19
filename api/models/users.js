const jwt = require('jsonwebtoken');
const path = require('node:path');
const bcrypt = require('bcrypt');
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
    id: userFound.id,
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

function readOneUserFromID(id){
  const users = parse(jsonDbPath,defaultUsers);
  // eslint-disable-next-line radix
  const user = users.find((value) => value.id === parseInt(id));
  return user.username;
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
  // create a new object based on the existing item - prior to modification -
  // and the properties requested to be updated (those in the body of the request)
  // use of the spread operator to create a shallow copy and repl
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
  // checked hash of passwords
  const match = await bcrypt.compare(body.oldPassword, users[foundIndex].password);
  // console.log("haha" + body.oldPassword + " " + body.nPassword);
  //if (!match) return;
  // const hashedPassword = await bcrypt.hash(body.nPassword, saltRounds);
  const newItem = {
    username: username,
    password: body.nPassword,
  }
  users[foundIndex] = newItem;
  serialize(jsonDbPath, users);
  const objet = {
    username: users[foundIndex].username,
  }
  return objet;

}

module.exports = {
  login,
  register,
  readOneUserFromUsername,
  updateOne,
  updatePassword,
};

