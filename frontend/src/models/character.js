/* eslint-disable no-console */
// call the function to recover the characters from the api
const readAllCharacters = async () => {
  try {
    const response = await fetch('/api/characters');

    if (!response.ok) {
      throw new Error(`readAllMovies:: fetch error : ${response.status} : ${response.statusText}`);
    }
    const characters = await response.json();
    return characters;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('readAllMovies::error: ', err);
    throw err;
  }
};

// call the function to recover one character from the api
const readOneCharacter = async (id) => {
   if (!id) return undefined;
   console.log(id);
  try {
    const response = await fetch(`/api/characters?id=${id}`);
    if (!response.ok) {
      throw new Error(`readOneCharacter:: fetch error : ${response.status} : ${response.statusText}`);
    }
    const character = await response.json();
    console.log(character);
    return character;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('readOneCharacter::error: ', err);
    throw err;
    }
}

// eslint-disable-next-line import/prefer-default-export
export { readAllCharacters, readOneCharacter};