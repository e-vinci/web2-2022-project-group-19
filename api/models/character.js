/* eslint-disable no-plusplus */
/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */
const path = require('node:path');
const escape = require('escape-html');
const { parse, serialize } = require('../utils/json');


const jsonDbPath = path.join(__dirname, '/../data/character.json');


// id
function getNextId() {
  const characters = parse(jsonDbPath);
  let nextId;
  if (characters.length === 0) nextId = 1;
  else nextId = characters[characters.length - 1].id + 1;
  return nextId;
}

// read all characters
function readAllCharacters() {

  const characters = parse(jsonDbPath);

  return characters;
}

// read one character
function readOneCharacter(id) {
  const characters = parse(jsonDbPath);

  // eslint-disable-next-line radix
  const character = characters.find((value) => value.id === parseInt(id));
  // eslint-disable-next-line no-console
  console.log("character = ", character);

  return character;

}

// add one character
function addOneCharacter(body) {
  const characters = parse(jsonDbPath);

  const newCharacter = {
    id: getNextId(),
    name: escape(body.name),
    intelligence: escape(body.intelligence),
    strength: escape(body.strength),
    speed: escape(body.speed),
    durability: escape(body.durability),
    power: escape(body.power),
    combat: escape(body.combat),
    genre: escape(body.genre),
    race: escape(body.race),
    height: escape(body.height),
    weight: escape(body.weight),
    md: escape(body.md),
    lg: escape(body.lg),
  };

  characters.push(newCharacter);

  serialize(jsonDbPath, characters);

  return newCharacter;

}

module.exports = {
  readAllCharacters,
  readOneCharacter,
  addOneCharacter


};
