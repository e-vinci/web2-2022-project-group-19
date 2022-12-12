/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */
const path = require('node:path');
const { parse } = require('../utils/json');

const jsonDbPath = path.join(__dirname, '/../data/character.json');

// read all characters
function readAllCharacters() {
  const characters = parse(jsonDbPath);

  return characters;
}

// read one character
function readOneCharacter(id) {
  // const idAsNumber = id;
  const characters = parse(jsonDbPath);
  // eslint-disable-next-line radix
  const character = characters.find((value) => value.id === parseInt(id));
  console.log("Character= ", character);
  return character;
  // console.log(characters);
  // const characterFound = characters.find(function(character){
  //   return character.id === id;
  // })[0].foo;
  // if (!characterFound) return undefined;
  // console.log(characterFound);

  // return characterFound;
}

module.exports = {
  readAllCharacters,
  readOneCharacter,
};
