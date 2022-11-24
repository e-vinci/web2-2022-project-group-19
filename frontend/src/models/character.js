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

// eslint-disable-next-line import/prefer-default-export
export { readAllCharacters};