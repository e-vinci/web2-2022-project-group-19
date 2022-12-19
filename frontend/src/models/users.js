import { getAuthenticatedUser } from "../utils/auths";

const readAllUsers = async () => {
    try {
        const response = await fetch(`${process.env.API_BASE_URL}/users`);

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

async function deleteOneUser(id) {
    if (!id) return undefined;

    try {
        const authenticatedUser = getAuthenticatedUser();

        const options = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: authenticatedUser.token,
            },
        };

        const response = await fetch(`${process.env.API_BASE_URL}/users/${id}`, options);

        if (!response.ok) {
            throw new Error(`deleteOneUser :: fetch error : ${response.status} : ${response.statusText}`);
        }
        const deletedUser = await response.json();
        return deletedUser;
    } catch (err) {
        console.error('deleteOneFilm::error: ', err);
        throw err;
    }
}

async function updateOneUser(id, newUser) {
    if (!id || !newUser) return undefined;

    try {
        const authenticatedUser = getAuthenticatedUser();

        const options = {
            method: 'PATCH',
            body: JSON.stringify(newUser),
            headers: {
                'Content-Type': 'application/json',
                Authorization: authenticatedUser.token,
            },
        };

        const response = await fetch(`${process.env.API_BASE_URL}/users/${id}`, options); // fetch return a promise => we wait for the response

        if (!response.ok) {
            throw new Error(
                `updateOneUser :: fetch error : ${response.status} : ${response.statusText}`,
            );
        }
        const updatedUser = await response.json(); // json() returns a promise => we wait for the data

        return updatedUser;
    } catch (err) {
        console.error('updateOneUser::error: ', err);
        throw err;
    }
}



export { readAllUsers, deleteOneUser, updateOneUser };



