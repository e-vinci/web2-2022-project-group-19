
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
    slug: escape(body.slug),

    appearance: {
      genre: escape(body.genre),
      race: escape(body.race),
      height: escape(body.height),
      weight: escape(body.weight),
    },
    powerstats: {
      intelligence: escape(body.intelligence),
      strength: escape(body.strength),
      speed: escape(body.speed),
      durability: escape(body.durability),
      power: escape(body.power),
      combat: escape(body.combat),
    },
    images: {
      md: escape(body.image),
      lg: escape(body.image),
    },

  };

  characters.push(newCharacter);

  serialize(jsonDbPath, characters);

  return newCharacter;

}

function search(search) {
  let charactersList = new Array();
  let regex = `^.*${search}.*$`.toLowerCase();
  let allCharactersList = parse(jsonDbPath);
  allCharactersList.forEach((character) => {
    if (
      character.name.toLowerCase().match(regex)
    ) {
      charactersList.push(character);
    }
  });
  return charactersList;
}

module.exports = {
  readAllCharacters,
  readOneCharacter,
  addOneCharacter,
  search,
};
