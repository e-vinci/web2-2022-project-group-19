const readAllUsers = async () => {
    try {
        const response = await fetch('/api/users');

        if (!response.ok) {
            throw new Error(`readAllYsers:: fetch error : ${response.status} : ${response.statusText}`);
        }
        const users = await response.json();
        return users;
    } catch (err) {
        // eslint-disable-next-line no-console
        console.error('readAllUsers::error: ', err);
        throw err;
    }
};

// eslint-disable-next-line import/prefer-default-export
export { readAllUsers };