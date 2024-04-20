/*export const getUsersInLocalStorage = () => {
    const localStorageUsers = localStorage.getItem('users')
    return JSON.parse(localStorageUsers)
}
*/
export const setUsersInLocalStorage = (users) => {
    const stringifiedUsers = users.map(user => ({
        ...user,
        avatar: String(user.avatar)
    }));
    localStorage.setItem('users', JSON.stringify(stringifiedUsers));
}


export const getUsersFromLocalStorage = () => {
    const localStorageUsers = localStorage.getItem('users');
    return JSON.parse(localStorageUsers) || [];
};

export const addUserToLocalStorage = (newUser) => {
    const users = getUsersFromLocalStorage();
    const updatedUser = { ...newUser, pokemonNumbers: [] };
    const updatedUsers = [...users, updatedUser];
    localStorage.setItem('users', JSON.stringify(updatedUsers));
};

export const removeUserFromLocalStorage = (index) => {
    const storedUsers = getUsersFromLocalStorage();
    if (storedUsers) {
        const updatedUsers = storedUsers.filter((user, i) => i !== index);
        setUsersInLocalStorage(updatedUsers);
    }
};

/*
export const addPokemonToUser = (userId, pokemonNumber) => {
    const users = getUsersFromLocalStorage();
    const updatedUsers = users.map(user => {
        if (user.id === userId) {
            return {
                ...user,
                pokemonNumbers: [...user.pokemonNumbers, pokemonNumber]
            };
        }
        return user;
    });
    localStorage.setItem('users', JSON.stringify(updatedUsers));
};
*/
export const addPokemonToUser = (userId, pokemonNumber) => {
    const users = getUsersFromLocalStorage();
    const currentUser = getCurrentUser();

    const updatedUsers = users.map(user => {
        if (user.id === userId) {
            return {
                ...user,
                pokemonNumbers: [...user.pokemonNumbers, pokemonNumber]
            };
        }
        return user;
    });

    const updatedCurrentUser = {
        ...currentUser,
        pokemonNumbers: [...currentUser.pokemonNumbers, pokemonNumber]
    };
    setCurrentUser(updatedCurrentUser);

    localStorage.setItem('users', JSON.stringify(updatedUsers));
};


export const removePokemonFromUser = (userId, pokemonNumber) => {
    const users = getUsersFromLocalStorage();
    const updatedUsers = users.map(user => {
        if (user.id === userId) {
            return {
                ...user,
                pokemonNumbers: user.pokemonNumbers.filter(num => num !== pokemonNumber)
            };
        }
        return user;
    });
    localStorage.setItem('users', JSON.stringify(updatedUsers));
};

export const getCurrentUser = () => {
    const currentUser = localStorage.getItem('currentUser');
    return JSON.parse(currentUser);
}

export const setCurrentUser = (user) => {
    localStorage.setItem('currentUser', JSON.stringify(user));
}

export const removeCurrentUser = () => {
    localStorage.removeItem('currentUser');
}