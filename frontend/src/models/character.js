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

  try {
    const response = await fetch(`${process.env.API_BASE_URL}/characters/${id}`);
    if (!response.ok) {
      throw new Error(`readOneCharacter:: fetch error : ${response.status} : ${response.statusText}`);
    }
    const character = await response.json();
    return character;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('readOneCharacter::error: ', err);
    throw err;
  }
}

const filterCharactersByVotes = async () => {
  try {
    const response = await fetch('/api/characters/filterCharacters/votes');

    if (!response.ok) {
      throw new Error(`filterCharactersByVotes:: fetch error : ${response.status} : ${response.statusText}`);
    }

    const characters = await response.json();

    return characters;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('filterCharactersByVotes::error: ', err);
    throw err;
  }
}

const filterChararactersByComments = async () => {
  try {
    const response = await fetch('/api/characters/filterCharacters/comments');

    if (!response.ok) {
      throw new Error(`filterCharactersByComments:: fetch error : ${response.status} : ${response.statusText}`);
    }

    const characters = await response.json();
    return characters;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('filterCharactersByComments::error: ', err);
    throw err;
  }
}

const searchCharacters = async (search) => {
  try {
    // eslint-disable-next-line prefer-template
    const response = await fetch('/api/characters/search/' + search);

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
// eslint-disable-next-line import/prefer-default-export
export { readAllCharacters, readOneCharacter, filterCharactersByVotes, filterChararactersByComments, searchCharacters };