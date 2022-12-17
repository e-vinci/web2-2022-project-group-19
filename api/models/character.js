/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */
const path = require('node:path');
const { parse } = require('../utils/json');
const { getComments } = require('./comment');
const { getAverageVotes } = require('./vote');

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
  return character;
}

function filterCharactersByVotes(){
  const characters = parse(jsonDbPath);
  characters.sort(function (a,b) {
    const A = String(a.id);
    const B = String(b.id);
    const ratio = getAverageVotes(B) - getAverageVotes(A);

    return ratio;
  });

  return characters;
}

function filterChararactersByComments(){
  const characters = parse(jsonDbPath);
  characters.sort(function(a,b){
    const A = String(a.id);
    const B = String(b.id);
    const ratio = getComments(B).length - getComments(A).length;
    
    return ratio;
  })
  return characters;
}

module.exports = {
  readAllCharacters,
  readOneCharacter,
  filterCharactersByVotes,
  filterChararactersByComments
};
