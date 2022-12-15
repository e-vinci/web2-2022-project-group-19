const getUsers = async () => {
  try {
    const response = await fetch('/api/users/getUsers');

    if (!response.ok) {
      throw new Error(`readAllMovies:: fetch error : ${response.status} : ${response.statusText}`);
    }

    const users = await response.json();
    return users;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('readAllMovies::error: ', err);
    throw err;
  }
}

// eslint-disable-next-line import/prefer-default-export
export {getUsers};