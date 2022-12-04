const path = require('node:path');
const { parse, serialize } = require('../utils/json');

const jsonDbPath = path.join(__dirname, '/../data/character.json');

function readAllCharacters() {
  const characters = parse(jsonDbPath);

  return characters;
}

function readOneCharacter(id) {
  const idAsNumber = parseInt(id, 10);
  const characters = parse(jsonDbPath);
  const indexOfCharacterFound = characters.findIndex((character) => character.id === idAsNumber);
  if (indexOfCharacterFound < 0) return undefined;

  return characters[indexOfCharacterFound];
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
  search,
};
